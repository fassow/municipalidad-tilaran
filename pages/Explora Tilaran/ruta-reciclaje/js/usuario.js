document.addEventListener('DOMContentLoaded', async () => {
  const mapa = cargarMapaBase('mapa-usuario');
  const listaSectores = document.getElementById('lista-sectores');
  let capaSectores = null;

  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  document.getElementById('mapa-usuario').style.marginTop = `${navbarHeight}px`;
  mapa.invalidateSize();

  const geojsonData = await cargarDatosSectores();
  if (!geojsonData) return;
  
  function actualizarContadores() {
    const conteo = {
      pendiente: 0,
      en_camino: 0,
      recolectado: 0
    };

    capaSectores.eachLayer(layer => {
      if (layer.feature) {
        const estado = layer.feature.properties.estado;
        if (conteo.hasOwnProperty(estado)) {
          conteo[estado]++;
        }
      }
    });

    document.getElementById('contador-pendientes').textContent = conteo.pendiente;
    document.getElementById('contador-camino').textContent = conteo.en_camino;
    document.getElementById('contador-recolectados').textContent = conteo.recolectado;

    const total = conteo.pendiente + conteo.en_camino + conteo.recolectado;
    if (total > 0) {
      const porcentajePendiente = (conteo.pendiente / total) * 100;
      const porcentajeCamino = (conteo.en_camino / total) * 100;
      const porcentajeCompletado = (conteo.recolectado / total) * 100;

      document.getElementById('progress-pendiente').style.width = `${porcentajePendiente}%`;
      document.getElementById('progress-camino').style.width = `${porcentajeCamino}%`;
      document.getElementById('progress-completado').style.width = `${porcentajeCompletado}%`;
    } else {
      document.getElementById('progress-pendiente').style.width = '33%';
      document.getElementById('progress-camino').style.width = '33%';
      document.getElementById('progress-completado').style.width = '34%';
    }
  }

  capaSectores = L.geoJSON(geojsonData, {
    style: (feature) => ({
      color: obtenerColorPorEstado(feature.properties.estado),
      weight: 2,
      fillOpacity: 0.5
    }),
    onEachFeature: (feature, layer) => {
      layer.bindPopup(`
        <b>${feature.properties.nombre}</b>
        <div class="estado-${feature.properties.estado}">
          Estado: ${feature.properties.estado.replace('_', ' ').toUpperCase()}
        </div>
      `);
    }
  }).addTo(mapa);

  actualizarListaSectores(geojsonData);
  actualizarContadores();

  db.collection('sectores').onSnapshot((snapshot) => {
    let necesitaActualizarContadores = false;
    
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'modified') {
        const sectorId = change.doc.id;
        const nuevoEstado = change.doc.data().estado;
        const sectorData = change.doc.data();
        
        geojsonData.features.forEach(feature => {
          if (feature.properties.id === sectorId) {
            feature.properties.estado = nuevoEstado;
          }
        });
        
        capaSectores.eachLayer((layer) => {
          if (layer.feature?.properties?.id === sectorId) {
            layer.feature.properties.estado = nuevoEstado;
            layer.setStyle({
              color: obtenerColorPorEstado(nuevoEstado),
              fillColor: obtenerColorPorEstado(nuevoEstado),
              fillOpacity: 0.5
            });
            layer.setPopupContent(`
              <b>${layer.feature.properties.nombre}</b>
              <div class="estado-${nuevoEstado}">
                Estado: ${nuevoEstado.replace('_', ' ').toUpperCase()}
              </div>
            `);
          }
        });
        
        const item = document.querySelector(`#lista-sectores div[data-id="${sectorId}"]`);
        if (item) {
          const badge = item.querySelector('.badge');
          badge.className = `badge ${obtenerClaseBadgePorEstado(nuevoEstado)}`;
          badge.textContent = nuevoEstado.replace('_', ' ');
        }
        
        necesitaActualizarContadores = true;
      }
    });
    
    if (necesitaActualizarContadores) {
      actualizarContadores();
    }
  });

  function actualizarListaSectores(geojsonData) {
    const listaSectores = document.getElementById('lista-sectores');
    if (!listaSectores) return;
    
    listaSectores.innerHTML = '';
    
    geojsonData.features.forEach(sector => {
      const item = document.createElement('div');
      item.className = 'list-group-item d-flex justify-content-between align-items-center';
      item.dataset.id = sector.properties.id;
      
      item.innerHTML = `
        ${sector.properties.nombre}
        <span class="badge ${obtenerClaseBadgePorEstado(sector.properties.estado)}">
          ${sector.properties.estado.replace('_', ' ')}
        </span>
      `;
      listaSectores.appendChild(item);
    });
  }

  function cargarNotificaciones() {
    return window.firebaseFunctions.obtenerNotificaciones((snapshot) => {
      const lista = document.getElementById('lista-notificaciones-mejorada');
      const contador = document.getElementById('lastUpdateNotificaciones');
      const contadorBadge = document.getElementById('contador-notificaciones');
      const cargando = document.getElementById('notificaciones-cargando');
      const vacio = document.getElementById('notificaciones-vacio');
      
      if (snapshot.empty) {
        cargando.classList.add('d-none');
        vacio.classList.remove('d-none');
        contadorBadge.textContent = '0 nuevas';
        return;
      }
      
      cargando.classList.add('d-none');
      vacio.classList.add('d-none');
      
      let notificacionesHTML = '';
      let contadorNoLeidas = 0;
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const fecha = data.timestamp?.toDate() || new Date();
        const esNoLeida = !data.leido;
        
        if (esNoLeida) contadorNoLeidas++;
        
        let tipoIcono = 'info';
        let claseIcono = 'info';
        
        if (data.tipo?.includes('retraso') || data.tipo?.includes('alerta')) {
          tipoIcono = 'alerta';
          claseIcono = 'alerta';
        } else if (data.tipo?.includes('peligro') || data.tipo?.includes('cancelacion')) {
          tipoIcono = 'peligro';
          claseIcono = 'peligro';
        } else if (data.tipo?.includes('exito') || data.tipo?.includes('completado')) {
          tipoIcono = 'exito';
          claseIcono = 'exito';
        }
        
        notificacionesHTML += `
          <div class="notificacion-item-mejorada ${esNoLeida ? 'notificacion-no-leida' : ''}">
            <div class="notificacion-icono ${claseIcono}">
              <i class="fas fa-${tipoIcono === 'alerta' ? 'exclamation-triangle' : tipoIcono === 'peligro' ? 'exclamation-circle' : tipoIcono === 'exito' ? 'check-circle' : 'info-circle'}"></i>
            </div>
            <div class="notificacion-contenido">
              <div class="notificacion-titulo">
                <h6>${data.tipo?.toUpperCase() || 'NOTIFICACIÓN'}</h6>
                <span class="notificacion-badge badge-${data.tipo || 'otro'}">${data.tipo || 'otro'}</span>
              </div>
              <p class="notificacion-mensaje">${data.mensaje}</p>
              <div class="notificacion-meta">
                <div class="notificacion-fecha">
                  <i class="far fa-clock"></i>
                  ${fecha.toLocaleString('es-ES', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div class="notificacion-usuario">
                  <i class="fas fa-user"></i>
                  ${data.conductorEmail || 'Sistema'}
                </div>
              </div>
            </div>
          </div>
        `;
      });
      
      lista.innerHTML = notificacionesHTML;
      contadorBadge.textContent = `${contadorNoLeidas} nueva${contadorNoLeidas !== 1 ? 's' : ''}`;
      contador.textContent = new Date().toLocaleTimeString();
    });
  }

  cargarNotificaciones();

  function obtenerClaseBadgePorEstado(estado) {
    switch(estado) {
      case 'recolectado': return 'bg-success';
      case 'en_camino': return 'bg-warning';
      default: return 'bg-danger';
    }
  }
});