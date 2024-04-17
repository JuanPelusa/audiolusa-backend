const socket = io();

let productUl = document.getElementById('products');

socket.on('New product', newProduct => {
    const p = newProduct.product
    productUl.innerHTML+=
    `
    <tr>
                <td>${p.id}</td>
                <td>${p.title}</td>
                <td>${p.description}</td>
                <td>${p.code}</td>
                <td>${p.price}</td>
                <td>${p.status}</td>
                <td>${p.stock}</td>
                <td>${p.category}</td>
                <td>${p.image}</td>
            </tr>`
})

socket.on('Product deleted', productErased => {
    productUl.innerHTML = ''
    productErased.forEach(p => {
        productUl.innerHTML+=`<td>${p.product.id}</td>`
    });
})