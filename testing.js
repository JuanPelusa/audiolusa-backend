const Productmanager = require("./productManager");

const producto = new Productmanager()

console.log(producto.addProduct('Speaker','Focal Maestro Utopia Evo', '40000','www.focal.com','hgi5478uy', '5'));
console.log(producto.addProduct('Subwoofer','Focal Sub Utopia EM Evo', '25000','www.focal.com','jko802pf', '3'));

console.log(producto.getProducts());