'use strict';
function displayProducts() {
  let data, keys, product;
  [data, keys, product] = localSetup();
  console.table(data);
  console.log(product);
  console.log(keys);
  let html = '';
  for (let p in product) {
    
    html += `
        <div class="all-product">
          <div class="collapsible-header-2">
            <div class="row">
              <p class = "name-p col ">${p}</p>
              <i class="material-icons col 
              right info">info_outline</i>
              <span class="badge col right info"> <b>₹ ${product[p]}</b></span>
            </div>

          </div>
          <div class="collapsible-body-2"  
                style="display: none;">
                  <p>Product name   :<b class="cap">${p}</b></p>
                  <p>Price per item :<b>₹ ${product[p]}</b></p>
                  <div class="row" style="display:block; ">
                  <button class="btn btn-small waves-effect waves-light light-blue darken-2 edit-product-details col right"      type="submit" name="action" style="display:block; ">edit
                  </button>
                  <button class="btn btn-small waves-effect waves-light  red lighten-1 delete-product-details col right"       type="submit" name="action" style="display:block; ">delete
                    
                  </button>
                  </div>
                  <div class="edit" style="display:none;">
                          <div class="input-field col s12">
                              <i class="material-icons prefix ">    shopping_cart</i>
                              <input type="text" id="edit-product-name-${p}">
                              <label for="edit-product-name-${p}"     class="">New Product Name</label>
                          </div>
        
                      <div class="input-field col s12">
                          <i class="material-icons prefix"> monetization_on</i>
                          <input type="text" inputmode="numeric"         id="edit-amount-${p}">
                          <label for="edit-amount-${p}">New Amount Per Unit</label>
                      </div>
                      <div class="row">
                           <button class="btn btn-small waves-effect waves-light right light-blue darken-2 edit-product-button" name="action"
                             >save
                             
                         </button>
                         <button class="btn btn-small waves-effect waves-light right light-blue darken-2 edit-product-cancel" s name="action"
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
    console.log(product.firstElementChild.firstElementChild.textContent);
    if (productName.includes(searchName)) {
      product.parentElement.style.display = 'block';
    } else {
      product.parentElement.style.display = 'none';
    }
  });
});
function event1() {
  let collapsibleHeader2 = document.querySelectorAll('.collapsible-header-2');

  collapsibleHeader2.forEach((ele) => {
    ele.addEventListener('click', (e) => changeCollapsible2(e));
  });

  document.querySelectorAll('.edit-product-details').forEach((product) => {
    product.addEventListener('click', (product) => {
      // console.log(product ,product.target)
      if (
        product.target.parentElement.nextElementSibling.style.display == 'none'
      ) {
        product.target.parentElement.nextElementSibling.style.display = 'block';
        product.target.parentElement.style.display = 'none';
      } else {
        product.target.parentElement.nextElementSibling.style.display = 'none';
        product.target.parentElement.style.display = 'block';
      }
    });
  });

  document.querySelectorAll('.edit-product-cancel').forEach((btn) => {
    btn.addEventListener('click', (ele) => {
      // console.log(ele.target.parentElement.parentElement);
      ele.target.parentElement.parentElement.previousElementSibling.style.display =
        'block';
      ele.target.parentElement.parentElement.style.display = 'none';
    });
  });

  //delete product form product list
  document.querySelectorAll('.delete-product-details').forEach((ele) => {
    ele.addEventListener('click', (e) => {
      let name =
        e.target.parentElement.parentElement.firstElementChild.firstElementChild
          .textContent;
      deleteProduct(name);
    });
  });
}

event1();

function deleteProduct(na) {
  confirmDelete(
    'Once deleted, your all product details related to this product will be deleted permanently  '
  ).then((flag) => {
    if (flag) {
      let [data, keys, products] = localSetup();

      console.log(products[na]);

      keys[0].forEach((key) => {
        if (data[key].name == na) {
          const index = keys[0].indexOf(key);
          if (index > -1) {
            keys[0].splice(index, 1);
          }
          delete products[na];
          delete data[key];
          
        }
      });
      localStorage.setItem('products', JSON.stringify(products));
          localStorage.setItem('data', JSON.stringify(data));
          localStorage.setItem('keys', JSON.stringify(keys));
      
      [data, keys, products] = localSetup();
      console.log(products);
      console.log(keys);
      console.table(data);
      
      displayProducts();
      displayTimeLine();
      autoComplete();
    
    
      swal('Product has been deleted!', {
        icon: 'success',
      });
    }
  });
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}
