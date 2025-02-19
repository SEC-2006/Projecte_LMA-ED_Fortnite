function demanarDades()
{
    var arrayDades = {};

    arrayDades['dni'] = prompt("Indica el teu DNI");
    arrayDades['nom'] = prompt("Indica el teu nom");
    arrayDades['email'] = prompt("Indica el teu email");

    validarDades(arrayDades);
}

function validarDades(arrayDades)
{
    var arrayErrors = [];

    var dniRegex = /^[0-9]{8}[A-Za-z]$/;
    var nomRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

    var errorsTrobats = false;

    if (dniRegex.test(arrayDades['dni']))
    {
        arrayDades['dni'] = dniMajuscula(arrayDades['dni']);
    }
    else
    {
        errorsTrobats = true;
        arrayErrors.push("El DNI deu tenir 8 digits i una lletra al final, 9 digits en total");
    }

    if (nomRegex.test(arrayDades['nom']))
    {
        arrayDades['nom'] = primeraMajuscula(arrayDades['nom']);
    }
    else
    {
        errorsTrobats = true;
        arrayErrors.push("El nom deu tenir dos paraules");
    }

    if (!emailRegex.test(arrayDades['email']))
    {
        errorsTrobats = true;
        arrayErrors.push("El email deu seguir el patró text@text.text");
    }

    if (errorsTrobats)
    {
        var textErrors = arrayErrors.join("\n");
        alert(textErrors);
    }
    else
    {
        alert(arrayDades['dni']+"\n"+arrayDades['nom']+"\n"+arrayDades['email']);
    }
}

function primeraMajuscula(nom)
{
    return nom.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function dniMajuscula(dni)
{
    var digits = dni.slice(0, 8);
    var lletra = dni.slice(8, 9).toUpperCase();
    return digits + lletra;
}
