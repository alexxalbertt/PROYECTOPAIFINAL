// Declaració de variables globals
let obj = [];
// Fi de la declaració de variables globals
/* Funció readSingleFile(e)                                                     */
/* Permet a l'usuari carregar un fitxer CSV del seu ordinador                  */
function readSingleFile(e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const contents = event.target.result;
    generaObj(contents);
  };
  reader.readAsText(file);
}


/* Funció generaObj(contents)                                                   */
/* Converteix el CSV en un array d'objectes amb les dades necessàries           */
/*                                                                             */
/* MODIFICACIÓ:                                                                */
/* S'ha adaptat la separació de línies del CSV perquè funcioni amb fitxers     */
/* de diferents anys, ja que alguns utilitzen '\n' i altres '\r\n'             */

function generaObj(contents) {
  // Reiniciem l'array per evitar dades antigues
  obj = [];

  // Separació robusta de línies (compatible amb diferents formats de CSV)
  const files = contents.split(/\r?\n/);
  const totalFiles = files.length;

  // Mostrem l'any
  const primeraLinia = files[1].split(",");
  document.getElementById("any").innerHTML =
    "Any: " + primeraLinia[9].replace(/['"]+/g, "");

  for (let i = 1; i < totalFiles - 1; i++) {
    const camps = files[i].split(",");

    let registre = {};

    // Cas en què el nom del barri conté comes
    if (camps[4] && camps[4][0] === '"') {
      registre.diaSet = camps[9];
      registre.mes = parseInt(camps[11]);
      registre.nomMes = camps[12];
      registre.diaMes = parseInt(camps[13]);
      registre.hora = parseInt(camps[14]);
      registre.descAcc = camps[15];
      registre.districte = camps[2];
      registre.nDist = parseInt(camps[1]);
      registre.barri = camps[4] + "," + camps[5];
    } else {
      registre.diaSet = camps[8];
      registre.mes = parseInt(camps[10]);
      registre.nomMes = camps[11];
      registre.diaMes = parseInt(camps[12]);
      registre.hora = parseInt(camps[13]);
      registre.descAcc = camps[14];
      registre.districte = camps[2];
      registre.nDist = parseInt(camps[1]);
      registre.barri = camps[4];
    }

    obj.push(registre);
  }

  return obj;
}

// Afegim l'esdeveniment de càrrega del fitxer
document
  .getElementById("file-input")
  .addEventListener("change", readSingleFile, false);


/* Funció creaFormulari()                                                       */
/* Crea un formulari amb un select per seleccionar el districte                */

function creaFormulari() {
  const text = document.getElementById("resultats");
  text.innerHTML = "";

  const f = document.createElement("form");
  f.name = "formulari";

  // Recuperem els districtes (0 = Altres, 1–10 Barcelona)
  let districtes = [];
  districtes[0] = "Altres";

  for (let i = 1; i <= 10; i++) {
    const element = obj.find(el => el.nDist === i);
    districtes[i] = element ? element.districte : "Districte " + i;
  }

  const sel = document.createElement("select");
  sel.name = "districtes";
  sel.id = "districtes";

  for (let i = 0; i < districtes.length; i++) {
    const op = document.createElement("option");
    op.value = districtes[i];
    op.appendChild(document.createTextNode(districtes[i]));
    sel.appendChild(op);
  }

  f.appendChild(sel);
  text.appendChild(f);
}
