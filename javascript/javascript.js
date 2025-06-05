window.onload = function() {
    carregarPlantilla();
    carregarPrincipal();
};

function carregarPlantilla() {
    loadPart('./plantilla/header.html', 'header');
    loadPart('./plantilla/divInferior.html', 'inferior');
}

function carregarPrincipal() {
    loadPart('./continguts/principal.html', 'main');
}
function carregarHorari() {
    loadPart('./continguts/horari.html', 'main');
}
function carregarVideos() {
    loadPart('./continguts/videos.html', 'main');
}
function carregarContactes() {
    loadPart('./continguts/contactes.html', 'main');
}
function carregarTenda() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "php/obtenirTenda.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let lotesContainer = document.getElementById("main");
            lotesContainer.innerHTML = "";

            let tendaDiv = document.createElement('div');
            tendaDiv.id = 'tenda';

            if (data.status === "success" && data.lotesTenda.length > 0) {
                data.lotesTenda.forEach(function(lote) {
                    let loteDiv = document.createElement('div');
                    loteDiv.id = 'lote' + lote.id;
                    loteDiv.style = "display: flex; align-items: center; gap: 20px;";
                    loteDiv.innerHTML = `
                        <img src="imatges/loteTenda/loteTenda${lote.id}.png" height="200" width="200" style="flex-shrink: 0;">
                        <div class="tendaMain">
                            <h2>${lote.nom}</h2>
                            <p>${lote.preu} V</p>
                            <button class="botonTenda">Comprar</button>
                        </div>
                        <div class="tendaDescripcio">
                            <ul>
                                ${lote.cosmetics.map(cosmetic => `
                                    <li>${cosmetic.nom} (${cosmetic.tipus})</li>
                                `).join('')}
                            </ul>
                        </div>
                    `;
                    tendaDiv.appendChild(loteDiv);
                });
            } else {
                tendaDiv.innerHTML = "<p>No hay datos para mostrar</p>";
            }

            lotesContainer.appendChild(tendaDiv);
        } else {
            alert("Error cargando los lotes!");
            console.error("Error cargando los lotes!");
        }
    };
    xhr.send();
}

function loadPart(url, ClaseOId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var element = document.getElementById(ClaseOId);
            if (!element) {
                element = document.querySelector('.' + ClaseOId);
            }
            if (element) {
                element.innerHTML = xhr.responseText;
            } else {
                console.error('Element no trobat: ' + ClaseOId);
            }
        } else {
            console.error('Error al carregar ' + ClaseOId);
        }
    };

    xhr.onerror = function() {
        console.error('Error en la sol·licitud');
    };

    xhr.send();
}