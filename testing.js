const productManager = require("./productManager");

const producto = new productManager()

console.log(producto.addProduct('Focal Maestro Utopia Evo', 'Speaker', 40000,'https://www.focal.com/es','hgi547uy', 5));
console.log(producto.addProduct('Dali Epicon 8', 'Floorstanding loudspeaker', 15000,'https://www.dali-speakers.com/','jko802pf', 3));
console.log(producto.addProduct('Dali Diablo Utopia Evo', 'Bookshelf 2-way loudspeaker', 12000,'https://www.dali-speakers.com/','kjh976gs', 3));
console.log(producto.addProduct('Focal Sub Utopia EM Evo', 'Subwoofer', 25000,'https://www.focal.com/es','yio831cv', 3));
console.log(producto.addProduct('Bowers & Wilkins 705 s3', 'Bookshelf 2-way loudspeaker', 3200,'https://www.bowerswilkins.com/en-us/','lfo467hg', 3));

/* Get products test */

//console.log(producto.getProducts());

/* Get products by id test */

//console.log(producto.getProductsById(1));

/* Get products by id "not found" test */

//console.log(producto.getProductsById(9));

/* Delete product test */

//console.log(producto.eraseProduct(5));


/* Testing update */

//const updateTest  = 
//    {
//        id: 25,
//        title: 'Bowers & Wilkins 801',
//        description: 'Floorstanding loudspeaker',
//        price: 41000,
//        image: 'https://www.bowerswilkins.com/en-us/'
//    };
//console.log(producto.updateProduct(1, updateTest));