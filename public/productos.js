const products = [
  {
    name: 'Implante neuronal',
    color: '#00ff5f',
    icon: 'NEU',
    price: 1500,
    unit: '1 dispositivo',
    description: 'Dispositivo neuronal para utilizar el Sistema Utopias. ¿Quieres vivir la vida de tus sueños? Este es el primer paso para lograrlo. Cada vez más personas se unen. ¡No te quedes atrás!'
  },
  {
    name: 'Carne de res',
    color: '#ff3f6c',
    icon: 'RES',
    price: 189.5,
    unit: '1 kg',
    description: 'Carne traída de las mejores granjas de Texas. Vuelve a probar lo que se siente comer carne de res: el mismo sabor de antes de su prohibición en 2040.'
  },
  {
    name: 'Aire acondicionado',
    color: '#31f7ff',
    icon: 'AIR',
    price: 17000,
    unit: '1 dispositivo',
    description: 'Con temperaturas de hasta 43 °C, todos necesitamos aire acondicionado en casa. Este es el último modelo traído desde California. ¡Últimas piezas! No se surtirán más durante todo el año.'
  },
  {
    name: 'Acceso a manantial',
    color: '#b6ff00',
    icon: 'AGU',
    price: 600,
    unit: '1 boleto',
    description: 'Acceso exclusivo a las nuevas lagunas naturales. Experimenta lo que es nadar en una laguna por primera vez en 35 años.'
  },
  {
    name: 'Soporte de vida neuronal',
    color: '#c084fc',
    icon: 'SVN',
    price: 5000,
    unit: '1 dispositivo',
    description: 'Puedes tener tu propio dispositivo de soporte neuronal en casa. Al contratar la suscripción del plan neuronal de por vida, realizaremos el proceso de conversión en tu dispositivo.'
  },
  {
    name: 'Acceso a ciudades naturales',
    color: '#facc15',
    icon: 'ACN',
    price: 600,
    unit: '1 boleto',
    description: '¿Te gustaría vivir como un ciudadano de primera clase? Puedes acceder durante un día completo a las ciudades naturales.'
  }
];

const productGrid = document.getElementById('productGrid');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalAdd = document.getElementById('modalAdd');

let cartTotal = 0;
const cart = {};
let selectedProduct = null;

const moneyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
});

function formatMoney(value) {
  return moneyFormatter.format(value);
}

function makeProductImage(product) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620">
      <defs>
        <radialGradient id="glow" cx="45%" cy="36%" r="62%">
          <stop offset="0%" stop-color="${product.color}" stop-opacity=".55"/>
          <stop offset="48%" stop-color="#061013" stop-opacity=".92"/>
          <stop offset="100%" stop-color="#02050a"/>
        </radialGradient>
        <linearGradient id="grid" x1="0" x2="1">
          <stop offset="0%" stop-color="#31f7ff" stop-opacity=".2"/>
          <stop offset="100%" stop-color="#00ff5f" stop-opacity=".32"/>
        </linearGradient>
      </defs>
      <rect width="900" height="620" fill="url(#glow)"/>
      <path d="M0 475 C180 385 300 520 455 430 C625 330 730 405 900 315 L900 620 L0 620Z" fill="#000" opacity=".42"/>
      <g stroke="url(#grid)" stroke-width="2" opacity=".42">
        <path d="M0 120 H900 M0 220 H900 M0 320 H900 M0 420 H900 M0 520 H900"/>
        <path d="M100 0 V620 M240 0 V620 M380 0 V620 M520 0 V620 M660 0 V620 M800 0 V620"/>
      </g>
      <circle cx="450" cy="285" r="148" fill="#000" opacity=".55" stroke="${product.color}" stroke-width="6"/>
      <text x="450" y="315" text-anchor="middle" fill="${product.color}" font-size="92" font-family="Arial, sans-serif" font-weight="900">${product.icon}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderCart() {
  const entries = Object.entries(cart);
  cartItems.innerHTML = '';

  if (entries.length === 0) {
    cartItems.innerHTML = '<p class="text-slate-500">Tu carrito está vacío.</p>';
    return;
  }

  let cartAmount = 0;

  entries.forEach(([name, quantity]) => {
    const product = products.find((item) => item.name === name);
    const subtotal = product.price * quantity;
    cartAmount += subtotal;
    const item = document.createElement('div');
    item.className = 'grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/10 py-2';
    item.innerHTML = `
      <span>${name} <span class="text-slate-500">(${product.unit})</span> <span class="font-bold text-neon">x${quantity}</span></span>
      <span class="font-bold text-slate-100">${formatMoney(subtotal)}</span>
      <button class="remove-cart-item grid h-8 w-8 place-items-center border border-red-400/60 text-base text-red-300 transition hover:bg-red-500 hover:text-white" type="button" data-product="${name}" aria-label="Eliminar ${name} del carrito" title="Eliminar producto">
        &#128465;
      </button>
    `;
    cartItems.appendChild(item);
  });

  const total = document.createElement('div');
  total.className = 'mt-3 flex items-center justify-between border-t border-neon/30 pt-3 text-base font-bold';
  total.innerHTML = `
    <span class="text-neon">Total</span>
    <span class="text-slate-100">${formatMoney(cartAmount)}</span>
  `;
  cartItems.appendChild(total);
}

function addToCart(product) {
  cartTotal += 1;
  cart[product.name] = (cart[product.name] || 0) + 1;
  cartCount.textContent = cartTotal;
  renderCart();
}

function removeFromCart(productName) {
  if (!cart[productName]) {
    return;
  }

  cartTotal -= cart[productName];
  delete cart[productName];
  cartCount.textContent = cartTotal;
  renderCart();
}

function openProduct(product) {
  selectedProduct = product;
  modalImage.src = makeProductImage(product);
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalPrice.textContent = `${formatMoney(product.price)} / ${product.unit}`;
  modalDescription.textContent = product.description;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProductModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  selectedProduct = null;
}

products.forEach((product) => {
  const card = document.createElement('article');
  card.className = 'product-card system-flicker panel overflow-hidden transition hover:-translate-y-1 hover:border-cyanGlow hover:shadow-cyan';
  card.tabIndex = 0;
  card.innerHTML = `
    <div class="cursor-pointer" role="button" aria-label="Ver detalle de ${product.name}">
      <img src="${makeProductImage(product)}" alt="${product.name}" class="breathe-image h-52 w-full border-b border-neon/30 object-cover">
      <div class="p-5">
        <div class="flex items-start justify-between gap-3">
          <h2 class="text-2xl font-bold text-slate-100">${product.name}</h2>
          <p class="shrink-0 text-xl font-bold text-neon">${formatMoney(product.price)}</p>
        </div>
        <p class="mt-2 font-sans text-sm text-slate-400">${product.unit}</p>
        <button class="add-cart glitch-button mt-4 w-full border border-neon bg-neon px-5 py-3 text-xs font-bold uppercase tracking-wide text-black shadow-neon transition hover:bg-transparent hover:text-neon" type="button">
          Añadir al carrito
        </button>
      </div>
    </div>
  `;

  card.querySelector('[role="button"]').addEventListener('click', () => openProduct(product));
  card.querySelector('.add-cart').addEventListener('click', (event) => {
    event.stopPropagation();
    addToCart(product);
  });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      openProduct(product);
    }
  });
  productGrid.appendChild(card);
});

closeModal.addEventListener('click', closeProductModal);
cartButton.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = !cartPanel.classList.contains('hidden');
  cartPanel.classList.toggle('hidden', isOpen);
  cartButton.setAttribute('aria-expanded', String(!isOpen));
});
cartItems.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.remove-cart-item');

  if (removeButton) {
    removeFromCart(removeButton.dataset.product);
  }
});
document.addEventListener('click', (event) => {
  if (!cartPanel.contains(event.target) && event.target !== cartButton) {
    cartPanel.classList.add('hidden');
    cartButton.setAttribute('aria-expanded', 'false');
  }
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeProductModal();
  }
});
modalAdd.addEventListener('click', () => {
  if (selectedProduct) {
    addToCart(selectedProduct);
  }
});
