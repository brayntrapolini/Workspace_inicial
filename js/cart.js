// Variables Globales
var cart_info=[];
var cart_SUBTOTAL=0;
var cartCounter = 3;


//Función que modifica el badge de carrito.-
function countArticlesCart(){
    cartCounter = 0;
    var nImputAdd =0;
    let articlesGroup = document.getElementsByClassName("cartProdCount");
    var addN = document.getElementById("cartCounter")
    for(let i=0;i<articlesGroup.length;i++){

        nImputAdd = Number(articlesGroup[i].value)
        cartCounter += nImputAdd
    }
    addN.innerHTML=cartCounter;
}






// Función de envio ==> actualmente en desarrollo :) 
function shippingfree(){
    let shipping=document.getElementById("shipping");
    let promo = `<div class="small alert-success text-center">
                    <p><strong>ENVÍO PREMIUM GRATIS</strong></p>
                    <p> Promoción valida hasta el 25 de octubre </p>
                </div>`;

    shipping.innerHTML= promo
}



//Función que se ejecuta al presionar los botones de filtrado de moneda.-
function filterCurrencyChange(){
    let articlesGroup = document.getElementsByClassName("cartProdCount");
    for(let i=0;i<articlesGroup.length;i++){
        document.getElementById("productSubtotal-"+[i]).innerHTML= pdcurrency() +" "+ productSubTotal(articlesGroup[i].value,i);
        cartSubTotal();
        cartTotalCost();
    }
}





// Función creada para insertar el "currency" de acuerdo al filtro aplicado.-
function pdcurrency(){
    let dolares= document.getElementById("dolar")
    if (dolares.classList.contains('active')){
        return "USD";
    }
    else {
        return "UYU";
    }
}


// Función que muestra los subtotales de los productos por defecto.-
function productSubTotalofload(product){

    if(product.currency==="USD"){
        return "UYU"+ " " +  Number((product.unitCost*40)*product.count) 
    }
    else{
        return "UYU"+ " " + Number(product.unitCost*product.count)
    }
}    

// Función que calcula el subtotal del producto según el filtro aplicado (Dolares o Pesos).-
function productSubTotal(count,index){
    let pesos= document.getElementById("pesos")
    let subTotal=0;
    if (pesos.classList.contains('active')){
        if(cart_info[index].currency==="USD"){
            subTotal = (cart_info[index].unitCost*40)*count;

        }
        else{
            subTotal = cart_info[index].unitCost*count;
        }
        return Number(subTotal);
    }
    else{
        if(cart_info[index].currency==="UYU"){
            subTotal = (cart_info[index].unitCost/40)*count;
    
        }else{
            subTotal = cart_info[index].unitCost*count;
        }
        return Number(subTotal);    
    }
}    


// Función que calcula la suma de los subtotales.-
function cartSubTotal(){
    let articlesGroup = document.getElementsByClassName("cartProdCount");
    let subtotal =0;
    for(let i=0;i<articlesGroup.length;i++){
        subtotal += productSubTotal(articlesGroup[i].value,i);
    }
    document.getElementById("subtotal").innerHTML = pdcurrency()+" "+ subtotal;
    cart_SUBTOTAL=subtotal;
}           


// Función que calcula el costo total.-
function cartTotalCost(){
    let totalCost = cart_SUBTOTAL;
    document.getElementById("total").innerHTML = pdcurrency()+" " + totalCost;
}

  



// Función que detecta si ocurre algún cambio en la cantidad del producto a comprar,
//( en este caso detecta los cambios en los elementos de clase "cartpdcount").-
function changeCountProd(){
    let articlesGroup = document.getElementsByClassName("cartProdCount");
    for(let i=0;i<articlesGroup.length;i++){
        articlesGroup[i].addEventListener("change",function(){
            document.getElementById("productSubtotal-"+[i]).innerHTML= pdcurrency() +" "+ productSubTotal(articlesGroup[i].value,i);
            cartSubTotal();
            cartTotalCost();
            countArticlesCart();
        });
    }
}


// Función que muestra los articulos del carrito.-
function showProductCart(array){
    let productcart = document.getElementById("cart-products");
    let htmlContentToAppend = "";
    for(let i=0;i<array.length;i++){
    htmlContentToAppend += `<tr>
                                <td><img  width="100px" src="` + array[i].src +` "  class="img-thumbnail" alt="Imagen Ilustrativa"></td>
                                <td>` + array[i].name +`</td>
                                <td class="costCurrency">` + array[i].currency +` <span class="unitCost">` + array[i].unitCost +`</span></td>
                                <td><input class="form-control cartProdCount" style="width:60px;" type="number" value="` + array[i].count +`" min="1"></td>
                                <td><span id="productSubtotal-`+[i]+`" style="font-weight:bold;" >`+productSubTotalofload(array[i])+`</span></td>
                            </tr>`;
    
                        }
  
    productcart.innerHTML = htmlContentToAppend;
    changeCountProd();
    cartSubTotal();
    shippingfree();
    cartTotalCost();   
}








//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    //JSON de información del producto y lanzador de función Principal.-
    getJSONData(CART_INFO_URL_CHALLENGE).then(function(resultObj){
        if (resultObj.status === "ok") {
            cart_info = resultObj.data.articles;

            showProductCart(cart_info)
}})
});


///////////////////////////////////////////// Funciones que se ejecutan en product-info.html ///////////////////////////////////////////////////////////////////////////

//Función que quita el spiner.-
function buttonspiner(){
    document.getElementById("buttonAddCart").innerHTML='<i class="fas fa-cart-arrow-down"></i> Agregar al Carrito'
}



//Función que agrega un spiner cuando se clickea.-
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

