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

displayProducts();