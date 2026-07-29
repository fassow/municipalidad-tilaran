(function() {
  'use strict';

  var alcaldiaData = [
    {
      id: 'secretaria-alcaldia',
      label: 'Secretaria de Alcaldía',
      children: [
        { id: 'operador-liviano', label: 'Operador de Equipo Liviano' }
      ]
    },
    {
      id: 'gestion-juridica',
      label: 'Líder de Gestión Jurídica',
      children: [
        { id: 'asistente-legal', label: 'Asistente Servicios Legales' }
      ]
    },
    {
      id: 'archivista',
      label: 'Archivista',
      children: []
    },
    {
      id: 'talento-humano',
      label: 'Líder de Talento Humano',
      children: [
        { id: 'asistente-th', label: 'Asistente de Talento Humano' }
      ]
    },
    {
      id: 'encargado-informatica',
      label: 'Encargado de Informática',
      children: []
    },
    {
      id: 'encargada-salud',
      label: 'Encargada de Salud Ocupacional',
      children: []
    },
    {
      id: 'proyectos-control',
      label: 'Encargado de Proyectos y Control Interno',
      children: []
    },
    {
      id: 'gestion-social',
      label: 'Líder de Gestión Social',
      children: []
    },
    {
      id: 'servicios-ciudadanos',
      label: 'Coordinador Servicios Ciudadanos y Técnicos',
      children: [
        { id: 'bienes-muebles', label: 'Encargado de bienes y muebles y valoración' },
        { id: 'catastro', label: 'Encargado de Catastro' },
        { id: 'asistentes-tecnicos', label: 'Asistentes Técnicos' },
        { id: 'plataformistas', label: 'Plataformistas' },
        { id: 'inspector-municipal-sc', label: 'Inspector Municipal' }
      ]
    },
    {
      id: 'gestion-ambiental',
      label: 'Gestor Ambiental',
      children: [
        { id: 'supervisor-operativo', label: 'Supervisor de Proceso Operativo' },
        { id: 'operador-pesado-ga', label: 'Operador de Equipo Pesado' },
        { id: 'peon-manual-ga', label: 'Peón Manual de Procesos' },
        { id: 'operador-liviano-ga', label: 'Operador de Equipo Liviano' }
      ]
    },
    {
      id: 'infraestructura',
      label: 'Coordinador Servicios de Infraestructura',
      children: [
        { id: 'lider-proyectos', label: 'Líder de Proyectos' },
        { id: 'asistente-infra', label: 'Asistente de infraestructura' },
        { id: 'ingeniero-asistente', label: 'Ingeniero Asistente' },
        { id: 'inspector-vial', label: 'Inspector Vial' },
        { id: 'supervisor-infra', label: 'Supervisor de Proceso Operativo' },
        { id: 'operador-pesado-infra', label: 'Operador de Equipo Pesado' },
        { id: 'peon-infra', label: 'Peón Manual de Procesos' },
        { id: 'operario-construccion', label: 'Operario de Construcción' },
        { id: 'peon-construccion', label: 'Peón Manual de Procesos' }
      ]
    },
    {
      id: 'financiero-logistico',
      label: 'Coordinador de Servicios Financieros y Logísticos',
      children: [
        { id: 'contador', label: 'Contador Municipal' },
        { id: 'tesorero', label: 'Tesorero' },
        { id: 'asistente-financiero', label: 'Asistente Financiero' },
        { id: 'proveedor', label: 'Proveedor Municipal' },
        { id: 'tecnico-logistico', label: 'Técnico de Procesos Logísticos' },
        { id: 'cuidadores', label: 'Cuidadores' },
        { id: 'mecanico', label: 'Mecánico' },
        { id: 'asistente-proveeduria', label: 'Asistente de Proveeduría' }
      ]
    },
    {
      id: 'desarrollo-urbano',
      label: 'Coordinador Desarrollo y Control Urbano',
      children: [
        { id: 'inspector-urbano', label: 'Inspector Municipal' }
      ]
    }
  ];

  var concejoData = [
    { id: 'secretaria-concejo', label: 'Secretaría Concejo' },
    { id: 'abogado-concejo', label: 'Abogado del Concejo' },
    { id: 'auditor-interno', label: 'Auditor Interno' }
  ];

  var perfiles = {
    'secretaria-alcaldia': {
      nombre: 'Maybeline Ramirez Garcia',
      cargo: 'Secretaria de Alcaldía',
      email: 'mramirez@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '2403',
      avatar: 'https://ui-avatars.com/api/?name=Maybeline+Ramirez+Garcia&background=1a1a1a&color=fff&size=80'
    },
    'operador-liviano': {
      nombre: 'No disponible',
      cargo: 'Operador de Equipo Liviano',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Operador+Equipo+Liviano&background=1a1a1a&color=fff&size=80'
    },
    'gestion-juridica': {
      nombre: 'Ana Cecilia Cruz Mejias',
      cargo: 'Líder de Gestión Jurídica',
      email: 'acruz@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '2415',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Cecilia+Cruz+Mejias&background=1a1a1a&color=fff&size=80'
    },
    'asistente-legal': {
      nombre: 'Jose Mario Murillo Mejias',
      cargo: 'Asistente Servicios Legales',
      email: 'jmmurillo@tilaran.go.cr',
      telefono: 'No indica',
      extension: 'No indica',
      avatar: 'https://ui-avatars.com/api/?name=Jose+Mario+Murillo+Mejias&background=1a1a1a&color=fff&size=80'
    },
    'archivista': {
      nombre: 'Wilberth Ramos',
      cargo: 'Archivista',
      email: 'wramos@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '2435',
      avatar: 'https://ui-avatars.com/api/?name=Wilberth+Ramos&background=1a1a1a&color=fff&size=80'
    },
    'talento-humano': {
      nombre: 'Hazzel Villegas Nuñez',
      cargo: 'Líder de Talento Humano',
      email: 'hvillegas@tilaran.go.cr',
      telefono: '2695 2418',
      extension: '24 18',
      avatar: 'https://ui-avatars.com/api/?name=Hazzel+Villegas+Nuñez&background=1a1a1a&color=fff&size=80'
    },
    'asistente-th': {
      nombre: 'Yolineth Hidalgo',
      cargo: 'Asistente de Talento Humano',
      email: 'yolineth.hidalgo@tilaran.go.cr',
      telefono: '2695 2400',
      extension: 'No indica',
      avatar: 'https://ui-avatars.com/api/?name=Yolineth+Hidalgo&background=1a1a1a&color=fff&size=80'
    },
    'encargado-informatica': {
      nombre: 'Alberth Lopez',
      cargo: 'Encargado de Informática',
      email: 'alopez@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '2432',
      avatar: 'https://ui-avatars.com/api/?name=Alberth+Lopez&background=1a1a1a&color=fff&size=80'
    },
    'encargada-salud': {
      nombre: 'Hazel Ordoñez Delgado',
      cargo: 'Encargada de Salud Ocupacional',
      email: 'hordonez@tilaran.go.cr',
      telefono: '(506)2695-2438',
      extension: 'No indica',
      avatar: 'https://ui-avatars.com/api/?name=Hazel+Ordoñez+Delgado&background=1a1a1a&color=fff&size=80'
    },
    'proyectos-control': {
      nombre: 'Duney Lopez Rojas',
      cargo: 'Encargado de Proyectos y Control Interno',
      email: 'duney.lopez@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '2441',
      avatar: 'https://ui-avatars.com/api/?name=Duney+Lopez+Rojas&background=1a1a1a&color=fff&size=80'
    },
    'gestion-social': {
      nombre: 'Ofelia Barrantes Vargas',
      cargo: 'Líder de Gestión Social',
      email: 'obarrantes@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '24 25',
      avatar: 'https://ui-avatars.com/api/?name=Ofelia+Barrantes+Vargas&background=1a1a1a&color=fff&size=80'
    },
    'servicios-ciudadanos': {
      nombre: 'Jose Antonio Rodriguez Herrera',
      cargo: 'Coordinador Servicios Ciudadanos y Técnicos',
      email: 'jrodriguez@tilaran.go.cr',
      telefono: '2695 24 00',
      extension: '24 14',
      avatar: 'https://ui-avatars.com/api/?name=Jose+Antonio+Rodriguez+Herrera&background=1a1a1a&color=fff&size=80'
    },
    'bienes-muebles': {
      nombre: 'Rigoberto Hernandez Quesada',
      cargo: 'Encargado de bienes y muebles y valoración',
      email: 'rhernandez@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '24 34',
      avatar: 'https://ui-avatars.com/api/?name=Rigoberto+Hernandez+Quesada&background=1a1a1a&color=fff&size=80'
    },
    'catastro': {
      nombre: 'Gustavo Bogantes Morera',
      cargo: 'Encargado de Catastro',
      email: 'gbogantes@tilaran.go.cr',
      telefono: '2695 24 00',
      extension: '24 04',
      avatar: 'https://ui-avatars.com/api/?name=Gustavo+Bogantes+Morera&background=1a1a1a&color=fff&size=80'
    },
    'asistentes-tecnicos-1': {
      nombre: 'Zeidy Campos Artavia',
      cargo: 'Asistente Técnico',
      email: 'zcampos@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '2405',
      avatar: 'https://ui-avatars.com/api/?name=Zeidy+Campos+Artavia&background=1a1a1a&color=fff&size=80'
    },
    'asistentes-tecnicos-2': {
      nombre: 'Yamileth Carvajal Manzanares',
      cargo: 'Asistente Técnico',
      email: 'ycarvajal@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '24 06',
      avatar: 'https://ui-avatars.com/api/?name=Yamileth+Carvajal+Manzanares&background=1a1a1a&color=fff&size=80'
    },
    'asistentes-tecnicos-3': {
      nombre: 'Frayman Pérez Ramirez',
      cargo: 'Asistente Técnico',
      email: 'fperez@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '2408',
      avatar: 'https://ui-avatars.com/api/?name=Frayman+Perez+Ramirez&background=1a1a1a&color=fff&size=80'
    },
    'plataformistas': {
      nombre: 'Equipo de Plataforma',
      cargo: 'Plataformistas',
      email: 'plataforma@tilaran.go.cr',
      telefono: '2695 2400',
      extension: 'No indica',
      avatar: 'https://ui-avatars.com/api/?name=Plataformistas&background=1a1a1a&color=fff&size=80'
    },
    'inspector-municipal-1': {
      nombre: 'Jimmy Espinoza Masis',
      cargo: 'Inspector Municipal',
      email: 'jespinoza@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '24 44',
      avatar: 'https://ui-avatars.com/api/?name=Jimmy+Espinoza+Masis&background=1a1a1a&color=fff&size=80'
    },
    'inspector-municipal-2': {
      nombre: 'Uber Masis Solis',
      cargo: 'Inspector Municipal',
      email: 'hmasis@tilaran.go.cr',
      telefono: '2695 2411',
      extension: '24 11',
      avatar: 'https://ui-avatars.com/api/?name=Uber+Masis+Solis&background=1a1a1a&color=fff&size=80'
    },
    'inspector-municipal-3': {
      nombre: 'Brallan Enrique Vasquez Reyes',
      cargo: 'Inspector Municipal',
      email: 'bvasquez@tilaran.go.cr',
      telefono: '2695 2400',
      extension: '2411',
      avatar: 'https://ui-avatars.com/api/?name=Brallan+Enrique+Vasquez+Reyes&background=1a1a1a&color=fff&size=80'
    },
    'gestion-ambiental': {
      nombre: 'No disponible',
      cargo: 'Gestor Ambiental',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Gestor+Ambiental&background=1a1a1a&color=fff&size=80'
    },
    'supervisor-operativo': {
      nombre: 'No disponible',
      cargo: 'Supervisor de Proceso Operativo',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Supervisor+Operativo&background=1a1a1a&color=fff&size=80'
    },
    'operador-pesado-ga': {
      nombre: 'No disponible',
      cargo: 'Operador de Equipo Pesado',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Operador+Equipo+Pesado&background=1a1a1a&color=fff&size=80'
    },
    'peon-manual-ga': {
      nombre: 'No disponible',
      cargo: 'Peón Manual de Procesos',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Peon+Manual&background=1a1a1a&color=fff&size=80'
    },
    'operador-liviano-ga': {
      nombre: 'No disponible',
      cargo: 'Operador de Equipo Liviano',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Operador+Equipo+Liviano&background=1a1a1a&color=fff&size=80'
    },
    'infraestructura': {
      nombre: 'No disponible',
      cargo: 'Coordinador Servicios de Infraestructura',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Coordinador+Infraestructura&background=1a1a1a&color=fff&size=80'
    },
    'lider-proyectos': {
      nombre: 'No disponible',
      cargo: 'Líder de Proyectos',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Lider+Proyectos&background=1a1a1a&color=fff&size=80'
    },
    'asistente-infra': {
      nombre: 'No disponible',
      cargo: 'Asistente de infraestructura',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Asistente+Infraestructura&background=1a1a1a&color=fff&size=80'
    },
    'ingeniero-asistente': {
      nombre: 'No disponible',
      cargo: 'Ingeniero Asistente',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Ingeniero+Asistente&background=1a1a1a&color=fff&size=80'
    },
    'inspector-vial': {
      nombre: 'No disponible',
      cargo: 'Inspector Vial',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Inspector+Vial&background=1a1a1a&color=fff&size=80'
    },
    'supervisor-infra': {
      nombre: 'No disponible',
      cargo: 'Supervisor de Proceso Operativo',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Supervisor+Infraestructura&background=1a1a1a&color=fff&size=80'
    },
    'operador-pesado-infra': {
      nombre: 'No disponible',
      cargo: 'Operador de Equipo Pesado',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Operador+Equipo+Pesado&background=1a1a1a&color=fff&size=80'
    },
    'peon-infra': {
      nombre: 'No disponible',
      cargo: 'Peón Manual de Procesos',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Peon+Manual&background=1a1a1a&color=fff&size=80'
    },
    'operario-construccion': {
      nombre: 'No disponible',
      cargo: 'Operario de Construcción',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Operario+Construccion&background=1a1a1a&color=fff&size=80'
    },
    'peon-construccion': {
      nombre: 'No disponible',
      cargo: 'Peón Manual de Procesos',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Peon+Construccion&background=1a1a1a&color=fff&size=80'
    },
    'financiero-logistico': {
      nombre: 'No disponible',
      cargo: 'Coordinador de Servicios Financieros y Logísticos',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Coordinador+Financiero&background=1a1a1a&color=fff&size=80'
    },
    'contador': {
      nombre: 'No disponible',
      cargo: 'Contador Municipal',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Contador+Municipal&background=1a1a1a&color=fff&size=80'
    },
    'tesorero': {
      nombre: 'No disponible',
      cargo: 'Tesorero',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Tesorero&background=1a1a1a&color=fff&size=80'
    },
    'asistente-financiero': {
      nombre: 'No disponible',
      cargo: 'Asistente Financiero',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Asistente+Financiero&background=1a1a1a&color=fff&size=80'
    },
    'proveedor': {
      nombre: 'No disponible',
      cargo: 'Proveedor Municipal',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Proveedor+Municipal&background=1a1a1a&color=fff&size=80'
    },
    'tecnico-logistico': {
      nombre: 'No disponible',
      cargo: 'Técnico de Procesos Logísticos',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Tecnico+Logistico&background=1a1a1a&color=fff&size=80'
    },
    'cuidadores': {
      nombre: 'No disponible',
      cargo: 'Cuidadores',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Cuidadores&background=1a1a1a&color=fff&size=80'
    },
    'mecanico': {
      nombre: 'No disponible',
      cargo: 'Mecánico',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Mecanico&background=1a1a1a&color=fff&size=80'
    },
    'asistente-proveeduria': {
      nombre: 'No disponible',
      cargo: 'Asistente de Proveeduría',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Asistente+Proveeduria&background=1a1a1a&color=fff&size=80'
    },
    'desarrollo-urbano': {
      nombre: 'No disponible',
      cargo: 'Coordinador Desarrollo y Control Urbano',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Coordinador+Desarrollo+Urbano&background=1a1a1a&color=fff&size=80'
    },
    'inspector-urbano': {
      nombre: 'No disponible',
      cargo: 'Inspector Municipal',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=Inspector+Urbano&background=1a1a1a&color=fff&size=80'
    },
    'secretaria-concejo': {
      nombre: 'Silvia Centeno González',
      cargo: 'Secretaría Concejo',
      email: 'scenteno@tilaran.go.cr',
      telefono: '(506)2695-2424',
      extension: '2424',
      avatar: 'https://ui-avatars.com/api/?name=Silvia+Centeno+Gonzalez&background=1a1a1a&color=fff&size=80'
    },
    'abogado-concejo': {
      nombre: 'Alex Zamora Porras',
      cargo: 'Abogado del Concejo',
      email: 'azamora@tilaran.go.cr',
      telefono: '2695-2436',
      extension: '2436',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Zamora+Porras&background=1a1a1a&color=fff&size=80'
    },
    'auditor-interno': {
      nombre: 'Giovanni Hernandez Murillo',
      cargo: 'Auditor Interno',
      email: 'giovanni.hernandez@tilaran.go.cr',
      telefono: '(506)2695-2419',
      extension: '2419',
      avatar: 'https://ui-avatars.com/api/?name=Giovanni+Hernandez+Murillo&background=1a1a1a&color=fff&size=80'
    }
  };

  function getPerfil(id, label) {
    if (perfiles[id]) {
      return perfiles[id];
    }
    return {
      nombre: 'No disponible',
      cargo: label || 'Cargo sin información',
      email: 'No disponible',
      telefono: 'No disponible',
      extension: 'No disponible',
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(label || 'Funcionario') + '&background=1a1a1a&color=fff&size=80'
    };
  }

  function renderNode(node, parentId) {
    var hasChildren = node.children && node.children.length > 0;
    var childrenId = parentId ? parentId + '-' + node.id : node.id;
    var toggleClass = hasChildren ? '' : 'node__toggle--hidden';

    var html = '<div class="node" data-id="' + node.id + '" data-parent="' + (parentId || '') + '">' +
      '<button class="node__toggle ' + toggleClass + '" data-target="' + childrenId + '" aria-label="Expandir/colapsar">' +
      '<i class="fas fa-chevron-down"></i>' +
      '</button>' +
      '<span class="node__label" data-id="' + node.id + '">' + node.label + '</span>' +
      '</div>';

    if (hasChildren) {
      html += '<div class="node__children" id="' + childrenId + '">';
      node.children.forEach(function(child) {
        html += renderNode(child, childrenId);
      });
      html += '</div>';
    }

    return html;
  }

  function renderAlcaldia() {
    var container = document.getElementById('alcaldiaNodes');
    if (!container) return;
    var html = '';
    alcaldiaData.forEach(function(node) {
      html += renderNode(node, 'alcaldia');
    });
    container.innerHTML = html;
  }

  function renderConcejo() {
    var container = document.getElementById('concejoNodes');
    if (!container) return;
    var html = '';
    concejoData.forEach(function(node) {
      html += '<div class="node node--leaf" data-id="' + node.id + '">' +
        '<button class="node__toggle node__toggle--hidden" aria-label="Sin dependientes">' +
        '<i class="fas fa-chevron-down"></i>' +
        '</button>' +
        '<span class="node__label" data-id="' + node.id + '">' + node.label + '</span>' +
        '</div>';
    });
    container.innerHTML = html;
  }

  function initBranchToggles() {
    var toggleAlcaldia = document.getElementById('toggleAlcaldia');
    var toggleConcejo = document.getElementById('toggleConcejo');
    var contentAlcaldia = document.getElementById('alcaldiaContent');
    var contentConcejo = document.getElementById('concejoContent');

    var isDesktop = window.innerWidth > 992;

    if (isDesktop) {
      if (contentAlcaldia) {
        contentAlcaldia.classList.add('open');
        if (toggleAlcaldia) {
          toggleAlcaldia.classList.add('active');
          toggleAlcaldia.setAttribute('aria-expanded', 'true');
          toggleAlcaldia.style.cursor = 'default';
        }
      }
      if (contentConcejo) {
        contentConcejo.classList.add('open');
        if (toggleConcejo) {
          toggleConcejo.classList.add('active');
          toggleConcejo.setAttribute('aria-expanded', 'true');
          toggleConcejo.style.cursor = 'default';
        }
      }
    } else {
      if (contentAlcaldia) {
        contentAlcaldia.classList.remove('open');
        if (toggleAlcaldia) {
          toggleAlcaldia.classList.remove('active');
          toggleAlcaldia.setAttribute('aria-expanded', 'false');
          toggleAlcaldia.style.cursor = 'pointer';
        }
      }
      if (contentConcejo) {
        contentConcejo.classList.remove('open');
        if (toggleConcejo) {
          toggleConcejo.classList.remove('active');
          toggleConcejo.setAttribute('aria-expanded', 'false');
          toggleConcejo.style.cursor = 'pointer';
        }
      }

      if (toggleAlcaldia && contentAlcaldia) {
        toggleAlcaldia.addEventListener('click', function(e) {
          e.preventDefault();
          var isOpen = contentAlcaldia.classList.contains('open');
          if (isOpen) {
            contentAlcaldia.classList.remove('open');
            this.classList.remove('active');
            this.setAttribute('aria-expanded', 'false');
          } else {
            contentAlcaldia.classList.add('open');
            this.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
          }
        });
      }

      if (toggleConcejo && contentConcejo) {
        toggleConcejo.addEventListener('click', function(e) {
          e.preventDefault();
          var isOpen = contentConcejo.classList.contains('open');
          if (isOpen) {
            contentConcejo.classList.remove('open');
            this.classList.remove('active');
            this.setAttribute('aria-expanded', 'false');
          } else {
            contentConcejo.classList.add('open');
            this.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
          }
        });
      }
    }
  }

  function initModal() {
    var overlay = document.getElementById('modalOverlay');
    var closeBtn = document.getElementById('modalClose');
    if (!overlay || !closeBtn) return;

    document.querySelectorAll('.node__label').forEach(function(label) {
      label.addEventListener('click', function(e) {
        e.stopPropagation();
        var id = this.getAttribute('data-id');
        var labelText = this.textContent.trim();
        var perfil = getPerfil(id, labelText);
        openModal(perfil);
      });
    });

    function openModal(perfil) {
      document.getElementById('modalTitle').textContent = perfil.cargo || 'Cargo sin información';
      document.getElementById('modalRole').textContent = perfil.cargo || 'Cargo sin información';
      document.getElementById('modalName').textContent = perfil.nombre || 'No disponible';

      var emailEl = document.getElementById('modalEmail');
      if (perfil.email && perfil.email !== 'No disponible') {
        emailEl.textContent = perfil.email;
        emailEl.href = 'mailto:' + perfil.email;
        emailEl.style.display = 'inline';
      } else {
        emailEl.textContent = 'No disponible';
        emailEl.href = '#';
        emailEl.style.display = 'inline';
      }

      document.getElementById('modalPhone').textContent = perfil.telefono || 'No disponible';
      document.getElementById('modalExtension').textContent = perfil.extension || 'No disponible';

      var avatarEl = document.getElementById('modalAvatar');
      if (perfil.avatar) {
        avatarEl.innerHTML = '<img src="' + perfil.avatar + '" alt="' + perfil.nombre + '">';
      } else {
        avatarEl.innerHTML = '<i class="fas fa-user"></i>';
      }

      overlay.style.display = 'flex';
      void overlay.offsetHeight;
      overlay.classList.add('open');
      document.body.classList.add('no-scroll');
    }

    function closeModal() {
      overlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
      setTimeout(function() {
        overlay.style.display = 'none';
      }, 400);
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeModal();
      }
    });
  }

  function initToggleEvents() {
    document.addEventListener('click', function(e) {
      var toggle = e.target.closest('.node__toggle:not(.node__toggle--hidden)');
      if (toggle) {
        e.stopPropagation();
        var targetId = toggle.getAttribute('data-target');
        var childrenContainer = document.getElementById(targetId);
        if (childrenContainer) {
          childrenContainer.classList.toggle('open');
          toggle.classList.toggle('active');
        }
      }
    });
  }

  function init() {
    renderAlcaldia();
    renderConcejo();
    initToggleEvents();
    initModal();
    initBranchToggles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();