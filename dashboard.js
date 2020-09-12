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
                  
                  <button class=" btn-small waves-effect waves-light light-blue darken-2 edit-product-details"      type="submit" name="action" style="display:block; ">edit
                    
                  </button>
      
                  <div class="edit" style="display:none;">
                          <div class="input-field col s12">
                              <i class="material-icons prefix ">    shopping_cart</i>
                              <input type="text" id="edit-product-name">
                              <label for="edit-product-name"     class="">Product Name</label>
                          </div>
        
                      <div class="input-field col s12">
                          <i class="material-icons prefix"> monetization_on</i>
                          <input type="text" inputmode="numeric"         id="edit-amount">
                          <label for="edit-amount">Amount per unit</label>
                      </div>
                      <div class="row">
                           <button class="btn waves-effect waves-light right light-blue darken-2 edit-product-button" name="action"
                             >save
                             
                         </button>
                         <button class="btn waves-effect waves-light right light-blue darken-2 edit-product-cancel" s name="action"
                             >cancel
                             
                         </button>
                      </div>
                  </div>
                  
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

document.querySelectorAll(".edit-product-details").forEach((product)=>{
  
  product.addEventListener('click',(product)=>{
    console.log(product ,product.target)
    if(product.target.nextElementSibling.style.display == "none"){
      product.target.nextElementSibling.style.display = "block";
      product.target.style.display = "none";
    }else{
      product.target.nextElementSibling.style.display = "none";
      product.target.style.display = "block";
    }
    })
    
})

document.querySelectorAll(".edit-product-cancel").forEach((btn)=>{
  btn.addEventListener('click',(ele)=>{
console.log(ele.target.parentElement.parentElement);
ele.target.parentElement.parentElement.previousElementSibling.style.display = "block";
ele.target.parentElement.parentElement.style.display = "none";
  })
}
  
    
)

