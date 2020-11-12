const ORDER_ASC_BY_PRICE = "Costo-Ascendente";
const ORDER_DESC_BY_PRICE = "Costo-Descendente";
const ORDER_BY_PROD_SOLD_COUNT = "Vendidos";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

//Funciones "sort" para filtrar según corresponda
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
//Función para mostrar el listado de productos
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let productList = currentProductArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(productList.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(productList.cost) <= maxCost))){

            htmlContentToAppend += `<div class="col-md-6">
                                        <div class="card mb-4 shadow-sm" style="border: 3px solid rgba(0,0,0,.125);">
                                            <a href="product-info.html" style="color:black;text-decoration:none;">
                                                <img src="` + productList.imgSrc + `" alt="` + productList.description + `" class="card-img-top img-Thumbnail">
                                                <div class="card-body">
                                                    <h5 class="card-title"><strong>`+ productList.name +`</strong></h5>
                                                    <p class="card-text">` + productList.description + `</p>
                                                </div>
                                                <div class="card-footer">
                                                <div class="row" >
                                                    <div class="col">
                                                        <p class="mb-1"><strong>` + productList.currency + "  " + productList.cost + `</strong></p>
                                                    </div>
                                                    <div class="col">
                                                        <small class="text-muted">` + productList.soldCount + ` Vendidos </small>
                                                    </div>
                                                </div>  
                                                </div>
                                            </a>
                                        </div>
                                    </div>`
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = sortProducts(currentSortCriteria, currentProductArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){

    //Obtengo el mínimo y máximo de los intervalos para filtrar por costo de los productos.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});



