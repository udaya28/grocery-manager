'use strict';
function displayProducts() {
  let data, keys, product;
  [data, keys, product] = localSetup();
  console.table(data);
  console.log(product);
  let html = '';
  for (let p in product) {
    html += `
        <div class="all-product">
          <div class="collapsible-header-2">
            <div class="row">
              <p class = "name-p col ">${p}</p>
              <i class="material-icons col 
              right info">info_outline</i>
              <span class="badge col right info"> <b> ₹ ${product[p]}</b></span>
            </div>
            
          </div>
          <div class="collapsible-body-2"  
                style="display: none;">
                  <p>Product name   :<b class="cap"> ${p}</b></p>
                  <p>Price per item :<b> ₹${product[p]}</b></p>
                  
          </div>
          
        </div>`;
  }
  document.getElementsByClassName('all-products')[0].innerHTML = html;
}
displayProducts();
document.getElementById('search-products').addEventListener('keyup', () => {
  let products = document.querySelectorAll('.collapsible-header-2');
  let searchName = document
    .getElementById('search-products')
    .value.toLowerCase();
  products.forEach((product) => {
    let productName = product.firstElementChild.firstElementChild.textContent.toLowerCase();
    console.log(product.firstElementChild.firstElementChild.textContent)
    if (productName.includes(searchName)) {
      product.parentElement.style.display = 'block';
    } else {
      product.parentElement.style.display = 'none';
    }
  });
});

let collapsibleHeader2 = document.querySelectorAll('.collapsible-header-2');

collapsibleHeader2.forEach((ele) => {
  ele.addEventListener('click', (e) => changeCollapsible2(e));
  
});

