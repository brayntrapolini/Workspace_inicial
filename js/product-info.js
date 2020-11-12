// Variables

var product_Info = {};
var products= {};
var comments ={};


// Función para ver la información del producto- JSON PRODUCT_INFO_URL
function showInfoProduct(u){
    let product_InfoNameHTML  = document.getElementById("product_Info_Name");
    let product_InfoDescriptionHTML = document.getElementById("product_Info_Description");
    let product_InfoSoldCountHTML = document.getElementById("product_Info_Sold_Count");
    let product_InfoCategoryHTML = document.getElementById("product_Info_Category");
    let product_InfoCostHTML = document.getElementById("product_Info_Cost");

    product_InfoNameHTML.innerHTML = u.name;
    product_InfoDescriptionHTML.innerHTML = u.description;
    product_InfoSoldCountHTML.innerHTML = u.soldCount;
    product_InfoCategoryHTML.innerHTML = '<a href="products.html">' + u.category + '</a>';
    product_InfoCostHTML.innerHTML = u.currency + "   " + u.cost ;}






// Función que muestra las imagenes del producto - JSON PRODUCT_INFO_URL
function showGalleryImages(array){
    let htmlContentToAppend2 = "";
    let htmlContentToAppend4 = "";

    htmlContentToAppend =   `<div class="carousel-item active">
                                <img class="d-block w-100" src="` + array[0] + `" alt="Imagen Ilustrativa" style="border-style: solid;border-color: rgba(219, 219, 219, 0.664);">
                            </div>`

    for(let i = 1; i < array.length; i++){
        htmlContentToAppend2 += `<div class="carousel-item">
                                    <img class="d-block w-100" src="` + array[i] + `" alt="Imagen Ilustrativa" style="border-style: solid;border-color: rgba(219, 219, 219, 0.664);">
                                </div>`}
    
    document.getElementById("product_Info_Images").innerHTML = htmlContentToAppend+htmlContentToAppend2;

                                
    htmlContentToAppend3 =  `<img src="` + array[0] + `" alt="0" style="width: 100px;border-style: ridge;border-color: rgba(0, 0, 0, 0.307);margin: 0.1% 0.1%;"  data-target="#image-prod-info-transition" data-slide-to="0" class="active">`

    for(let i = 1; i < array.length; i++){
        htmlContentToAppend4 += `<img src="` + array[i] + `" alt="` +[i]+ `" style="width: 100px;border-style: ridge;border-color: rgba(0, 0, 0, 0.307);margin: 0.1% 0.1%;"  data-target="#image-prod-info-transition" data-slide-to="` + [i] + `" >`}

    document.getElementById("indicator_product_Info_Images").innerHTML = htmlContentToAppend3+htmlContentToAppend4;}







// Función que muestra los productos relacionados - JSON PRODUCT_INFO_URL - JSON PRODUCT_URL
function showRelatedProduct(prod,prodRelated){

    let relatedProducts = document.getElementById("related_Products");
    let htmlContentToAppend = "";

    for(let i of prodRelated){

    htmlContentToAppend += `
        <div class="card col-6" style="width:10rem;">
            <img class="card-img-top" src="` + prod[i].imgSrc +` " alt="Imagen Ilustrativa">
            <div class="card-body">
                <h5 class="card-title"> ` + prod[i].name +`</h5>
                <p class="card-text">`+prod[i].description+`</p>
                <p class="card-text">`+prod[i].currency+`  `+prod[i].cost+`</p>
                <a href="product-info.html" class="btn btn-sm" style="background-color: darkred;color: white;">Ver producto</a>
            </div>
        </div>`}
    relatedProducts.innerHTML = htmlContentToAppend;}






// Función para ver los comentarios cargados en el JSON PRODUCT_INFO_COMMENTS_URL
function showProductComments(comm){  

    let productsComment = document.getElementById("product_Info_comments");
    let commentJSON=""
    
    for(let i of comm){

    starChecked =`<span class="fa fa-star checked"></span>`.repeat(i.score)       
    starNoChecked =`<span class="fa fa-star"></span>`.repeat(5-i.score) 
    commentJSON += `<div class="commentJSON nComment" name="comm` + comm.indexOf(i)+`">
                        <p class="userC">` + i.user +`</p> <p class="score">`+ starChecked +`` + starNoChecked +`</p>
                        <p >`+i.description+`</p>
                        <p class="date">`+i.dateTime+`</p>
                        <br>
                        </div>`  
    }
    productsComment.innerHTML = commentJSON;
}




    

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
        //JSON de información del producto y lanzador de función Principal.-
         getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok") {
                product_Info = resultObj.data;

        showInfoProduct(product_Info);
           
            
        //Lanzador  de función para ver las imagenes en forma de galería.-
        showGalleryImages(product_Info.images);

        //JSON de productos y lanzador de función para ver los productos relacionados.-
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok") {
            products = resultObj.data;

        showRelatedProduct(products,product_Info.relatedProducts);

        //JSON de comentarios del producto y lazador de función para ver los mismos.-
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if (resultObj.status === "ok") {
            comments = resultObj.data;

        showProductComments(comments);
        
        //Ver usuario en Comentario
        seeUserComm();
  
        
}})}})}})});