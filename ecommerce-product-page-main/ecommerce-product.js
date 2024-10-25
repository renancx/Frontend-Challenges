// Carrinho inicializado como um array vazio
let cart = [];

// Função para adicionar o produto ao carrinho
function addToCart(productName, productPrice) {
    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        // Se o produto já estiver no carrinho, aumenta a quantidade
        existingProduct.quantity += 1;
    } else {
        // Caso contrário, adiciona um novo produto
        const newProduct = {
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(newProduct);
    }

    // Atualiza a interface do carrinho
    updateCartUI();
}

// Função para atualizar o HTML do carrinho
function updateCartUI() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Limpa o conteúdo anterior

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Atualiza o total
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector('.cart-total').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

let currentIndex = 0; // Índice da imagem atual
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;

function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    const slideWidth = slides[0].clientWidth;
    slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`; // Move a barra de fotos
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides; // Volta ao início ao chegar no final
    updateSliderPosition();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Volta ao final ao chegar no início
    updateSliderPosition();
}

// Função para mostrar/ocultar o carrinho
function toggleCart() {
    const cart = document.querySelector('.cart');
    cart.classList.toggle('hidden');
}

// Função para fechar o carrinho quando a navbar sair da área visível
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const cart = document.querySelector('.cart');

    // Verifica a posição da navbar na tela
    const navbarPosition = navbar.getBoundingClientRect();
    
    // Se a navbar não estiver mais visível na área de visualização, fecha o carrinho
    if (navbarPosition.bottom < 0 && !cart.classList.contains('hidden')) {
        cart.classList.add('hidden');
    }
});


    const messages = document.querySelectorAll('.message');
    let indexText = 0;

    function showNextMessage() {
        messages[indexText].classList.remove('active'); // Oculta a mensagem atual
        indexText = (indexText + 1) % messages.length; // Incrementa o índice
        messages[indexText].classList.add('active'); // Mostra a próxima mensagem
    }

    // Inicia a troca automática a cada 4 segundos
    setInterval(showNextMessage, 4000);


    const alert = document.querySelectorAll('.message');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let textCurrentIndex = 0;
    let interval; // Variável para armazenar o intervalo

    function showMessage(index) {
        alert.forEach((message, i) => {
            message.classList.remove('active', 'out'); // Remove classes de animação
            if (i === index) {
                message.classList.add('active'); // Ativa a mensagem atual
            } else if (i < index) {
                message.classList.add('out'); // Adiciona a animação de saída
            }
        });
    }

    function showNextMessage() {
        textCurrentIndex = (textCurrentIndex + 1) % messages.length; // Incrementa o índice
        showMessage(textCurrentIndex);
        resetTimer(); // Reinicia o timer
    }

    function showPrevMessage() {
        textCurrentIndex = (textCurrentIndex - 1 + messages.length) % messages.length; // Decrementa o índice
        showMessage(textCurrentIndex);
        resetTimer(); // Reinicia o timer
    }

    function startTimer() {
        interval = setInterval(showNextMessage, 4000); // Inicia o intervalo
    }

    function resetTimer() {
        clearInterval(interval); // Para o intervalo existente
        startTimer(); // Inicia um novo intervalo
    }

    nextButton.addEventListener('click', showNextMessage);
    prevButton.addEventListener('click', showPrevMessage);

    // Inicia o timer automaticamente
    startTimer();

