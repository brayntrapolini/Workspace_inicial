// Variables Globales
var cart_info = [];
var cart_Counter = 3;
var cart_SUBTOTAL = 0;
var cart_SHIPPCOST = 0;
var cart_TOTALCOST = 0;


// Función que modifica el badge de carrito.-
function countArticlesCart(){
    cart_Counter = 0;
    var nImputAdd =0;
    let articlesGroup = document.getElementsByClassName("cartProdCount");
    var addN = document.getElementById("cartCounter")
    for(let i=0;i<articlesGroup.length;i++){

        nImputAdd = Number(articlesGroup[i].value)
        cart_Counter += nImputAdd
    }
    addN.innerHTML=cart_Counter;
}




// Función que se ejecuta al modificar el tipo de envío, 
// al ocurrir algún cambio la misma ejecuta las otras funciones.-
function typeSHIPP(){
let typeSHIPP = document.getElementsByClassName("shipp");
    for (let i = 0; i < typeSHIPP.length; i++) {
        typeSHIPP[i].addEventListener("change", function () {
            shippingCost();
            cartTotalCost();
        });
    }
}






// Función que calcula el costo del envío según el marcado por el cliente.-
function shippingCost(){
    let shippCost=document.getElementById("shipping");

    //El envío seleccionado es el PREMIUM 15% 
    if (document.getElementById("shippPremium").checked){
       cart_SHIPPCOST= (cart_SUBTOTAL*15)/100
    }
    //El envío seleccionado es el EXPRESS 7% 
    if (document.getElementById("shippExpress").checked) {
        cart_SHIPPCOST = (cart_SUBTOTAL * 7) / 100
    }
    //El envío seleccionado es el STANDAR 5% 
    if (document.getElementById("shippStandar").checked) {
        cart_SHIPPCOST = (cart_SUBTOTAL * 5) / 100
    }
    shippCost.innerHTML = pdcurrency() + " " + cart_SHIPPCOST

    //Elimina el alert cuando se modifica el envío.-
    document.getElementById("alertShipp").innerHTML = `<div></div>`
}



//Función que se ejecuta al presionar los botones de filtrado de moneda.-
function filterCurrencyChange(){
    let articlesGroup = document.getElementsByClassName("cartProdCount");
    for(let i=0;i<articlesGroup.length;i++){
        document.getElementById("productSubtotal-"+[i]).innerHTML= pdcurrency() +" "+ productSubTotal(articlesGroup[i].value,i);
        cartSubTotal();
        shippingCost();
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
    cart_TOTALCOST = cart_SUBTOTAL + cart_SHIPPCOST;
    document.getElementById("total").innerHTML = pdcurrency()+" " + cart_TOTALCOST;
}

  



// Función que detecta si ocurre algún cambio en la cantidad del producto a comprar,
//( en este caso detecta los cambios en los elementos de clase "cartpdcount").-
function changeCountProd(){
    let articlesGroup = document.getElementsByClassName("cartProdCount");
    for(let i=0;i<articlesGroup.length;i++){
        articlesGroup[i].addEventListener("change",function(){
            document.getElementById("productSubtotal-"+[i]).innerHTML= pdcurrency() +" "+ productSubTotal(articlesGroup[i].value,i);
            cartSubTotal();
            countArticlesCart();
            shippingCost();
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
    typeSHIPP();
    cartSubTotal();
    shippingCost();
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
    cart_Counter = nImputAdd + cart_Counter
    addN.innerHTML=cart_Counter;
    
    }
}


////////////////////////////////////////// Funciones para el modal del método de Pago ////////////////////////////////////////////////////

//Variables para alert de métodos de pago globales
var iconCheck = `<span class="fas fa-times-circle" style="color:red;font-size:x-large;"></span>`;
var alertEmptyImput = `<div class="alert alert-warning alert-dismissible" style="text-align:center;z-index:999" >
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Campos sin completar o incorrectos </strong> Por favor verifique.
                        </div>`;


//Función que verifica los campos cuando se cargan los datos de la tarjeta y los confirma-
function confirmPaymentCreditCard(){
    let nameCard = document.getElementById("nameCard").value;
    let numberCard = document.getElementById("numberCard").value;    
    let monthCard = document.getElementById("monthCard").value;
    let yearCard = document.getElementById("yearCard").value;
    let cvvCard = document.getElementById("cvvCard").value;
    let paymentMethodSelected= document.getElementById("paymentMethodSelected");
    let cardAlertImputCheck = document.getElementById("cardAlertImputCheck");
    let iconCardCheck0 = document.getElementById("iconCardCheck0");
    let iconCardCheck1 = document.getElementById("iconCardCheck1");
    let iconCardCheck2 = document.getElementById("iconCardCheck2");
    let iconCardCheck3 = document.getElementById("iconCardCheck3");
    //Verifica los campos, sí se encuentran vacíos o nulos, etc, genera alerta.-
    closeAlertPaymentCard();
    if (nameCard == "" || nameCard == null || numberCard == "" || numberCard == null || monthCard == "" || monthCard == null || monthCard >= 13 || monthCard <= 0 || yearCard == "" || yearCard == null || yearCard < 2020 || cvvCard == "" || cvvCard == null){
        // Verifica que se haya ingresado el nombre.-
        if (nameCard == "" || nameCard == null) {
            iconCardCheck0.innerHTML = iconCheck;
        }
        //Verifica que se haya ingresado el número de tarjeta.-
        if (numberCard == "" || numberCard == null) {
            iconCardCheck1.innerHTML = iconCheck;
        }
        //Verifica que se haya ingresado el año (>=2020) y mes (>=1 - <=12).-
        if (monthCard == "" || monthCard == null || monthCard >= 13 || monthCard <= 0 || yearCard == "" || yearCard == null || yearCard < 2020) {
            iconCardCheck2.innerHTML = iconCheck;
        }
        //Verifica que se haya ingresado el cvv.-
        if (cvvCard == "" || cvvCard == null) {
            iconCardCheck3.innerHTML = iconCheck; 
        }
        cardAlertImputCheck.innerHTML = alertEmptyImput;
    }
    else{
        $('#paymentMethod').modal('hide');
        paymentMethodSelected.innerHTML = `<span><i class="fa fa-credit-card"></i> Tarjeta de Crédito</span>`
        clearPaymentBank();
            //Agrega o quita clases, luego se verificaran en la validación del método de Pago
            if (paymentMethodSelected.classList.contains('methodBank')) {
                paymentMethodSelected.classList.remove('methodBank');
                paymentMethodSelected.classList.add('methodCard');
            } 
            else{
                paymentMethodSelected.classList.add('methodCard');
            }              
    }
}


//Función que elimina las alertas y marcas de los campos incompletos cuando se corrigen - Método de pago, Tarjeta de Crédito.-
function closeAlertPaymentCard() {
    let nameCard = document.getElementById("nameCard");
    let numberCard = document.getElementById("numberCard");
    let monthCard = document.getElementById("monthCard");
    let yearCard = document.getElementById("yearCard");
    let cvvCard = document.getElementById("cvvCard");
    let paymentCheckCardElement = document.getElementsByClassName("paymentCheckCard");
    for (let i = 0; i < paymentCheckCardElement.length; i++) {
        paymentCheckCardElement[i].addEventListener("change", function () {
            document.getElementById("iconCardCheck" + [i]).innerHTML = `<div></div>`;  
            
            if (nameCard.value != "" && nameCard.value != null && numberCard.value != "" && numberCard.value != null && monthCard.value != "" && monthCard.value != null && monthCard.value <= 12 && monthCard.value >= 1 && yearCard.value != "" && yearCard.value != null && yearCard.value >= 2020 && cvvCard.value != "" && cvvCard.value != null) {
                document.getElementById("cardAlertImputCheck").innerHTML = `<div></div>`;
            }
        });
    }
}




//Función que verifica los campos cuando se cargan los datos Bancarios y se confirma-
function confirmPaymentBank(){
    let nameBank = document.getElementById("nameBank").value;
    let numberAcount = document.getElementById("numberAcount").value;
    let paymentMethodSelected = document.getElementById("paymentMethodSelected");
    let iconBankNameCheck = document.getElementById("iconBankCheck0");
    let iconBankAcountCheck = document.getElementById("iconBankCheck1");
    let bankAlertImputCheck = document.getElementById("bankAlertImputCheck");
    closeAlertPaymentBanck();
    // Verifica que se haya seleccionado un Banco de la lista
    if (nameBank == "" || nameBank == null|| nameBank == 0) {
        if (numberAcount == "" || numberAcount == null || numberAcount <= 0) {
            iconBankAcountCheck.innerHTML = iconCheck;
        }        
        iconBankNameCheck.innerHTML = iconCheck;
        bankAlertImputCheck.innerHTML = alertEmptyImput;
    }
    else {
        //Verifica que se haya ingresado un número de cuenta
        if (numberAcount== "" || numberAcount == null || numberAcount <= 0) {
            iconBankAcountCheck.innerHTML = iconCheck;
            bankAlertImputCheck.innerHTML = alertEmptyImput;
        }
        else {
            $('#paymentMethod').modal('hide');
            paymentMethodSelected.innerHTML = `<span><i class="fa fa-university"></i> Transferencia Bancaria</span>`
            clearPaymentCreditCard();
            if (paymentMethodSelected.classList.contains('methodCard')) {
                paymentMethodSelected.classList.remove('methodCard');
                paymentMethodSelected.classList.add('methodBank');
            } else {
                paymentMethodSelected.classList.add('methodBank');
            }
        }
    }
}

//Función que elimina las alertas y marcas de los campos incompletos cuando se corrigen - Método de pago, transferencia Bancaria.-
function closeAlertPaymentBanck(){
    let nameBank = document.getElementById("nameBank");
    let numberAcount = document.getElementById("numberAcount");
    let paymentCheckBanckElement = document.getElementsByClassName("paymentCheckBanck");
    for (let i = 0; i < paymentCheckBanckElement.length; i++) {
        paymentCheckBanckElement[i].addEventListener("change", function () {
            document.getElementById("iconBankCheck" + [i]).innerHTML = `<div></div>`
            if (nameBank.value != "" && nameBank.value != null && nameBank.value != 0 && numberAcount.value != "" && numberAcount.value != null && numberAcount.value >= 1){
                   document.getElementById("bankAlertImputCheck").innerHTML = `<div></div>`;
               }
        });
    }
}
    


//Función que limmpia los campos del método de pago Tarjeta de Crédito y cierra alert
function clearPaymentCreditCard(){
    document.getElementById("nameCard").value="";
    document.getElementById("numberCard").value="";
    document.getElementById("monthCard").value="";
    document.getElementById("yearCard").value="";
    document.getElementById("cvvCard").value="";
    document.getElementById("cardAlertImputCheck").innerHTML = `<div></div>`;
    document.getElementById("iconCardCheck0").innerHTML = `<div></div>`;
    document.getElementById("iconCardCheck1").innerHTML = `<div></div>`;
    document.getElementById("iconCardCheck2").innerHTML = `<div></div>`;
    document.getElementById("iconCardCheck3").innerHTML = `<div></div>`;
}
//Función que limpia los campos del método de pago Transferencia Bancaria y cierra alert
function clearPaymentBank() {
    document.getElementById("nameBank").value=0;
    document.getElementById("numberAcount").value="";
    document.getElementById("bankAlertImputCheck").innerHTML = `<div></div>`;
    document.getElementById("iconBankCheck0").innerHTML = `<div></div>`
    document.getElementById("iconBankCheck1").innerHTML = `<div></div>`
}

//Funcíon que cuando se clickea un método de pago se borran los datos y alertas del otro.-
    document.getElementById("method1").addEventListener("click", function () {
        clearPaymentBank();

    });
    document.getElementById("method2").addEventListener("click", function () {
        clearPaymentCreditCard();
    });


//Funcíon que quita el método seleccionado si se sale del modal con el boton de cerrar sin completar campos.-
function clearMethodPayment(){
    let paymentMethodSelected = document.getElementById("paymentMethodSelected");
    
    if (paymentMethodSelected.classList.contains('methodCard')) {
        paymentMethodSelected.classList.remove('methodCard');
    }
    if (paymentMethodSelected.classList.contains('methodBank')) {
        paymentMethodSelected.classList.remove('methodBank');
    }
    paymentMethodSelected.innerHTML =`<span>Seleccionar método</span>`;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Función que verifica que este todo completado y finaliza la compra.-
function confirmBUY(){
    var street = document.getElementById("street").value;
    var numberStreet = document.getElementById("numberStreet").value;
    var corner = document.getElementById("corner").value;
    let paymentMethodSelected = document.getElementById("paymentMethodSelected");
    changeAlertClose();
    //verifico que el subtotal sea mayor a cero
    if (cart_SUBTOTAL>0){ 
        //verifico que haya una opción de tipo de envío seleccionada
        if (cart_SHIPPCOST>0){ 
            //verifico que esten completados los campos dirección
            if (street == "" || street == null || numberStreet ==""|| numberStreet == null || corner == "" || corner == null){
                document.getElementById("alertAddress").innerHTML = `<div class="alert alert-warning alert-dismissible" style="text-align:center;z-index:999">
                                                                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                                            <strong>Dirección campos sin completar</strong> Por favor verifique.
                                                                            </div>`
                document.getElementById('focusAlertAddress').focus();
                
            }
            else{
                //verifico que exista un método de pago seleccionado, sí todo esta correcto realiza la compra.-
                if (paymentMethodSelected.classList.contains('methodCard') || paymentMethodSelected.classList.contains('methodBank')){
                    document.getElementById("focusAlertBuyConfirm").innerHTML = `<div class="alert alert-success alert-dismissible" style="text-align:center;z-index:999999">
                                                                            <button type="button" class="close" data-dismiss="alert" >&times;</button>
                                                                            <strong>Compra realizada correctamente</strong> Continua viendo los otros productos.
                                                                            </div>`
                    document.getElementById("confirmBuy").setAttribute("disabled", "");
                    setTimeout('window.location.href = "categories.html"',3000)
                }
                else{
                    document.getElementById("alertPayment").innerHTML = `<div class="alert alert-warning alert-dismissible" style="text-align:center;z-index:999" >
                                                                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                                            <strong>Método de pago sin seleccionar</strong> Por favor verifique.
                                                                            </div>`
                    document.getElementById('focusAlertPayment').focus();
                }
            }
        }
        else{
            document.getElementById("alertShipp").innerHTML = `<div class="alert alert-warning alert-dismissible" style="text-align:center;z-index:999">
                                                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                                    <strong>Tipo de envío sin seleccionar</strong> Por favor verifique.
                                                                    </div>`
            document.getElementById('focusAlertShipp').focus();
        }
    }
    else{
        document.getElementById("alertCartEmpty").innerHTML = `<div class="alert alert-warning alert-dismissible" style="text-align:center;z-index:999">
                                                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                                    <strong>Carrito vacío</strong> Agregue productos.
                                                                    </div>`
        document.getElementById('focusAlertCartEmpty').focus();
    }
}


//Funcíon que cierra las alertas que se crean cuando se ejecuta la función "CONFIRMBUY"; cuando existen cambios.-
function changeAlertClose() {
    let shippAdressElement = document.getElementsByClassName("shippAddress");
    let paymentMethodButton = document.getElementById("paymentMethodButton");
    //Cuando se comienza a completar los campos de dirección se cierra el alerta de campos incompletos en dirección.-
    for (let i = 0; i < shippAdressElement.length; i++) {
        shippAdressElement[i].addEventListener("click", function () {
            document.getElementById("alertAddress").innerHTML = `<div></div>`
        });
    }
    //Cuando se abre el modal para seleccionar un tipo de método de pago se cierra el alert que nos avisa que falta ello.-
    paymentMethodButton.addEventListener("click", function () {
        document.getElementById("alertPayment").innerHTML = `<div></div>`
    });
}





