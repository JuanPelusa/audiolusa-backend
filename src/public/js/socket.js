const socket = io();

let productUl = document.getElementById('products');

socket.on('New product', newProduct => {
    const p = newProduct.product
    productUl.innerHTML+=
    `
    <tr id='product-${p.id}'>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.description}</td>
        <td>${p.code}</td>
        <td>${p.price}</td>
        <td>${p.status}</td>
        <td>${p.stock}</td>
        <td>${p.category}</td>
        <td>${p.images}</td>
    </tr>`
})

socket.on('Product deleted', productErased => {
    let p = document.querySelectorAll(`#product-${productErased}`);
    p.forEach(e => e.remove());
})


