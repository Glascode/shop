# Shop

A minimal e-commerce page, generated with Handlebars.js.

## Getting started

### Installation

The site can work totally statically. Just open the index.html file in your favourite browser to view the main page.


## About

### Data

#### Items identification

The identification of the items (products) is based on their `productID` only. However, since the products are organised within different categories, the `categoryID` is kept in the parsing process so this parsing is made less heavy. For instance, there is no need to parse an entire category to retrieve a product if it's not a part of it).

### HTML

The main page is generated with [Handlebars.js](https://handlebarsjs.com/). The cart list is generated with vanilla JavaScript using the `localStorage`, which the actual items data is retrieved with. With products organised in categories, Handlebars didn't allow to retrieve products data easily using only a `productID`.

### (S)CSS

#### Structure

For this small project, a very simple file structure has been chosen.

```
_base.scss
_layout.scss
_components.scss

main.scss
```

Only 3 separate files are connected to the `main.scss`:

**`_base.scss`:** contains resets, variables and general styles.

**`_layout.scss`:** contains all styles handling the layout.

**`_components.scss`:** contains reusable and other specific components.

Finally, `_main.scss` does nothing but import the 3 files.

#### Naming

The CSS naming method used in the project is called BEM.
