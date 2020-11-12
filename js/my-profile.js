//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    seeDataProfile();
    changeDateBorn();
    changeimageLink();
});


//Variables Globales

var nameProfile = document.getElementById("nameProfile");
var lastNameProfile = document.getElementById("lastNameProfile");
var bornDateProfile = document.getElementById("bornDateProfile");
var telephoneNumberProfile = document.getElementById("telephoneNumberProfile");
var emailProfile = document.getElementById("emailProfile");
var ageProfile = document.getElementById("ageProfile");
var imageProfile = document.getElementById("imageProfile");
var imageLinkProfile = document.getElementById("imageLinkProfile");




//Función que muestra la imgen de la URL cargada.-
function imageLoadProfile(link) {
    imageProfile.setAttribute("src", link);
}

//Función que calcula la edad a partir de la fecha de nacimiento.-
function calcAge(dateborn) {
    let dateB = new Date(dateborn);
    let dateNow = new Date()
    var dd = dateNow.getDate();
    var mm = dateNow.getMonth();
    var aaaa = dateNow.getFullYear();
    dateNow.setDate(dd);
    dateNow.setMonth(mm);
    dateNow.setFullYear(aaaa);
    let age = Math.floor(((dateNow - dateB) / (1000 * 60 * 60 * 24) / 365));
    ageProfile.value = age;
}




//Función que muestra la información almacenada en el localStorage.-
function seeDataProfile(){
    //Si existe información la muestra.
    if (localStorage.getItem('dataProfile')!= null){
        let dataParsed = JSON.parse(localStorage.getItem('dataProfile'));
        nameProfile.value=dataParsed.name;
        lastNameProfile.value=dataParsed.lastName;
        bornDateProfile.value=dataParsed.bornDate;
        telephoneNumberProfile.value=dataParsed.telephoneNumber;
        emailProfile.value=dataParsed.email;
        imageLinkProfile.value=dataParsed.imageLink;
        //Sí el campo fecha ("borndate") no es nulo o vacío, ejecuta la función del calculo de la edad.-
        if (bornDateProfile.value != null & bornDateProfile.value != "") {
            calcAge(bornDateProfile.value);
        }
        //Sí el existe una URL y no es nula ni vacía, ejecuta la función de carga de imagen.-
        if (imageLinkProfile.value != null & imageLinkProfile.value != "") {
            imageLoadProfile(imageLinkProfile.value);
        }
        //Si no carga la imagen anterior, carga imagen por defecto.-
        else {
            let link0 = "img/photo-user.jpg";
            imageLoadProfile(link0);
        }
    }
}

//Función que deshabilita los campos de edición, 
//cambia los botones sin guardar información y muestra los datos almacenados.-
function cancelData(){
    document.getElementById("buttonOptionsProfile").innerHTML = `<button type="submit" class="btn btn-darkred" onclick="editData()">Editar</button>`
    nameProfile.disabled = true;
    lastNameProfile.disabled = true;
    bornDateProfile.disabled = true;
    telephoneNumberProfile.disabled = true;
    emailProfile.disabled = true;
    imageLinkProfile.disabled = true;
    seeDataProfile();
}

//Función que al presionar el boton "guardar" transforma los datos en JSON
// guarda la información en localStorage, cambia los botones y deshabilita los campos.-
function saveData(){

    //transforma los datos en JSON y se almacenan.-
    let dataProfile = { 'name': nameProfile.value, 'lastName': lastNameProfile.value, 'bornDate': bornDateProfile.value, 'telephoneNumber': telephoneNumberProfile.value, 'email': emailProfile.value, 'imageLink':imageLinkProfile.value};
    localStorage.setItem('dataProfile', JSON.stringify(dataProfile));

    //se dashabilitan los campos de edición y cambia los botones.-
    document.getElementById("buttonOptionsProfile").innerHTML = `<button type="submit" class="btn btn-darkred" onclick="editData()">Editar</button>`
    nameProfile.disabled = true;
    lastNameProfile.disabled = true;
    bornDateProfile.disabled = true;
    telephoneNumberProfile.disabled = true;
    emailProfile.disabled = true;
    imageLinkProfile.disabled = true;
}



//Función que al presionar el boton "editar" habilita los campos para modificarlos y agrega los botones guardar y cancelar.-
function editData(){
    document.getElementById("buttonOptionsProfile").innerHTML =    `<button type="submit" class="btn btn-darkred" onclick="saveData()">Guardar Cambios</button>
                                                                    <button type="submit" class="btn btn-darkred" onclick="cancelData()">Cancelar</button>`
    nameProfile.disabled= false;
    lastNameProfile.disabled = false;
    bornDateProfile.disabled = false;
    telephoneNumberProfile.disabled = false;
    emailProfile.disabled = false;
    imageLinkProfile.disabled = false;
}



//Función que esta activa a los cambios en la fecha de nacimiento ("bornDate").-
function changeDateBorn(){
bornDateProfile.addEventListener("change", function () { 
    if (bornDateProfile.value != null & bornDateProfile.value != "") {
        calcAge(bornDateProfile.value);
    }
    else{
        ageProfile.value=""; 
    }
});}


//Función que esta activa a los cambios en la URL de la imagen ("imageLinkProfile").-
function changeimageLink() {
    imageLinkProfile.addEventListener("change", function () {
        if (imageLinkProfile.value != null & imageLinkProfile.value != "") {
            imageLoadProfile(imageLinkProfile.value);
        }
        else{
            let link0 ="img/photo-user.jpg";
            imageLoadProfile(link0);
        }
    });
}


