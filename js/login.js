//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    function validarUser(){
        
        if ((document.getElementById("correo") !="") && (document.getElementById("contraseña") != "")){
            document.form.submit();
            
        }
        else{
            alert("Complete todos los campos e inicie sesión");  
            
        }
    
    }
    
});