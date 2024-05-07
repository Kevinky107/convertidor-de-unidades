const select = document.getElementById("unidad");
const result = document.getElementById("res");
const unidad = document.getElementById("uni");
const unit = document.getElementById("unit");
const medida = document.getElementById("num");
const saved = document.getElementById("saved");

let index = select.selectedIndex;
let selected = select.options[index];
let med = 0;
let med_res;
let med_uni = "km";
let med_uni2 = "mi";

let conversiones = new Array;
conversiones = JSON.parse(localStorage.getItem("convert")) || [];

function unidades() {
    index = select.selectedIndex;

    switch (index) {
        case 0:
            med_uni = "mi";
            med_uni2 = "km";
            break;
        case 1:
            med_uni = "km";
            med_uni2 = "mi";
            break;
        case 2:
            med_uni = "mi";
            med_uni2 = "ft";
            break;
        case 3:
            med_uni = "ft";
            med_uni2 = "m";
            break;
        case 4:
            med_uni = "cm";
            med_uni2 = "in";
            break;
        case 5:
            med_uni = "in";
            med_uni2 = "cm";
            break;
    }

    unidad.innerHTML = med_uni;
    unit.innerHTML = med_uni2;

    if (med != 0)
        calcular();
}

function swap() {

    switch (index) {

        case 0:
            select.options[0].selected = false;
            select.options[1].selected = true;
            index = 1;
            break;
        case 1:
            select.options[1].selected = false;
            select.options[0].selected = true;
            index = 0;
            break;
        case 2:
            select.options[2].selected = false;
            select.options[3].selected = true;
            index = 3;
            break;
        case 3:
            select.options[3].selected = false;
            select.options[2].selected = true;
            index = 2;
            break;
        case 4:
            select.options[4].selected = false;
            select.options[5].selected = true;
            index = 5;
            break;
        case 5:
            select.options[5].selected = false;
            select.options[4].selected = true;
            index = 4;
            break;
    }

    medida.value = med_res;
    med_uni = med_uni2;
    calcular();

}

function calcular() {

    med = medida.value;
    
    switch (index) {

        case 0:
            med_res = med / 1.609;
            med_uni = "mi";
            med_uni2 = "km";
            break;
        case 1:
            med_res = med * 1.609;
            med_uni = "km";
            med_uni2 = "mi";
            break;
        case 2:
            med_res = med / 3.281;
            med_uni = "m";
            med_uni2 = "ft";
            break;
        case 3:
            med_res = med * 3.281;
            med_uni = "ft";
            med_uni2 = "m";
            break;
        case 4:
            med_res = med * 2.54;
            med_uni = "cm";
            med_uni2 = "in";
            break;
        case 5:
            med_res = med / 2.54;
            med_uni = "in";
            med_uni2 = "cm";
            break;
    }

    med_res = med_res.toFixed(2);
    result.innerHTML = med_res;
    unidad.innerHTML = med_uni;
    unit.innerHTML = med_uni2;

}

function save() {

    let conv = {"medida": med, "unidad1": med_uni, "resultado": med_res, "unidad2": med_uni2};

    if(medida.value)
    {
        conversiones.push(conv);
        localStorage.setItem("convert", JSON.stringify(conversiones));
        medida.value = 0;
        med = 0;
        med_res = 0;
        result.innerHTML = med_res;
        showsave();
    }

}

function showsave() {

    conversiones = JSON.parse(localStorage.getItem("convert")) || [];
    let iteration = 0;
    saved.innerHTML = "";
    for(let conv of conversiones){
        saved.innerHTML += '<div class="savemed"><div class="hist"><p>'+conv.medida+' '+conv.unidad1+' → '+conv.resultado+' '+conv.unidad2+'</p></div><div class="delete"><i class="fa-solid fa-xmark" id="'+iteration+'" onclick="delet(this)"></i></div></div>';
        iteration++;
    }   

}

function delet(x) {

    conversiones = JSON.parse(localStorage.getItem("convert"));
    conversiones.splice(Number(x.id),1);
    localStorage.setItem("convert", JSON.stringify(conversiones));

    showsave();
}