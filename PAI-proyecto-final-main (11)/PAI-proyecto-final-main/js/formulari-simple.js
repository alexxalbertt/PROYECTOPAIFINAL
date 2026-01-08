/**
 * FORMULARI PAI - PRIMERA PART
 * Validació de formulari amb múltiples camps
 * Basats en els exercicis del curs PAI-UAB
 */

// Accedim als elements del formulari
var nom = document.getElementById("nom");
var edat = document.getElementById("edat");
var cp = document.getElementById("cp");
var email = document.getElementById("email");
var pass = document.getElementById("pass");
var pass2 = document.getElementById("pass2");
var privacitat = document.getElementById("privacitat");

// Elements d'error
var errorNom = document.getElementById("errorNom");
var errorEdat = document.getElementById("errorEdat");
var errorCP = document.getElementById("errorCP");
var errorEmail = document.getElementById("errorEmail");
var errorPass = document.getElementById("errorPass");
var errorPass2 = document.getElementById("errorPass2");
var errorPrivacitat = document.getElementById("errorPrivacitat");

// Checkboxes per mostrar contrasenya
var mostrarPass = document.getElementById("mostrarPass");
var mostrarPass2 = document.getElementById("mostrarPass2");

// Variable per guardar les dades
var datesFormulari = {};

// ========== VALIDACIONS ==========

// Validar nom - Capitalitza primera lletra de cada paraula
function validarNom() {
    var paraules = nom.value.split(" ");
    var resultat = "";

    for (var i = 0; i < paraules.length; i++) {
        if (paraules[i].length > 0) {
            resultat += paraules[i].charAt(0).toUpperCase() +
                        paraules[i].substring(1).toLowerCase() + " ";
        }
    }

    nom.value = resultat.trim();

    if (nom.value.length === 0) {
        errorNom.innerHTML = "Camp obligatori";
        nom.classList.add("invalid");
        return false;
    }

    errorNom.innerHTML = "";
    nom.classList.remove("invalid");
    return true;
}

// Validar edat - Ha de seleccionar una opció
function validarEdat() {
    if (edat.value === "") {
        errorEdat.innerHTML = "Selecciona una opció";
        edat.classList.add("invalid");
        return false;
    }
    errorEdat.innerHTML = "";
    edat.classList.remove("invalid");
    return true;
}

// Validar codi postal - Exactament 5 dígits
function validarCP() {
    if (cp.value.length !== 5) {
        errorCP.innerHTML = "Han de ser 5 dígits";
        cp.classList.add("invalid");
        return false;
    }

    for (var i = 0; i < cp.value.length; i++) {
        if (isNaN(cp.value.charAt(i))) {
            errorCP.innerHTML = "Només números";
            cp.classList.add("invalid");
            return false;
        }
    }

    errorCP.innerHTML = "";
    cp.classList.remove("invalid");
    return true;
}

// Validar email - Una @ i almenys un punt després
function validarEmail() {
    var text = email.value;
    var arrova = text.indexOf("@");

    if (arrova === -1) {
        errorEmail.innerHTML = "Ha de contenir una @";
        email.classList.add("invalid");
        return false;
    }

    if (text.indexOf("@", arrova + 1) !== -1) {
        errorEmail.innerHTML = "Només una @";
        email.classList.add("invalid");
        return false;
    }

    if (text.indexOf(".", arrova) === -1) {
        errorEmail.innerHTML = "Falta punt després de @";
        email.classList.add("invalid");
        return false;
    }

    errorEmail.innerHTML = "";
    email.classList.remove("invalid");
    return true;
}

// Validar contrasenya - 8+ caràcters, majúscula, minúscula, 2 dígits, caràcter especial
function validarPass() {
    if (pass.value.length < 8) {
        errorPass.innerHTML = "Mínim 8 caràcters";
        pass.classList.add("invalid");
        return false;
    }

    var maj = false, min = false, num = 0, esp = false;
    var especials = "!@#$%^&*()_+[]-={};:\\|,.<>/?";

    for (var i = 0; i < pass.value.length; i++) {
        var c = pass.value.charAt(i);

        if (c >= "A" && c <= "Z") maj = true;
        else if (c >= "a" && c <= "z") min = true;
        else if (!isNaN(c)) num++;
        else if (especials.indexOf(c) !== -1) esp = true;
    }

    if (!maj || !min || num < 2 || !esp) {
        errorPass.innerHTML = "Contrasenya no vàlida (min 8 caràcters, 1 majúscula, 1 minúscula, 2 dígits, 1 especial)";
        pass.classList.add("invalid");
        return false;
    }

    errorPass.innerHTML = "";
    pass.classList.remove("invalid");
    return true;
}

// Validar contrasenya confirmada - Ha de coincidir
function validarPass2() {
    if (pass.value !== pass2.value) {
        errorPass2.innerHTML = "Les contrasenyes no coincideixen";
        pass2.classList.add("invalid");
        return false;
    }
    errorPass2.innerHTML = "";
    pass2.classList.remove("invalid");
    return true;
}

// Validar privacitat - Ha d'estar marcada
function validarPrivacitat() {
    if (!privacitat.checked) {
        errorPrivacitat.innerHTML = "Has d'acceptar la política";
        return false;
    }
    errorPrivacitat.innerHTML = "";
    return true;
}

// ========== EVENT LISTENERS ==========

// Validar en temps real quan l'usuari surt del camp
nom.addEventListener("blur", function() {
    validarNom();
});

edat.addEventListener("change", function() {
    validarEdat();
});

cp.addEventListener("blur", function() {
    validarCP();
});

email.addEventListener("blur", function() {
    validarEmail();
});

pass.addEventListener("blur", function() {
    validarPass();
});

pass2.addEventListener("blur", function() {
    validarPass2();
});

// Mostrar/amagar contrasenya
mostrarPass.addEventListener("change", function() {
    if (mostrarPass.checked) {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
});

mostrarPass2.addEventListener("change", function() {
    if (mostrarPass2.checked) {
        pass2.type = "text";
    } else {
        pass2.type = "password";
    }
});

// Botó esborrar
document.getElementById("borrar").addEventListener("click", function() {
    document.getElementById("formulari").reset();
    
    // Netejar errors
    errorNom.innerHTML = "";
    errorEdat.innerHTML = "";
    errorCP.innerHTML = "";
    errorEmail.innerHTML = "";
    errorPass.innerHTML = "";
    errorPass2.innerHTML = "";
    errorPrivacitat.innerHTML = "";
    
    // Netejar classes d'error
    nom.classList.remove("invalid");
    edat.classList.remove("invalid");
    cp.classList.remove("invalid");
    email.classList.remove("invalid");
    pass.classList.remove("invalid");
    pass2.classList.remove("invalid");
    
    // Netejar resultat
    document.getElementById("resultat").innerHTML = "";
    
    // Restaurar tipus de camp
    pass.type = "password";
    pass2.type = "password";
    mostrarPass.checked = false;
    mostrarPass2.checked = false;
});

// Botó enviar
document.getElementById("enviar").addEventListener("click", function() {
    var validNom = validarNom();
    var validEdat = validarEdat();
    var validCP = validarCP();
    var validEmail = validarEmail();
    var validPass = validarPass();
    var validPass2 = validarPass2();
    var validPrivacitat = validarPrivacitat();

    if (validNom && validEdat && validCP && validEmail && 
        validPass && validPass2 && validPrivacitat) {
        
        // Guardar les dades
        datesFormulari = {
            nom: nom.value,
            edat: edat.value,
            codiPostal: cp.value,
            email: email.value,
            privacitat: "Acceptada"
        };
        
        // Mostrar resultat
        var html = "<h2>✓ Formulari completat correctament!</h2>";
        html += "<p><strong>Nom:</strong> " + datesFormulari.nom + "</p>";
        html += "<p><strong>Edat:</strong> " + datesFormulari.edat + "</p>";
        html += "<p><strong>Codi postal:</strong> " + datesFormulari.codiPostal + "</p>";
        html += "<p><strong>Email:</strong> " + datesFormulari.email + "</p>";
        html += "<p><strong>Privacitat:</strong> " + datesFormulari.privacitat + "</p>";
        
        document.getElementById("resultat").innerHTML = html;
    }
});
