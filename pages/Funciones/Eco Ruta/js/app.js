const firebaseConfig = {
  apiKey: "AIzaSyBJZhUsuQftgWxwFqL3KvkmK9px9SMVxS8",
  authDomain: "rutareciclajetilaran.firebaseapp.com",
  projectId: "rutareciclajetilaran",
  storageBucket: "rutareciclajetilaran.firebasestorage.app",
  messagingSenderId: "479261509255",
  appId: "1:479261509255:web:e2dae643ecb8faa9e2da22",
  measurementId: "G-E1J6T7X5CP"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

function cargarMapaBase(idDivMapa) {
  const mapa = L.map(idDivMapa).setView([10.466, -84.966], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(mapa);
  return mapa;
}

async function cargarDatosSectores() {
  try {
    const snapshot = await db.collection('sectores').get();
    
    if (snapshot.empty) {
      return await cargarDesdeGeoJSON();
    }
    
    const features = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      features.push({
        type: "Feature",
        properties: {
          id: doc.id,
          nombre: data.nombre,
          estado: data.estado || 'pendiente'
        },
        geometry: {
          type: "Polygon",
          coordinates: [data.coordenadas.map(coord => [coord.lng, coord.lat])]
        }
      });
    });
    
    return {
      type: "FeatureCollection",
      features: features
    };
    
  } catch (error) {
    console.error("Error cargando datos:", error);
    return await cargarDesdeGeoJSON();
  }
}

async function cargarDesdeGeoJSON() {
  try {
    const response = await fetch('geojson/sectores-tilaran.geojson');
    if (!response.ok) throw new Error("Error al cargar GeoJSON");
    return await response.json();
  } catch (error) {
    console.error("Error cargando GeoJSON:", error);
    return null;
  }
}

function obtenerColorPorEstado(estado) {
  const colores = {
    recolectado: '#28a745',
    en_camino: '#ffc107',
    pendiente: '#dc3545'
  };
  return colores[estado] || '#6c757d';
}

function configurarPersistencia() {
  firebase.firestore().enablePersistence()
    .catch(err => console.log("Persistencia offline:", err));
}

function mostrarNotificacion(mensaje, tipo = 'info') {
  const tipos = {
    success: { class: 'alert-success', icon: 'check-circle' },
    error: { class: 'alert-danger', icon: 'exclamation-triangle' },
    info: { class: 'alert-info', icon: 'info-circle' }
  };
  
  const notificacion = document.createElement('div');
  notificacion.className = `alert ${tipos[tipo].class} alert-dismissible fade show position-fixed`;
  notificacion.style.cssText = `
    top: 20px;
    right: 20px;
    z-index: 2000;
    min-width: 300px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  `;
  notificacion.innerHTML = `
    <i class="fas fa-${tipos[tipo].icon} me-2"></i>
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  const existente = document.querySelector('.alert.position-fixed');
  if (existente) existente.remove();
  
  document.body.appendChild(notificacion);
    
  setTimeout(() => {
    notificacion.classList.add('fade');
    setTimeout(() => notificacion.remove(), 150);
  }, 5000);
}

function obtenerClaseBadgePorEstado(estado) {
  switch(estado) {
    case 'recolectado': return 'bg-success';
    case 'en_camino': return 'bg-warning';
    default: return 'bg-danger';
  }
}

async function registrarCambio(sectorId, sectorNombre, estadoAnterior, nuevoEstado) {
  try {
    const user = auth.currentUser;
    const cambioData = {
      sectorId,
      sectorNombre,
      estadoAnterior,
      nuevoEstado,
      usuarioEmail: user ? user.email : null,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    console.log("Registrando cambio:", cambioData); // Para depuración
    
    const docRef = await db.collection('historial').add(cambioData);
    console.log("Cambio registrado con ID:", docRef.id);
    
    return true;
  } catch (error) {
    console.error("Error registrando cambio:", error);
    mostrarNotificacion('Error al registrar en historial', 'error');
    return false;
  }
}

async function enviarNotificacion(tipo, mensaje, sectorId = null) {
  try {
    const user = auth.currentUser;
    const notificacionData = {
      tipo,
      mensaje,
      sectorId,
      conductorEmail: user ? user.email : null,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      leido: false
    };
    
    const docRef = await db.collection('notificaciones').add(notificacionData);
    console.log("Notificación enviada con ID:", docRef.id);
    
    return true;
  } catch (error) {
    console.error("Error enviando notificación:", error);
    mostrarNotificacion('Error al enviar notificación', 'error');
    return false;
  }
}

function obtenerNotificaciones(callback) {
  return db.collection('notificaciones')
    .orderBy('timestamp', 'desc')
    .limit(10)
    .onSnapshot(callback);
}

async function actualizarEstadoSector(sectorId, estado) {
  if (!sectorId) {
    mostrarNotificacion('No se ha seleccionado ningún sector', 'error');
    return false;
  }
  
  try {
    const sectorRef = db.collection('sectores').doc(sectorId);
    const sectorDoc = await sectorRef.get();
    
    if (!sectorDoc.exists) {
      throw new Error("El sector no existe");
    }

    const sectorData = sectorDoc.data();
    const estadoAnterior = sectorData.estado || 'pendiente';
    const sectorNombre = sectorData.nombre || 'Sector desconocido';

    await sectorRef.update({
      estado: estado,
      ultimaActualizacion: firebase.firestore.FieldValue.serverTimestamp()
    });

    const registroExitoso = await registrarCambio(
      sectorId, 
      sectorNombre, 
      estadoAnterior, 
      estado
    );

    if (!registroExitoso) {
      throw new Error("No se pudo registrar en el historial");
    }

    return true;
  } catch (error) {
    console.error("Error actualizando sector:", error);
    mostrarNotificacion(`Error al actualizar: ${error.message}`, 'error');
    return false;
  }
}

function getEstiloSector(estado) {
  return {
    fillColor: obtenerColorPorEstado(estado),
    color: '#fff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.7,
    className: `sector-${estado}`
  };
}

configurarPersistencia();

window.firebaseFunctions = {
  db,
  auth,
  cargarMapaBase,
  cargarDatosSectores,
  obtenerColorPorEstado,
  mostrarNotificacion,
  obtenerClaseBadgePorEstado,
  actualizarEstadoSector,
  getEstiloSector,
  registrarCambio,
  enviarNotificacion,
  obtenerNotificaciones
};