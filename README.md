# Shop

A minimal e-commerce page, generated with Handlebars.js.

## Getting started

### Installation

The site can work totally statically. Just open the index.html file in your favourite browser and Handlebars will compile the template.

### Items identification

The identification of the items (products) is based on their `productID`. However, since products are organised within categories, the `categoryID` is kept so the parsing to get values from the cart is made less heavy.
