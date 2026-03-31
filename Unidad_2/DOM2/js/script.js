let dNom="", dCur="", dEd=0, dHn=0, dCiu="", letTmp="", esSlot=true, slotIdx=0;

const cursos = ["1° SEM","2° SEM","3° SEM","4° SEM","5° SEM","EGRESADO"];
const ciudades = ["SUCRE", "LA PAZ", "SANTA CRUZ", "POTOSI", "ORURO", "TARIJA", "COCHABAMBA"];
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ ".split("");
const simbolos = "ΣΔΩΨΦΞΛΠΓΘ#$%&/()=?¿!¡@*".split("");

const grid = document.getElementById('alfabeto');
const bar = document.getElementById('timer-letra');
let tOut;

// Teclado
letras.forEach((l, i) => {
    const wrap = document.createElement('div'); wrap.className = 'tecla-wrap';
    const inner = document.createElement('div'); inner.className = 'tecla-inner';
    const front = document.createElement('div'); front.className = 'tecla-front';
    front.innerText = simbolos[i % simbolos.length];
    const back = document.createElement('div'); back.className = 'tecla-back';
    back.innerText = l;
    inner.appendChild(front); inner.appendChild(back);
    wrap.appendChild(inner);
    inner.onclick = () => {
        clearTimeout(tOut);
        document.querySelectorAll('.tecla-inner').forEach(x => x.classList.remove('active'));
        inner.classList.add('active');
        letTmp = l;
        bar.style.transition = "none"; bar.style.width = "0%";
        setTimeout(() => { bar.style.transition = "width 1s linear"; bar.style.width = "100%"; }, 10);
        tOut = setTimeout(() => { letTmp = ""; inner.classList.remove('active'); bar.style.width = "0%"; }, 1000);
    };
    grid.appendChild(wrap);
});

document.getElementById('btn-conf').onclick = () => {
    if(letTmp) { dNom += letTmp; document.getElementById('out-n').innerText = dNom; letTmp = ""; }
};

// Slot Machine
setInterval(() => { 
    if(esSlot) { 
        slotIdx = Math.floor(Math.random() * cursos.length); 
        document.getElementById('slot-visor').innerText = cursos[slotIdx]; 
    } 
}, 150);

window.stopSlot = () => { 
    esSlot = !esSlot; 
    if(!esSlot) { 
        dCur = cursos[slotIdx]; 
        document.getElementById('out-c').innerText = dCur; 
    } 
};

// Sliders
window.updateVal = (tipo) => {
    if(tipo === 'edad') { dEd = document.getElementById('sld-edad').value; document.getElementById('v-edad').innerText = dEd; }
    else { dHn = document.getElementById('sld-hnos').value; document.getElementById('v-hnos').innerText = dHn; }
};

// Radar
setInterval(() => {
    const r = document.getElementById('radar');
    const p = document.createElement('div');
    p.style = `position:absolute; width:10px; height:10px; background:white; border-radius:50%; left:${Math.random()*90}%; top:${Math.random()*60}%; cursor:pointer;`;
    p.onclick = () => { dCiu = ciudades[Math.floor(Math.random()*ciudades.length)]; document.getElementById('out-ciu').innerText = dCiu; p.remove(); };
    r.appendChild(p);
    setTimeout(() => { if(p.parentNode) p.remove(); }, 2000);
}, 1500);

// Reset e Interfaz
function resetNucleo() {
    dNom = ""; dCur = ""; dEd = 0; dHn = 0; dCiu = "";
    document.getElementById('out-n').innerText = "_";
    document.getElementById('out-c').innerText = "---";
    document.getElementById('out-ciu').innerText = "ESPERANDO...";
    document.getElementById('sld-edad').value = 0; document.getElementById('v-edad').innerText = "0";
    document.getElementById('sld-hnos').value = 0; document.getElementById('v-hnos').innerText = "0";
    esSlot = true;
}

document.getElementById('btn-sellar').onclick = () => {
    if(!dNom || !dCur || !dCiu) return alert("ERROR: FALTAN DATOS");
    const tbody = document.querySelector('#tabla tbody');
    const row = tbody.insertRow();
    row.innerHTML = `<td>${dNom}</td><td>${dCur}</td><td>${dEd}</td><td>${dHn}</td><td>${dCiu}</td>
        <td><button class="btn-accion btn-edit" onclick="editarFila(this)">✎</button>
            <button class="btn-accion btn-del" onclick="this.closest('tr').remove()">X</button></td>`;
    resetNucleo();
};

window.editarFila = (btn) => {
    const row = btn.closest('tr');
    dNom = row.cells[0].innerText; dCur = row.cells[1].innerText;
    dEd = row.cells[2].innerText; dHn = row.cells[3].innerText; dCiu = row.cells[4].innerText;
    document.getElementById('out-n').innerText = dNom;
    document.getElementById('out-c').innerText = dCur;
    document.getElementById('slot-visor').innerText = dCur; esSlot = false;
    document.getElementById('sld-edad').value = dEd; document.getElementById('v-edad').innerText = dEd;
    document.getElementById('sld-hnos').value = dHn; document.getElementById('v-hnos').innerText = dHn;
    document.getElementById('out-ciu').innerText = dCiu;
    row.remove();
};