import { ciudades} from './configuracion.js';

let capasVisibles = [];

function crearBotones(ciudad, mapaDeReferencia) {
    // div que contiene los botones
    const contenedorBotones = document.createElement('div');
    contenedorBotones.id = 'contenedorBoton' + ciudad.name;
    contenedorBotones.className = 'stylocontenedorboton';

    // boton para ver la capa
    const botonVerCapa = document.createElement('button');

    botonVerCapa.textContent = ciudad.nombre; // Texto del botón
    botonVerCapa.id = 'boton' + ciudad.nombre; // Asignar un ID
    botonVerCapa.className = 'btn btn-primary'; // Asignar una clase de estilo
    botonVerCapa.addEventListener('click', () => clickVerCapa(ciudad, mapaDeReferencia));

    contenedorBotones.appendChild(botonVerCapa)

    // boton para eliminar la capa
    const botonEliminarCapa = document.createElement('button');
    botonEliminarCapa.textContent = 'Eliminar';
    botonEliminarCapa.id = 'botonEliminar' + ciudad.nombre;
    botonEliminarCapa.className = 'btn btn-danger';
    botonEliminarCapa.style.display = 'none'; // hago que el boton no se vea
    botonEliminarCapa.addEventListener('click', () => clickEliminarCapa(ciudad, mapaDeReferencia));

    contenedorBotones.appendChild(botonEliminarCapa);

    const menu = document.getElementById('menu');
    menu.appendChild(contenedorBotones);
}

function clickEliminarCapa(ciudad, mapaDeReferencia) {
    const capaId = 'capa' + ciudad.nombre;
    const capa = capasVisibles.find(capa => capa.id == capaId)

    if (capa) {
        // elimino las capas del mapa
        capa.ciudades.remove();
        capa.limite.remove();

        // elimino el elemento de las capas visibles
        capasVisibles = capasVisibles.filter(c => c.id !== capaId);

        // oculto el boton eliminas
        const botonEliminarCapa = document.getElementById('botonEliminar' + ciudad.nombre);
        botonEliminarCapa.style.display = 'none';
    }
}

function clickVerCapa(ciudad, mapaDeReferencia) {
    const capaId = 'capa' + ciudad.nombre;

    if (!capasVisibles.find(capa => capa.id == capaId)) {
        var capaCiudades = L.geoJSON(ciudad.ciudades, {
            pointToLayer: estiloDelPuntoDeLaCapaCiudades,
            onEachFeature: popup,
        }).addTo(mapaDeReferencia);
    
        var capaLimite = L.geoJSON(ciudad.limite, {
        }).addTo(mapaDeReferencia);
    
        capasVisibles.push({
            id: capaId,
            ciudades: capaCiudades,
            limite: capaLimite
        })

        const botonEliminar = document.getElementById('botonEliminar' + ciudad.nombre);
        botonEliminar.style.display = 'initial';
    } else {
        console.warn('La capa ya está visible');
    }
}

function estiloDelPuntoDeLaCapaCiudades(geoJsonPoint, latlng) {
    const configuracionIcono = L.icon({
        iconUrl: 'imagenes/circulo.svg',
        iconSize: [8, 8],
    });

    return L.marker(latlng, {
        icon: configuracionIcono
    });
}

// aca comienza el codigo
export function crearMenu(mapaDeReferencia) {
    ciudades.forEach(ciudad => crearBotones(ciudad, mapaDeReferencia));
}

function popup(feature, layer) {
    // Extraigo las propiedades que me interesan mostrar del objeto feature
    const {
        properties: {
            fecha_relevamiento,
            nombre,
            poblacion
        }
    } = feature;

    // Obtengo el template que esta en el html y hago una copia
    const template = document.querySelector('#informacionCiudad').content.cloneNode(true);

    // Asigno los datos en el template
    template.querySelector("#card-title").textContent = nombre;
    template.querySelector("#poblacion").textContent = poblacion;
    template.querySelector("#fechaRelevamiento").textContent = fecha_relevamiento;

    // Le paso el template al popup.
    layer.bindPopup(template);
}