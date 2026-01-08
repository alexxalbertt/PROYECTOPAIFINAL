// Treballarem sempre amb una variable global, obj,
// que conté tots els accidents carregats del CSV.

/* ================================================= */
/* AVÍS: comprova si el CSV està carregat             */
/* ================================================= */
function comprovaCSVcarregat() {
  let resultat = document.getElementById("resultats");
  resultat.innerHTML = "";

  let p = document.createElement("p");
  p.innerHTML =
    "<strong>Cal carregar primer un fitxer CSV per veure els resultats.</strong>";
  resultat.appendChild(p);
}

/* ================================================= */
/* =================== EXERCICI 2.1 ================= */
/* Nombre total d'accidents                           */
/* ================================================= */
function exercici01() {
  // Comprovem si hi ha dades carregades
  if (obj.length === 0) {
    comprovaCSVcarregat();
    return;
  }

  let resultat = document.getElementById("resultats");
  resultat.innerHTML = "";

  let total = obj.length;

  let p = document.createElement("p");
  p.innerHTML = "<strong>Nombre total d'accidents:</strong> " + total;
  resultat.appendChild(p);
}

/* ================================================= */
/* =================== EXERCICI 2.2 ================= */
/* Dia de la setmana amb més accidents               */
/* ================================================= */
function exercici02() {
  if (obj.length === 0) {
    comprovaCSVcarregat();
    return;
  }

  let resultat = document.getElementById("resultats");
  resultat.innerHTML = "";

  let comptador = {};

  // Comptem accidents per dia de la setmana
  for (let i = 0; i < obj.length; i++) {
    let dia = obj[i].diaSet;

    if (comptador[dia] === undefined) {
      comptador[dia] = 1;
    } else {
      comptador[dia]++;
    }
  }

  // Busquem el dia amb més accidents
  let diaMax = "";
  let maxAccidents = 0;

  for (let dia in comptador) {
    if (comptador[dia] > maxAccidents) {
      maxAccidents = comptador[dia];
      diaMax = dia;
    }
  }

  let p = document.createElement("p");
  p.innerHTML =
    "<strong>Dia amb més accidents:</strong> " +
    diaMax +
    " (" +
    maxAccidents +
    ")";
  resultat.appendChild(p);
}

/* ================================================= */
/* =================== EXERCICI 2.3 ================= */
/* Accidents per districte (llista)                  */
/* ================================================= */
function exercici03() {
  if (obj.length === 0) {
    comprovaCSVcarregat();
    return;
  }

  let resultat = document.getElementById("resultats");
  resultat.innerHTML = "";

  // Array de 0 a 10 (0 = Altres / desconegut)
  let comptador = new Array(11).fill(0);

  for (let i = 0; i < obj.length; i++) {
    let d = obj[i].nDist;

    if (d >= 1 && d <= 10) {
      comptador[d]++;
    } else {
      comptador[0]++;
    }
  }

  let ul = document.createElement("ul");

  let liAltres = document.createElement("li");
  liAltres.innerHTML = "Altres / desconegut: " + comptador[0];
  ul.appendChild(liAltres);

  for (let i = 1; i <= 10; i++) {
    let li = document.createElement("li");
    li.innerHTML = "Districte " + i + ": " + comptador[i];
    ul.appendChild(li);
  }

  resultat.appendChild(ul);
}

/* ================================================= */
/* =================== EXERCICI 2.4 ================= */
/* Formulari + select + eventListener                */
/* ================================================= */
function exercici04() {
  if (obj.length === 0) {
    comprovaCSVcarregat();
    return;
  }

  // Crea el formulari amb el select (funció donada)
  creaFormulari();

  let select = document.getElementById("districtes");

  // Quan es canvia el districte, es calcula el nombre d'accidents
  select.addEventListener("change", function () {
    let resultat = document.getElementById("resultats");

    let districteSeleccionat = select.value;
    let comptador = 0;

    for (let i = 0; i < obj.length; i++) {
      if (obj[i].districte === districteSeleccionat) {
        comptador++;
      }
    }

    let p = document.createElement("p");
    p.innerHTML =
      "Accidents al districte <strong>" +
      districteSeleccionat +
      "</strong>: " +
      comptador;

    resultat.appendChild(p);
  });
}
/* ================================================= */
/* ENLLAÇOS DEL MENÚ                                 */
/* ================================================= */

document.getElementById("exer01").addEventListener("click", function (e) {
  e.preventDefault();
  exercici01();
});

document.getElementById("exer02").addEventListener("click", function (e) {
  e.preventDefault();
  exercici02();
});

document.getElementById("exer03").addEventListener("click", function (e) {
  e.preventDefault();
  exercici03();
});

document.getElementById("exer04").addEventListener("click", function (e) {
  e.preventDefault();
  exercici04();
});


