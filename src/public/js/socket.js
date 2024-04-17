const socket = io();

let productUl = document.getElementById('products');

socket.on('New product', newProduct => {
    productUl.innerHTML+=
    `
    <tr>
                <td>${newProduct.id}</td>
                <td>${newProduct.title}</td>
                <td>${newProduct.description}</td>
                <td>${newProduct.code}</td>
                <td>${newProduct.price}</td>
                <td>${newProduct.status}</td>
                <td>${newProduct.stock}</td>
                <td>${newProduct.category}</td>
                <td>${newProduct.image}</td>
            </tr>`
})

socket.on('Product deleted', productErased => {
    productUl.innerHTML = ''
    productErased.forEach(p => {
        productUl.innerHTML+=`<td>${p.product}</td>`
    });
})