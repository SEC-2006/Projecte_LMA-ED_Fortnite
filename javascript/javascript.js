var emailUsuari = "";
var idUsuari = "";
var paVos = 0;

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
function carregarLogin() {
    loadPart('./continguts/login.html', 'main');
}
function carregarRegistre() {
    loadPart('./continguts/registre.html', 'main');
}
function carregarBenvingudaUsuari() {
    var benvingudaUsuari = document.getElementById("benvingudaUsuari");
    benvingudaUsuari.innerHTML = "Hola, " + emailUsuari + " - " + paVos + " V";
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
                    let comprat = false;
                    lote.usuaris.forEach(function(usuari) {
                        if (usuari.id === idUsuari) {
                            comprat = true;
                        }
                    });
                    loteDiv.id = 'lote' + lote.id;
                    loteDiv.style = "display: flex; align-items: center; gap: 20px;";
                    loteDiv.innerHTML = `
                        <img src="imatges/loteTenda/loteTenda${lote.id}.png" height="200" width="200" style="flex-shrink: 0;">
                        <div class="tendaMain">
                            <h2>${lote.nom}</h2>
                            <p>${lote.preu} V</p>
                            <p>${comprat}</p>
                            <button class="botonTenda" style="${emailUsuari === "" || comprat ? 'background-color:rgb(146, 146, 0); cursor: not-allowed;' : ''}" 
                            ${emailUsuari === "" ? ` disabled>Inicia sesión para comprar` : ` onclick='comprarLote(${lote.id, lote.preu})'>Comprar`}</button>
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

function comprarLote(idLote, preuLote)
{
    const dades = {
        idUsuari: idUsuari,
        idLote: idLote
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/insertarLoteUsuari.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            if (result.status === "success") {
                if(paVos < preuLote) {
                    alert("No tienes suficientes PaVos para comprar este lote.");
                    return;
                }
                else
                {
                    paVos-=preuLote;
                    var xhrPavos = new XMLHttpRequest();
                    xhrPavos.open('GET', 'php/actualizarPavos.php?paVos=' + paVos + '&idUsuari=' + idUsuari, true);
                    xhrPavos.onload = function() {
                        if (data.status === "error") {
                            alert("Error inesperado durante la compra del lote.");
                            paVos+=preuLote;
                            return;
                        }
                    };
                    xhrPavos.send();
                    alert("Lote comprado exitosamente.");
                    carregarBenvingudaUsuari();
                    carregarTenda();
                }
                
            } else {
                alert("Error: " + result.message);
            }
        } else {
            alert("Error en la solicitud.");
            console.error("Error en la solicitud:", xhr.statusText);
        }
    };
    
    xhr.onerror = function() {
        console.error("Error en la solicitud:", xhr.statusText);
        alert("Ocurrió un error al intentar comprar el lote.");
    };
    
    xhr.send(JSON.stringify(dades));
}

function loadPart(url, ClaseOId, asinc=true) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, asinc);

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

function login() {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const dades = {
        email: email,
        password: password
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);

            if (result.status === "success") {
                alert("Inicio de sesión exitoso.");
                emailUsuari = email;
                idUsuari = result.user.id;
                paVos = result.user.paVos;
                loadPart('./plantilla/headerUsuari.html', 'header', false);
                carregarPrincipal();
                carregarBenvingudaUsuari();
            } else {
                alert("Error: " + result.message);
            }
        } else {
            alert("Error en la solicitud.");
            console.error("Error en la solicitud:", xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error("Error en la solicitud:", xhr.statusText);
        alert("Ocurrió un error al intentar iniciar sesión.");
    };

    xhr.send(JSON.stringify(dades));
}

function registrar() {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const dades = {
        email: email,
        password: password,
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/registrar.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);

            if (result.status === "success") {
                alert("Registro exitoso.");
                carregarLogin();
            } else {
                alert("Error: " + result.message);
            }
        } else {
            alert("Error en la solicitud.");
            console.error("Error en la solicitud:", xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error("Error en la solicitud:", xhr.statusText);
        alert("Ocurrió un error al intentar registrarse.");
    };

    xhr.send(JSON.stringify(dades));
}
