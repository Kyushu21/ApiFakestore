const apiUrl = 'https://fakestoreapi.com/products';
const cartKey = 'shoppingCart';

async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products.slice(0, 5));
}

function displayProducts(products) {
    const productsDiv = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4';
        productDiv.innerHTML = `
                    <div class="card mb-4">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price}</p>
                            <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Agregalo papu</button>
                        </div>
                    </div>
                `;
        productsDiv.appendChild(productDiv);
    });
}

function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cart.push({ id, title, price });
    localStorage.setItem(cartKey, JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cart.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.className = 'list-group-item';
        itemLi.innerHTML = `${item.title} - $${item.price}`;
        cartDiv.appendChild(itemLi);
    });
}

function finalizaCompra() {
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const totalCost = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('totalCost').innerText = `Total Cost: $${totalCost}`;
    localStorage.removeItem(cartKey);
    displayCart();
}

document.getElementById('finalizaCompra').addEventListener('click', finalizaCompra);

fetchProducts();
displayCart();