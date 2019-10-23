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
        },
        "2": {
          "productID": "P-9",
          "productName": "Macarons",
          "imgUri": "https://imgur.com/jXTjNZZ.jpg",
          "price": "4.99",
          "options": {
            "1": {
              "optionID": "O-1",
              "optionName": "Taste",
              "attributes": {
                "A-1": "Lemon",
                "A-2": "Chocolate",
                "A-3": "Strawberry",
                "A-4": "Pistache"
              }
            }
          }
        },
        "3": {
          "productID": "P-10",
          "productName": "Avocado",
          "imgUri": "https://imgur.com/x1KKtoK.jpg",
          "price": "-.99"
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
                "A-1": "Black",
                "A-2": "Red",
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
                "A-1": "Black",
                "A-2": "Blue",
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
          "productName": "Clock",
          "imgUri": "https://imgur.com/ZRJ9Rct.jpg",
          "price": "36.99",
          "options": {
            "1": {
              "optionID": "O-1",
              "optionName": "Color",
              "attributes": {
                "A-1": "Black",
                "A-2": "White"
              }
            }
          }
        },
        "2": {
          "productID": "P-6",
          "productName": "Chair",
          "imgUri": "https://imgur.com/yIswGLg.jpg",
          "price": "24.99",
          "options": {
            "1": {
              "optionID": "O-1",
              "optionName": "Color",
              "attributes": {
                "A-1": "Black",
                "A-2": "White"
              }
            }
          }
        },
        "3": {
          "productID": "P-7",
          "productName": "Stool",
          "imgUri": "https://imgur.com/aPIgpc4.jpg",
          "price": "39.99"
        },
        "4": {
          "productID": "P-8",
          "productName": "Square table",
          "imgUri": "https://imgur.com/jJayAiA.jpg",
          "price": "99.99"
        }
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {

  /*--------------------- Handlebars template processing ---------------------*/

  const template = document.querySelector('#template').innerHTML;
  const templateScript = Handlebars.compile(template);
  document.body.innerHTML = templateScript(data);


  /*--------------------------- Custom JavaScript ----------------------------*/

  /* Cart */
  const cart = document.querySelector('.cart');
  const cartList = document.querySelector('.cart__list');


  /* Cart button listener */
  document.querySelector('.js-cart-button').addEventListener('click', () => {
    cartList.classList.toggle('show');
  });


  /* Cart list position adjustment */
  // Not working when Handlebars renders too late(?). Works with the CSS
  // fallback. cartList.style.top = `${cart.offsetHeight + 1}px`;


  /*------------------- Forms and local storage management -------------------*/

  function showMessage(status, text) {
    const message = form.querySelector('.message');
    message.classList.add(status);
    message.textContent = text;
  }

  /**
   * Returns true if all options of the form are set.
   * @param form The form being submitted.
   * @returns {boolean} true if all options of the form are set ; false
   *   otherwise.
   */
  function validateOptions(form) {
    for (let select of form.querySelectorAll('select')) {
      let options = select.querySelectorAll('option:checked:not(:disabled)');
      if (options.length !== 1) {
        form.querySelector('.message').classList.add('error');
        form.querySelector('.message').textContent = 'Please make sure you selected the right options.';
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
    processForm(e.currentTarget);
  }

  /**
   * Updates the whole cart__list with the current localStorage values.
   * This method allows to show only effectively stored items in the cart.
   */
  function updateCartList() {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    const cartButtonNumber = document.querySelector('.js-cart-button-number');

    const cartList = document.querySelector('.js-cart-list');
    cartList.innerHTML = ''; // empty cart__list

    // Add items to cart__list
    if (cart === undefined || cart.length === 0) {
      cartButtonNumber.textContent = 0;

      const p = document.createElement('p');
      p.style.textAlign = 'center';
      p.textContent = 'Your cart is empty';
      cartList.append(p);
    } else {
      cartButtonNumber.textContent = cart.length;

      cart.forEach(item => {
        // Init cart-item form element
        const cartItem = document.createElement('form');
        cartItem.addEventListener('submit', handleCartItemForm);
        cartItem.classList.add('item');
        const actionInput = document.createElement('input');
        actionInput.type = 'hidden';
        actionInput.name = 'action';
        actionInput.value = 'remove';
        cartItem.append(actionInput);

        // Create cart item DOM elements
        const cartItemImage = document.createElement('img');
        cartItemImage.classList.add('item__image');

        const cartItemInfo = document.createElement('div');
        cartItemInfo.classList.add('item__info');

        const cartItemInfoHeader = document.createElement('div');
        cartItemInfoHeader.classList.add('item__info_header');

        const cartItemInfoContent = document.createElement('div');
        cartItemInfoContent.classList.add('item__info_content');

        // Retrieve the category in data corresponding to the item.categoryID
        let category = Object.values(data.categories).find(element => {
          return element.categoryID === item.categoryID;
        });

        // Retrieve the product in data with corresponding to the item.productID
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
          cartItemInfoOptions.classList.add('item__info_options');

          Object.values(product.options).forEach(option => {
            let attributeID = Object.keys(option.attributes).find(key => {
              return key === item[option.optionID];
            });

            let optionElement = document.createElement('p');
            optionElement.textContent = `${option.optionName}: ${option.attributes[attributeID]}`;
            cartItemInfoOptions.append(optionElement);
          });

          cartItemInfoContent.append(cartItemInfoOptions);
        }

        const cartItemSubmitButton = document.createElement('button');
        cartItemSubmitButton.type = 'submit';
        cartItemSubmitButton.classList.add('button', 'item__button');
        cartItemSubmitButton.innerHTML = '<i class="material-icons-sharp button__icon button__icon_sm">close</i>';
        cartItemSubmitButton.title = 'Remove item';

        cartItemInfoHeader.append(titleElement, priceElement);
        cartItemInfo.append(cartItemInfoHeader, cartItemInfoContent);
        cartItem.append(cartItemImage, cartItemInfo, cartItemSubmitButton);
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
      form.querySelectorAll('select').forEach(select => {
        const option = select.querySelector('option:checked');
        item[select.name] = option.value;
      });

      storeItem(item); // store item
    } else if (action === 'remove') {
      removeItem(item); // remove item
    }
  }

  /* Update (fill) cart before adding the events listeners */
  updateCartList();

  /* Product forms validation listener */
  document.querySelectorAll('.js-product-form').forEach(form => {
    form.addEventListener('submit', e => {
      let valid = true;
      valid = validateOptions(form) && valid;

      if (!valid) {
        e.preventDefault();
      } else {
        // Process form
        processForm(e.currentTarget);
      }
    });
  });

  /* Cart item forms validation listener */
  document.querySelectorAll('.js-cart-item-form').forEach(form => {
    form.addEventListener('submit', handleCartItemForm);
  });

  /* Hide cart-list when clicking in the .main element */
  document.querySelector('.main').addEventListener('click', e => {
    document.querySelector('.js-cart-list').classList.remove('show');
  });
}, {once: true});
