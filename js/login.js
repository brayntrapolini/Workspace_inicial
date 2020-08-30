//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   
   
});






//funcion para corroborar que los campos esten completos.
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
    
            var userSesion= document.getElementById("correo").value;
            localStorage.setItem("UserSesion",userSesion);
            alert("Sesión iniciada correctamente");
            return true;}}
          
    else {
        alert("Error al Iniciar Sesión, dispositivo no compatible.");
        return false;}}