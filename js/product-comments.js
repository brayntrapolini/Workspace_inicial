//Variables Generales 

var valor=1
var commentNew=""

//Función usuario de los comentarios
function seeUserComm(){
    if (document.getElementById("userComm")){
        if(localStorage.getItem("UserSesion") == null || localStorage.getItem("UserSesion") == ""){
        
    }else{
        document.getElementById("userComm").innerHTML= localStorage.getItem("UserSesion");
    }}}

//Función verificar que haya una estrella seleccionada
function insertComm(){
    if(localStorage.getItem("UserSesion") == null || localStorage.getItem("UserSesion") == ""){
        document.getElementById("onSesionMessage").style.display='block';}
    else{
        var nCheckedTrue=document.getElementsByClassName("checkedTrue")
        if (nCheckedTrue.length>0){
            commInsert(nCheckedTrue.length)}
        else{
            alert("Seleccione una puntuación. Gracias")
        } 
    }   
}






//Funcón comentario

function commInsert(u){
    var dateOn = new Date();
    
    
    var nComm= document.getElementsByClassName("nComment")
    
    var textComm = document.getElementById("textComm").value;
    var userComm = localStorage.getItem("UserSesion");

    starChecked =`<span class="fa fa-star checked"></span>`.repeat(u)       
    starNoChecked =`<span class="fa fa-star"></span>`.repeat(5-u) 
    
    commentNew += `<div class="nComment" name="comm`+ (nComm.length+1) +`">
                        <p class="userC">`+userComm+`</p> <p class="score">`+ starChecked +`` + starNoChecked +`</p>
                        <p >`+textComm+`</p>
                        <p class="date">`+dateOn.getFullYear()+"-0"+(dateOn.getMonth()+1)+"-"+dateOn.getDate()+"  "+dateOn.getHours()+":"+dateOn.getMinutes()+":"+dateOn.getSeconds()+`</p>
                        <br>
                        </div>`  
    
    document.getElementById("newComment").innerHTML=commentNew;
    document.getElementById("textComm").value = "";
    commnoscore(5);
    }





//////////////////////////////////////////////////   Funciones estrellas ////////////////////////////////////////////

// Función estrellas al pasar el mouse.-
function checkedStar(u){

    if(u>=1){
        document.getElementById("starOne").classList.add('checked');
    }
    if(u>=2){
        document.getElementById("starTwo").classList.add('checked');
    }
    if(u>=3){
        document.getElementById("starThree").classList.add('checked');
    }
    if(u>=4){
        document.getElementById("starFour").classList.add('checked');
    }
    if(u==5){
        document.getElementById("starFive").classList.add('checked');
    }
}

//Función estrellas cuando no esta el mouse encima.-
function noCheckedStar(u){

    if(u>=1){
        document.getElementById("starOne").classList.remove('checked');
    }
    if(u>=2){
        document.getElementById("starTwo").classList.remove('checked');
    }
    if(u>=3){
        document.getElementById("starThree").classList.remove('checked');
    }
    if(u>=4){
        document.getElementById("starFour").classList.remove('checked');
    }
    if(u==5){
        document.getElementById("starFive").classList.remove('checked');
    }
}


// Función un clic y fija estrella.-
function commscore(x){

    if(x>=1){
        document.getElementById("starOne").classList.add('checkedTrue');
    }
    if(x>=2){
        document.getElementById("starTwo").classList.add('checkedTrue');
    }
    if(x>=3){
        document.getElementById("starThree").classList.add('checkedTrue');
    }
    if(x>=4){
        document.getElementById("starFour").classList.add('checkedTrue');
    }
    if(x==5){
        document.getElementById("starFive").classList.add('checkedTrue');
    }
    if(x<1){
        document.getElementById("starOne").classList.remove('checkedTrue');
    }
    if(x<2){
        document.getElementById("starTwo").classList.remove('checkedTrue');
    }
    if(x<3){
        document.getElementById("starThree").classList.remove('checkedTrue');
    }
    if(x<4){
        document.getElementById("starFour").classList.remove('checkedTrue');
    }
    if(x<5){
        document.getElementById("starFive").classList.remove('checkedTrue');
    }

}
// Función doble clic y quita estrella.-
function commnoscore(u){
    
        if(u>=1){
            document.getElementById("starOne").classList.remove('checkedTrue');
        }
        if(u>=2){
            document.getElementById("starTwo").classList.remove('checkedTrue');
        }
        if(u>=3){
            document.getElementById("starThree").classList.remove('checkedTrue');
        }
        if(u>=4){
            document.getElementById("starFour").classList.remove('checkedTrue');
        }
        if(u==5){
            document.getElementById("starFive").classList.remove('checkedTrue');
        }
}


