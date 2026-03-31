// script.js
let nombreConstruido = "";LET //MUTARA
let cursoActual = "";
let edadActual = 25;
let hermanosActual = 0;
let ciudadActual = "";

let slotActivo = true;
let indiceCurso = 0;
const listaCursos = ["1° SEM", "2° SEM", "3° SEM", "4° SEM", "5° SEM", "EGRESADO", "ANÓMALO", "NEBULOSA", "SINGULARIDAD"];
const ciudadesMisticas = ["SUCRE ★", "LA PAZ ✦", "SANTA CRUZ ✧", "POTOSÍ ☆", "ORURO ✨", "TARIJA 🌙", "COCHABAMBA 🌟", "BENI ☀️", "PANDO 🍃"];

const letrasCompletas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ ".split("");
const simbolosMisticos = ["⚡","🔥","❄️","💀","👾","🎃","🔮","🕯️","🧨","💣","🪦","👻","🤡","🎲","🌀","🌪️","⭐","🌙","☄️","💥","🔪","🩸","🧠","👁️","🦷","🦴","🎭","🧙","💢","🪄","🌈","✨"];

let mapeoGlifos = [];
let glifoTmp = null;
let tiempoGlifo = null;
const barraGlifo = document.getElementById("barraGlifoPsy");
// Función para generar un nuevo mapa de glifos con letras mezcladas y símbolos asignados
function generarMapaPsy() {
    let letrasMezcladas = [...letrasCompletas];
    for(let i=letrasMezcladas.length-1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [letrasMezcladas[i], letrasMezcladas[j]] = [letrasMezcladas[j], letrasMezcladas[i]];
    }
    mapeoGlifos = [];
    for(let i=0; i<letrasCompletas.length; i++) {
        let simbolo = simbolosMisticos[i % simbolosMisticos.length] + (Math.floor(i/3) % 4);
        mapeoGlifos.push({ simbolo: simbolo, letra: letrasMezcladas[i] });
    }
    for(let i=mapeoGlifos.length-1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [mapeoGlifos[i], mapeoGlifos[j]] = [mapeoGlifos[j], mapeoGlifos[i]];
    }
}

function renderGrillaPsy() {
    const contenedor = document.getElementById("grillaGlifosPsy");
    contenedor.innerHTML = "";
    mapeoGlifos.forEach(item => {
        const celda = document.createElement("div");
        celda.className = "glifoVision";
        celda.textContent = item.simbolo;
        celda.setAttribute("data-letra", item.letra);
        celda.addEventListener("click", (e) => {
            e.stopPropagation();
            const letraReal = item.letra;
            const textoOriginal = celda.textContent;
            celda.textContent = letraReal;
            celda.style.background = "#ff44ff";
            celda.style.color = "#000";
            
            if(tiempoGlifo) clearTimeout(tiempoGlifo);
            glifoTmp = letraReal;
            
            barraGlifo.style.transition = "none";
            barraGlifo.style.width = "0%";
            setTimeout(() => {
                barraGlifo.style.transition = "width 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                barraGlifo.style.width = "100%";
            }, 10);
            
            tiempoGlifo = setTimeout(() => {
                if(celda.textContent !== textoOriginal) {
                    celda.textContent = textoOriginal;
                    celda.style.background = "";
                    celda.style.color = "";
                }
                if(glifoTmp === letraReal) {
                    glifoTmp = null;
                    barraGlifo.style.width = "0%";
                }
            }, 700);
            
            document.querySelectorAll(".glifoVision").forEach(c => c.style.border = "1px solid #ff44ff");
            celda.style.border = "3px solid cyan";
        });
        contenedor.appendChild(celda);
    });
}

function confirmarGlifoPsy() {
    if(glifoTmp !== null) {
        nombreConstruido += glifoTmp;
        document.getElementById("visorNombrePsy").innerText = nombreConstruido || "_";
        if(tiempoGlifo) clearTimeout(tiempoGlifo);
        barraGlifo.style.width = "0%";
        glifoTmp = null;
        document.querySelectorAll(".glifoVision").forEach(celda => {
            const letraAsoc = celda.getAttribute("data-letra");
            const simboloOrig = mapeoGlifos.find(m => m.letra === letraAsoc)?.simbolo;
            if(simboloOrig && celda.textContent !== simboloOrig) {
                celda.textContent = simboloOrig;
                celda.style.background = "";
                celda.style.color = "";
            }
            celda.style.border = "1px solid #ff44ff";
        });
        generarMapaPsy();
        renderGrillaPsy();
    } else {
        alert("⚠ ALERTA: No has invocado ningún glifo. Toca un símbolo para revelar su esencia.");
    }
}

let intervalSlot;
function iniciarSlotPsy() {
    if(intervalSlot) clearInterval(intervalSlot);
    intervalSlot = setInterval(() => {
        if(slotActivo) {
            indiceCurso = Math.floor(Math.random() * listaCursos.length);
            document.getElementById("slotPsicodelia").innerText = listaCursos[indiceCurso];
        }
    }, 50);
}

function anclarSlot() {
    if(slotActivo) {
        slotActivo = false;
        cursoActual = listaCursos[indiceCurso];
        document.getElementById("lecturaFijadaPsy").innerText = cursoActual;
        document.getElementById("slotPsicodelia").style.animation = "none";
    } else {
        slotActivo = true;
        cursoActual = "";
        document.getElementById("lecturaFijadaPsy").innerText = "---";
        document.getElementById("slotPsicodelia").style.animation = "vibrarAlucinante 0.12s infinite";
    }
}

let edadValor = 25;
const valorCosmicoSpan = document.getElementById("valorCosmico");
const lineaCosmica = document.getElementById("lineaCosmica");
const pantallaCosmica = document.getElementById("pantallaCosmica");

function actualizarOsciloscopio() {
    edadActual = edadValor;
    valorCosmicoSpan.innerText = edadValor;
    let porcentaje = (edadValor / 100) * 100;
    if(porcentaje > 100) porcentaje = 100;
    if(porcentaje < 0) porcentaje = 0;
    lineaCosmica.style.top = porcentaje + "%";
}

function subirEdad() { if(edadValor < 100) { edadValor++; actualizarOsciloscopio(); } }
function bajarEdad() { if(edadValor > 0) { edadValor--; actualizarOsciloscopio(); } }
function randomEdad() { edadValor = Math.floor(Math.random() * 101); actualizarOsciloscopio(); }

pantallaCosmica.addEventListener("click", (e) => {
    const rect = pantallaCosmica.getBoundingClientRect();
    const y = e.clientY - rect.top;
    let porcentaje = (y / rect.height) * 100;
    if(porcentaje < 0) porcentaje = 0;
    if(porcentaje > 100) porcentaje = 100;
    edadValor = Math.round(porcentaje);
    actualizarOsciloscopio();
});

let hermanosValor = 0;
const nivelHermanos = document.getElementById("nivelHermanos");
const valorHermanosSpan = document.getElementById("valorHermanosDisplay");
const barraHermanos = document.getElementById("barraHermanos");

function actualizarHermanosUI() {
    hermanosActual = hermanosValor;
    valorHermanosSpan.innerText = hermanosValor;
    let porcentaje = ((hermanosValor + 5) / 30) * 100;
    if(porcentaje < 0) porcentaje = 0;
    if(porcentaje > 100) porcentaje = 100;
    nivelHermanos.style.width = porcentaje + "%";
    if(hermanosValor < 0) nivelHermanos.style.background = "#4488ff";
    else nivelHermanos.style.background = "linear-gradient(90deg, #ff00ff, #ffaa44, #ffff00)";
}

function aumentarHermanos() { if(hermanosValor < 25) { hermanosValor++; actualizarHermanosUI(); } }
function disminuirHermanos() { if(hermanosValor > -5) { hermanosValor--; actualizarHermanosUI(); } }
function resetHermanos() { hermanosValor = 0; actualizarHermanosUI(); }

barraHermanos.addEventListener("click", (e) => {
    const rect = barraHermanos.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let porcentaje = (x / rect.width) * 100;
    let nuevoVal = Math.floor(porcentaje * 0.3) - 5;
    if(nuevoVal > 25) nuevoVal = 25;
    if(nuevoVal < -5) nuevoVal = -5;
    hermanosValor = nuevoVal;
    actualizarHermanosUI();
});

let intervalEspiritus;
function generarEspiritu() {
    const zona = document.getElementById("campoEspiritus");
    const espiritu = document.createElement("div");
    espiritu.className = "espiritu";
    espiritu.style.left = Math.random() * 85 + "%";
    espiritu.style.top = Math.random() * 70 + "%";
    espiritu.addEventListener("click", (e) => {
        e.stopPropagation();
        const ciudadRand = ciudadesMisticas[Math.floor(Math.random() * ciudadesMisticas.length)];
        ciudadActual = ciudadRand;
        document.getElementById("ciudadEspiritu").innerText = ciudadActual;
        espiritu.remove();
        zona.style.backgroundColor = "#0a2a4a";
        setTimeout(() => zona.style.backgroundColor = "#000a1f", 150);
    });
    zona.appendChild(espiritu);
    setTimeout(() => { if(espiritu.parentNode) espiritu.remove(); }, 1600);
}

function iniciarCazaEspiritual() {
    if(intervalEspiritus) clearInterval(intervalEspiritus);
    intervalEspiritus = setInterval(() => {
        if(document.getElementById("campoEspiritus")) generarEspiritu();
    }, 1200);
}

function purgarEspiritu() {
    ciudadActual = "";
    document.getElementById("ciudadEspiritu").innerText = "--- NINGÚN ESPÍRITU ---";
    const espiritus = document.querySelectorAll("#campoEspiritus .espiritu");
    espiritus.forEach(e => e.remove());
}

function resetPortal() {
    nombreConstruido = "";
    document.getElementById("visorNombrePsy").innerText = "_";
    cursoActual = "";
    slotActivo = true;
    document.getElementById("lecturaFijadaPsy").innerText = "---";
    document.getElementById("slotPsicodelia").style.animation = "vibrarAlucinante 0.12s infinite";
    edadValor = 25;
    actualizarOsciloscopio();
    hermanosValor = 0;
    actualizarHermanosUI();
    ciudadActual = "";
    document.getElementById("ciudadEspiritu").innerText = "--- NINGÚN ESPÍRITU ---";
    const espiritus = document.querySelectorAll("#campoEspiritus .espiritu");
    espiritus.forEach(e => e.remove());
    if(tiempoGlifo) clearTimeout(tiempoGlifo);
    glifoTmp = null;
    barraGlifo.style.width = "0%";
    generarMapaPsy();
    renderGrillaPsy();
}

function sellarRegistroPsy() {
    if(!nombreConstruido.trim()) { alert("🌀 ERROR: Nombre vacío. Invoca glifos."); return; }
    if(!cursoActual) { alert("🌀 ERROR: Curso no anclado. Usa 'ANCLAR REALIDAD'."); return; }
    if(!ciudadActual) { alert("🌀 ERROR: Ciudad vacía. Captura espíritus."); return; }
    
    const tbody = document.getElementById("cuerpoTablaPsy");
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${escapeHtml(nombreConstruido)}</td>
        <td>${escapeHtml(cursoActual)}</td>
        <td>${edadActual}</td>
        <td>${hermanosActual}</td>
        <td>${escapeHtml(ciudadActual)}</td>
        <td><button class="btnEditarPsy">✎ EDITAR</button> <button class="btnEliminarPsy">🗑 ELIMINAR</button></td>
    `;
    const btnEdit = fila.querySelector(".btnEditarPsy");
    const btnDel = fila.querySelector(".btnEliminarPsy");
    
    btnEdit.addEventListener("click", () => {
        nombreConstruido = fila.cells[0].innerText;
        document.getElementById("visorNombrePsy").innerText = nombreConstruido;
        cursoActual = fila.cells[1].innerText;
        document.getElementById("lecturaFijadaPsy").innerText = cursoActual;
        slotActivo = false;
        document.getElementById("slotPsicodelia").innerText = cursoActual;
        edadValor = parseInt(fila.cells[2].innerText);
        actualizarOsciloscopio();
        hermanosValor = parseInt(fila.cells[3].innerText);
        actualizarHermanosUI();
        ciudadActual = fila.cells[4].innerText;
        document.getElementById("ciudadEspiritu").innerText = ciudadActual;
        fila.remove();
    });
    
    btnDel.addEventListener("click", () => fila.remove());
    tbody.appendChild(fila);
    resetPortal();
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if(m === '&') return '&amp;';
        if(m === '<') return '&lt;';
        if(m === '>') return '&gt;';
        return m;
    });
}

generarMapaPsy();
renderGrillaPsy();
iniciarSlotPsy();
iniciarCazaEspiritual();

document.getElementById("btnConfirmarGlifoPsy").addEventListener("click", confirmarGlifoPsy);
document.getElementById("btnAnclarSlotPsy").addEventListener("click", anclarSlot);
document.getElementById("btnEdadUp").addEventListener("click", subirEdad);
document.getElementById("btnEdadDown").addEventListener("click", bajarEdad);
document.getElementById("btnEdadRand").addEventListener("click", randomEdad);
document.getElementById("btnHermanosUp").addEventListener("click", aumentarHermanos);
document.getElementById("btnHermanosDown").addEventListener("click", disminuirHermanos);
document.getElementById("btnHermanosReset").addEventListener("click", resetHermanos);
document.getElementById("btnOlvidarEspiritu").addEventListener("click", purgarEspiritu);
document.getElementById("btnSellarPsy").addEventListener("click", sellarRegistroPsy);
document.getElementById("btnResetPsy").addEventListener("click", resetPortal);

actualizarOsciloscopio();
actualizarHermanosUI();

setInterval(() => {
    if(Math.random() < 0.7) {
        generarMapaPsy();
        renderGrillaPsy();
    }
}, 3800);