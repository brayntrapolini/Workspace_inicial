//Función para ver el menu y el usuario conectado.-
function menuSesion (){
    
    var a_menu = document.getElementById("menuSesion");
    a_menu.classList.add('dropdown');
    
    var menu =`<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  id="UserSesion" ></a>
                <div class="menu-user-css dropdown-menu" aria-labelledby="UserSesion">
                    <a class="menu-intem-user-css dropdown-item" href="my-profile.html"> <i class="fas fa-id-card"></i> Perfil</a>
                    <a class="menu-intem-user-css dropdown-item " href="cart.html"> <span class="fas fa-shopping-cart" ></span> <span > Mi Carrito </span> <span  id="cartCounter" class="badge badge-light">3</span></a>
                    <a class="menu-intem-user-css dropdown-item" href="#" onclick="endSesionMessage()"> <i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>
                </div>`
 
    a_menu.innerHTML=menu 
    document.getElementById("UserSesion").innerHTML= `<i class="fas fa-user"></i>`+"  "+localStorage.getItem("UserSesion");
}
     



// Función que se ejecuta al cargar cada pagina para corroborar ciertos elementos.-
function loadPage(){
var loginHTML = window.location.href.indexOf("login.html")
var cartHTML = window.location.href.indexOf("cart.html")
var sellHTML =window.location.href.indexOf("sell.html")
var miprofileHTML =window.location.href.indexOf("my-profile.html")

if (loginHTML < 0){
    if(localStorage.getItem("UserSesion") == null || localStorage.getItem("UserSesion") == ""){
        // Si ingresa a x paginas sin iniciar sesión lo reenvía al login.-
        if(cartHTML > - 1 || sellHTML > -1 || miprofileHTML > -1){
            onSesion()}} 
    // Si hay un usuario en el localStorage carga el menu y lo muestra.-
    else{
        menuSesion()            
    }
}}
    

// Función que corrobora si se inició sesión y muestra un mensaje si no es así.-
function onSesion(){
    if(localStorage.getItem("UserSesion") == null || localStorage.getItem("UserSesion") == ""){
        document.getElementById("onSesionMessage").style.display='block';
        
}}

// Función que pregunta si desea cerrar la Sesión.-
function endSesionMessage(){
    document.getElementById("endSesionMessage").style.display='block';
}



//Función para cerrar sesión
function endSesion(){
    window.location.href="index.html";
    localStorage.removeItem("UserSesion");
    localStorage.removeItem("dataProfile")
}










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Función para corroborar que los campos esten completos en pantalla de login.
function validarUser(){
    if (typeof(Storage) !== 'undefined') {
    

        //Verifica que se commplete el campo correo.
        if (document.getElementById("correo").value == null || document.getElementById("correo").value == ""){
            alert("Complete todos los campos por favor");
            return false;}

       
        
        //Verifica que se commplete el campo contraseña
        if (document.getElementById("contrasenia").value == null || document.getElementById("contrasenia").value == ""){
            alert("Complete todos los campos por favor"); 
            return false;}


        else{
    
        //Función para extraer del mail el nombre de usuario.-
        var emailUser= document.getElementById("correo").value;

        if (/^([^]+)@(\w+).(\w+)$/.exec(emailUser)){
            var email_analyzed = /^([^]+)@(\w+).(\w+)$/.exec(emailUser);
            var [,userSesion] = email_analyzed;
            localStorage.setItem("UserSesion",userSesion);
            alert("Sesión iniciada correctamente");
            return true;}
        
        if(/^([^]+)@(\w+)$/.exec(emailUser)){
            var email_analyzed = /^([^]+)@(\w+)$/.exec(emailUser);
            var [,userSesion] = email_analyzed;
            localStorage.setItem("UserSesion",userSesion);
            alert("Sesión iniciada correctamente");
            return true;}
        }
    }            
          
    else {
        alert("Error al Iniciar Sesión, dispositivo no compatible.");
        return false;
    }
}










        
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    loadPage();
     
       
    });