//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function buttonspiner(){
    document.getElementById("buttonAddCart").innerHTML='<i class="fas fa-cart-arrow-down"></i> Agregar al Carrito'
}

var cartCounter = 0;

function cartAdd(){
    if(localStorage.getItem("UserSesion") == null || localStorage.getItem("UserSesion") == ""){
        document.getElementById("onSesionMessage").style.display='block';}
    else{
    setTimeout("buttonspiner()",1100)
    document.getElementById("buttonAddCart").innerHTML='<span class="spinner-border spinner-border-sm mr-2" id=loadSpinner></span> Agregando'
    var addN = document.getElementById("cartCounter")
    var nImputAdd = Number(document.getElementById("numberAddImput").value)
    cartCounter = nImputAdd + cartCounter
    addN.innerHTML=cartCounter;
    
    }
}


