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
          "productID": "P-4",
          "productName": "Chair",
          "imgUri": "https://imgur.com/yIswGLg.jpg",
          "price": "24.99"
        }
      }
    }
  }
};

const template = document.querySelector('#template').innerHTML;
const templateScript = Handlebars.compile(template);
const html = templateScript(data);

document.body.innerHTML = html;
