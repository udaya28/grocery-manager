'use strict';
function displayProducts() {
    let data, keys,product;
    [data, keys,product] = localSetup();
    console.table(data)
    console.log(product)
    let html='';
    for (let p in product){
        html+=`
        <div class="all-product">
        <div class="collapsible-header-2">
            <p class = "name-p">${p}</p>
        </div>
        <div class="collapsible-body-2" style="display: none;">
            <p>Price per item :<b> ₹${product[p]}</b></p>
        </div>
        </div>`
    }
    document.getElementsByClassName("all-products")[0].innerHTML = html;
}

document.getElementById("search-products").addEventListener('keyup', ()=>{
    let products = document.querySelectorAll(".collapsible-header-2")
    let searchName = document.getElementById("search-products").value.toLowerCase();
    products.forEach((product)=>{
        let productName = product.children[0].childNodes[0].nodeValue;
        // console.log(searchName,productName)
        if(productName.includes(searchName)){
            product.parentElement.style.display = "block";
        }else{
            product.parentElement.style.display = "none";
        }


    })
} )
displayProducts();