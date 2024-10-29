let cart = [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const newProduct = {
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(newProduct);
    }
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector('.cart-total').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

let currentIndex = 0;
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;

function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    const slideWidth = slides[0].clientWidth;
    slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSliderPosition();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
}

function toggleCart() {
    const cart = document.querySelector('.cart');
    cart.classList.toggle('hidden');
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const cart = document.querySelector('.cart');

    const navbarPosition = navbar.getBoundingClientRect();
    
    if (navbarPosition.bottom < 0 && !cart.classList.contains('hidden')) {
        cart.classList.add('hidden');
    }
});

const messages = document.querySelectorAll('.message');
let indexText = 0;

function showNextMessage() {
    messages[indexText].classList.remove('active');
    indexText = (indexText + 1) % messages.length;
    messages[indexText].classList.add('active');
}

setInterval(showNextMessage, 4000);

const alert = document.querySelectorAll('.message');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let textCurrentIndex = 0;
let interval;

function showMessage(index) {
    alert.forEach((message, i) => {
        message.classList.remove('active', 'out');
        if (i === index) {
            message.classList.add('active');
        } else if (i < index) {
            message.classList.add('out');
        }
    });
}

function showNextMessage() {
    textCurrentIndex = (textCurrentIndex + 1) % messages.length;
    showMessage(textCurrentIndex);
    resetTimer();
}

function showPrevMessage() {
    textCurrentIndex = (textCurrentIndex - 1 + messages.length) % messages.length;
    showMessage(textCurrentIndex);
    resetTimer();
}

function startTimer() {
    interval = setInterval(showNextMessage, 4000);
}

function resetTimer() {
    clearInterval(interval);
    startTimer();
}

nextButton.addEventListener('click', showNextMessage);
prevButton.addEventListener('click', showPrevMessage);

startTimer();
