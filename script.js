document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        alert('Added to cart!');
    });
});
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();

        const productGrid = document.querySelector('.product-grid');
        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="btn add-to-cart" data-id="${product._id}">Add to Cart</button>
                </div>`;
            productGrid.innerHTML += productCard;
        });

        // Add event listeners for the "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                alert('Product added to cart!');
            });
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchProducts();
import axios from 'axios';

axios.get('http://localhost:5000/api/products')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
    async function loginUser(email, password) {
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login successful');
                localStorage.setItem('token', data.token); // Store JWT
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/orders', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
        