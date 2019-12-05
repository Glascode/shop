'use strict';

var data = {
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
              "optionName": "Flavour",
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
              "optionName": "Flavour",
              "attributes": {
                "A-1": "Chocolate",
                "A-2": "Strawberry",
                "A-3": "Vanilla"
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
              "optionName": "Colour",
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
              "optionName": "Colour",
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
              "optionName": "Colour",
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
              "optionName": "Colour",
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
document.addEventListener('DOMContentLoaded', function () {
  /*--------------------- Handlebars template processing ---------------------*/
  var template = document.querySelector('#template').innerHTML;
  var templateScript = Handlebars.compile(template);
  document.body.innerHTML = templateScript(data);
  /*--------------------------- Custom JavaScript ----------------------------*/

  /* Cart */

  var cartList = document.querySelector('.cart__list');
  /* Cart button listener */

  document.querySelector('.js-cart-button').addEventListener('click', function () {
    cartList.classList.toggle('show');
  });
  /*------------------- Forms and local storage management -------------------*/

  /**
   * Returns true if all options of the form are set.
   * @param form The form being submitted.
   * @returns {boolean} true if all options of the form are set ; false
   *   otherwise.
   */

  function validateOptions(form) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = form.querySelectorAll('select')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var select = _step.value;
        var options = select.querySelectorAll('option:checked:not(:disabled)');

        if (options.length !== 1) {
          form.querySelector('.message').textContent = "Oops! Please make sure you've selected the right options.";
          return false;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return true;
  }
  /**
   * Stores an item in the 'cart' localStorage.
   * @param item The item to be stored in the 'cart' localStorage.
   */


  function storeItem(item) {
    var cart = localStorage.getItem('cart');
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
    var cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    if (cart === undefined || cart.length === 0) {
      return false;
    } // Find the index of the element to be removed and remove it from the cart


    var index = cart.findIndex(function (element) {
      return element.categoryID === item.categoryID && element.productID === item.productID;
    });
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  /**
   * Handles the cart item form.
   * @param e The event which has occurred.
   */


  function handleCartItemForm(e) {
    processForm(e.currentTarget);
  }
  /**
   * Updates the whole cart list with the current localStorage values.
   * This method allows to show only effectively stored items in the cart.
   */


  function updateCartList() {
    var cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    var cartButtonNumber = document.querySelector('.js-cart-button-number');
    var cartList = document.querySelector('.js-cart-list');
    cartList.innerHTML = ''; // empty cart__list
    // Add items to cart__list

    if (cart === undefined || cart.length === 0) {
      cartButtonNumber.textContent = 0;
      var messageEmpty = document.createElement('p');
      messageEmpty.classList.add('cart__text', 'cart__message');
      messageEmpty.textContent = 'Your cart is empty';
      cartList.append(messageEmpty);
    } else {
      cartButtonNumber.textContent = cart.length;
      var total = 0;
      cart.forEach(function (item) {
        // Init cart-item form element
        var cartItem = document.createElement('form');
        cartItem.addEventListener('submit', handleCartItemForm);
        cartItem.classList.add('item');
        var actionInput = document.createElement('input');
        actionInput.type = 'hidden';
        actionInput.name = 'action';
        actionInput.value = 'remove';
        cartItem.append(actionInput); // Create cart item DOM elements

        var cartItemImage = document.createElement('img');
        cartItemImage.classList.add('item__image');
        var cartItemInfo = document.createElement('div');
        cartItemInfo.classList.add('item__info');
        var cartItemHeader = document.createElement('div');
        cartItemHeader.classList.add('item__header');
        var cartItemContent = document.createElement('div');
        cartItemContent.classList.add('item__content'); // Retrieve the category in data corresponding to the item.categoryID

        var category = Object.values(data.categories).find(function (element) {
          return element.categoryID === item.categoryID;
        }); // Retrieve the product in data with corresponding to the item.productID

        var product = Object.values(category.products).find(function (element) {
          return element.productID === item.productID;
        }); // Last form elements

        var categoryIDInput = document.createElement('input');
        categoryIDInput.type = 'hidden';
        categoryIDInput.name = 'categoryID';
        categoryIDInput.value = category.categoryID;
        var productIDInput = document.createElement('input');
        productIDInput.type = 'hidden';
        productIDInput.name = 'productID';
        productIDInput.value = product.productID;
        cartItem.append(categoryIDInput, productIDInput); // Image

        cartItemImage.src = product.imgUri;
        cartItemImage.alt = product.productName; // Info header

        var nameElement = document.createElement('h4');
        nameElement.classList.add('item__name');
        nameElement.textContent = product.productName;
        var priceElement = document.createElement('p');
        priceElement.classList.add('price', 'item__price');
        priceElement.textContent = product.price;
        total += parseFloat(product.price); // Info option(s)

        var cartItemOptions = document.createElement('div');
        cartItemOptions.classList.add('item__options');

        if (product.options) {
          Object.values(product.options).forEach(function (option) {
            var attributeID = Object.keys(option.attributes).find(function (key) {
              return key === item[option.optionID];
            });
            var cartItemOption = document.createElement('p');
            cartItemOption.classList.add('item__option');
            cartItemOption.textContent = option.attributes[attributeID];
            cartItemOptions.append(cartItemOption);
          });
        } else {
          var cartItemOption = document.createElement('p');
          cartItemOption.classList.add('item__option');
          cartItemOption.textContent = 'Plain';
          cartItemOptions.append(cartItemOption);
        }

        cartItemContent.append(cartItemOptions);
        var cartItemSubmitButton = document.createElement('button');
        cartItemSubmitButton.type = 'submit';
        cartItemSubmitButton.classList.add('button', 'item__button');
        cartItemSubmitButton.innerHTML = '<i class="material-icons-sharp button__icon button__icon_s">close</i>';
        cartItemSubmitButton.title = 'Remove item';
        cartItemHeader.append(nameElement, priceElement);
        cartItemInfo.append(cartItemHeader, cartItemContent);
        cartItem.append(cartItemImage, cartItemInfo, cartItemSubmitButton);
        cartList.append(cartItem);
      }); // end foreach item

      var cartFooter = document.createElement('div');
      cartFooter.classList.add('item', 'cart__footer');
      var cartTotalPrice = document.createElement('p');
      cartTotalPrice.classList.add('cart__text');
      cartTotalPrice.textContent = "Total: ".concat(Math.round(total * 100) / 100);
      var cartCheckoutButton = document.createElement('button');
      cartCheckoutButton.classList.add('button', 'button--black');
      cartCheckoutButton.textContent = 'Checkout';
      cartFooter.append(cartTotalPrice, cartCheckoutButton);
      cartList.append(cartFooter);
    }
  }
  /**
   * Processes a form.
   * @param form The form being submitted.
   */


  function processForm(form) {
    /* Get form elements */
    var action = form.querySelector('input[name="action"]').value;
    var categoryID = form.querySelector('input[name="categoryID"]').value;
    var productID = form.querySelector('input[name="productID"]').value;
    /* Create item object */

    var item = {};
    item.categoryID = categoryID;
    item.productID = productID;
    /* Perform action */

    if (action === 'add') {
      form.querySelectorAll('select').forEach(function (select) {
        var option = select.querySelector('option:checked');
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

  document.querySelectorAll('.js-product-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var valid = true;
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

  document.querySelectorAll('.js-cart-item-form').forEach(function (form) {
    form.addEventListener('submit', handleCartItemForm);
  });
  /* Hide cart-list when clicking in the .main element */

  document.querySelector('.main').addEventListener('click', function (e) {
    document.querySelector('.js-cart-list').classList.remove('show');
  });
}, {
  once: true
});
//# sourceMappingURL=main.js.map