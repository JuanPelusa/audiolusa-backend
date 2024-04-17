const socket = io();

let productUl = document.getElementById('products');

socket.on('New product', newProduct => {
    productUl.innerHTML+=`<li>${newProduct}</li>`
})

socket.on('Product deleted', productErased => {
    productUl.innerHTML = ''
    productErased.forEach(p => {
        productUl.innerHTML+=`<li>${p.product}</li>`
    });
})