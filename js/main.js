'use strict';

const data = {
  "categories": {
    "1": {
      "categoryName": "Food",
      "categoryID": "C-1",
      "products": {
        "1": {
          "productID": "P-1",
          "productName": "Donuts",
          "imgUri": "https://imgur.com/kYchlYz.jpg",
          "price": "3.99",
          "options": {
            "1": {
              "optionID": "O-1",
              "optionName": "Taste",
              "attributes": {
                "A-1": "Chocolate",
                "A-2": "Strawberry"
              }
            }
          }
        }
      }
    },
    "2": {
      "categoryName": "Clothing",
      "categoryID": "C-2",
      "products": {
        "1": {
          "productID": "P-2",
          "productName": "T-Shirt",
          "imgUri": "https://imgur.com/bjvRuAP.jpg",
          "price": "19.99",
          "options": {
            "1": {
              "optionID": "O-1",
              "optionName": "Size",
              "attributes": {
                "A-1": "S",
                "A-2": "M",
                "A-3": "L"
              }
            },
            "2": {
              "optionID": "O-2",
              "optionName": "Color",
              "attributes": {
                "A-1": "Red",
                "A-2": "Pink",
                "A-3": "Green"
              }
            }
          }
        },
        "2": {
          "productID": "P-3",
          "productName": "Jumper",
          "imgUri": "https://imgur.com/9uqCna7.jpg",
          "price": "29.99",
          "options": {
            "1": {
              "optionID": "O-1",
              "optionName": "Size",
              "attributes": {
                "A-1": "S",
                "A-2": "M",
                "A-3": "L"
              }
            },
            "2": {
              "optionID": "O-2",
              "optionName": "Color",
              "attributes": {
                "A-1": "Red",
                "A-2": "Pink",
                "A-3": "Green"
              }
            }
          }
        },
        "3": {
          "productID": "P-4",
          "productName": "Shoes",
          "imgUri": "https://imgur.com/oE198Ub.jpg",
          "price": "49.99",
          "options": {
            "1": {
              "optionID": "O-1",
              "optionName": "Size",
              "attributes": {
                "A-1": "44",
                "A-2": "45",
                "A-3": "46"
              }
            }
          }
        }
      }
    },
    "3": {
      "categoryName": "Home",
      "categoryID": "C-3",
      "products": {
        "1": {
          "productID": "P-5",
          "productName": "Chair",
          "imgUri": "https://imgur.com/yIswGLg.jpg",
          "price": "24.99"
        }
      }
    }
  }
};

/*********************** Handlebars template processing ***********************/

const template = document.querySelector('#template').innerHTML;
const templateScript = Handlebars.compile(template);
const html = templateScript(data);

document.body.innerHTML = html;


/***************************** Custom JavaScript ******************************/

/* Cart */
const cart = document.querySelector('.cart');
const cartList = document.querySelector('.cart-list');


/* Cart button listener */
document.querySelector('.cart-button').addEventListener('click', () => {
  cartList.classList.toggle('show');
});


/* Cart list position adjustment */
function adjustCartListPosition() {
  cartList.style.top = `${cart.offsetHeight + 1}px`;
}

adjustCartListPosition();
window.onresize = adjustCartListPosition;


/********************* Forms and local storage management **********************/

/**
 * Returns true if all options of the form are set.
 * @param form The form being submitted.
 * @returns {boolean} true if all options of the form are set ; false otherwise.
 */
function validateOptions(form) {
  for (let fieldset of form.querySelectorAll('fieldset')) {
    let options = fieldset.querySelectorAll('input[type="radio"]:checked');
    if (options.length !== 1) {
      form.querySelector('.error').textContent = 'Please make sure you selected all the options.';
      return false;
    }
  }
  return true;
}

/**
 * Stores an item in the 'cart' localStorage.
 * @param item The item to be stored in the 'cart' localStorage.
 */
function storeItem(item) {
  let cart = localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Removes an item in the 'cart' localStorage.
 * @param item The item to be removed from the 'cart' localStorage.
 * @returns {boolean} false if the 'cart' localStorage is empty.
 */
function removeItem(item) {
  let cart = localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];
  if (cart === undefined || cart.length === 0) {
    return false;
  }

  // Find the index of the element to be removed and remove it from the cart
  const index = cart.findIndex(element => {
    return element.categoryID === item.categoryID && element.productID === item.productID;
  });
  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Handles the cart-item form.
 * @param e The event which has occurred.
 */
function handleCartItemForm(e) {
  e.preventDefault();
  processForm(e.currentTarget);
}

/**
 * Updates the whole cart-list with the current localStorage values.
 * This method allows to show only effectively stored items in the cart.
 */
function updateCartList() {
  let cart = localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];

  const cartNumberOfItemsButton = document.querySelector('.cart-button__number');

  const cartList = document.querySelector('.cart-list');
  cartList.innerHTML = ''; // empty cart-list

  // Add items to cart-list
  if (cart === undefined || cart.length === 0) {
    cartNumberOfItemsButton.textContent = 0;

    const p = document.createElement('p');
    p.textContent = 'Your cart is empty. Start by adding some items.';
    cartList.append(p);
  } else {
    cartNumberOfItemsButton.textContent = cart.length;

    cart.forEach(item => {
      // Init cart-item form element
      const cartItem = document.createElement('form');
      cartItem.addEventListener('submit', handleCartItemForm);
      cartItem.classList.add('cart-item');
      const actionInput = document.createElement('input');
      actionInput.type = 'hidden';
      actionInput.name = 'action';
      actionInput.value = 'remove';
      cartItem.append(actionInput);

      // Create display elements
      const cartItemImage = document.createElement('img');
      cartItemImage.classList.add('cart-item__image');
      const cartItemInfo = document.createElement('div');
      cartItemInfo.classList.add('cart-item__info');
      const cartItemInfoHeader = document.createElement('div');
      cartItemInfoHeader.classList.add('cart-item__info_header');
      const cartItemInfoContent = document.createElement('div');
      cartItemInfoContent.classList.add('cart-item__info_content');

      // Retrieve the category corresponding to the item.categoryID
      let category = Object.values(data.categories).find(element => {
        return element.categoryID === item.categoryID;
      });

      // Retrieve the product with corresponding to the item.productID
      let product = Object.values(category.products).find(element => {
        return element.productID === item.productID;
      });

      // Last form elements
      const categoryIDInput = document.createElement('input');
      categoryIDInput.type = 'hidden';
      categoryIDInput.name = 'categoryID';
      categoryIDInput.value = category.categoryID;
      const productIDInput = document.createElement('input');
      productIDInput.type = 'hidden';
      productIDInput.name = 'productID';
      productIDInput.value = product.productID;

      cartItem.append(categoryIDInput, productIDInput);

      // Image
      cartItemImage.src = product.imgUri;
      cartItemImage.alt = product.productName;

      // Info header
      let titleElement = document.createElement('h4');
      titleElement.textContent = product.productName;
      let priceElement = document.createElement('p');
      priceElement.textContent = product.price;

      // Info options
      if (product.options) {
        const cartItemInfoOptions = document.createElement('div');
        cartItemInfoOptions.classList.add('cart-item__info_options');

        for (let option of Object.values(product.options)) {
          let attributeID = Object.keys(option.attributes).find(key => {
            return key === item[option.optionID];
          });

          let optionElement = document.createElement('p');
          optionElement.textContent = `${option.optionName}: ${option.attributes[attributeID]}`;
          cartItemInfoOptions.append(optionElement);
        }

        cartItemInfoContent.append(cartItemInfoOptions);
      }

      const cartItemSubmitButton = document.createElement('button');
      cartItemSubmitButton.type = 'submit';
      cartItemSubmitButton.classList.add('cart-item__submit-button');
      cartItemSubmitButton.textContent = 'Remove';

      cartItemInfoHeader.append(titleElement, priceElement);
      cartItemInfoContent.append(cartItemSubmitButton);
      cartItemInfo.append(cartItemInfoHeader, cartItemInfoContent);
      cartItem.append(cartItemImage, cartItemInfo);
      cartList.append(cartItem);
    });
  }
}

/**
 * Processes a form.
 * @param form The form being submitted.
 */
function processForm(form) {

  /* Get form elements */
  const action = form.querySelector('input[name="action"]').value;
  const categoryID = form.querySelector('input[name="categoryID"]').value;
  const productID = form.querySelector('input[name="productID"]').value;

  /* Create item object */
  let item = {};
  item.categoryID = categoryID;
  item.productID = productID;

  /* Perform action */
  if (action === 'add') {
    let options = [];
    for (let fieldset of form.querySelectorAll('fieldset')) {
      options.push(fieldset.querySelector('input[name^="O-"]:checked'));
    }

    for (let option of options) {
      item[option.name] = option.value;
    }

    storeItem(item); // store item
    updateCartList();
  } else if (action === 'remove') {
    removeItem(item); // remove item
    updateCartList();
  }
}

/* Update cart before adding the event listener */
updateCartList();

/* Product forms validation listener */
document.querySelectorAll('.product-form').forEach(form => {
  form.addEventListener('submit', e => {
    let valid = true;
    valid = validateOptions(form) && valid;

    e.preventDefault();

    if (valid) {
      processForm(e.currentTarget);
    }
  });
});

/* Cart item forms validation listener */
document.querySelectorAll('.cart-item').forEach(form => {
  form.addEventListener('submit', handleCartItemForm);
});
