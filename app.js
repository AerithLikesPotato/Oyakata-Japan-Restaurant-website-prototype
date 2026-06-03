/* ====================================================
   OYAKATA — Shared JavaScript
==================================================== */

const CART_KEY = 'oyakata_cart';


function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge(cart);
}
function getCart() { return loadCart(); }

function addToCart(product) {
  const cart = loadCart();
  const idx = cart.findIndex(i => i.id === product.id);
  if (idx > -1) cart[idx].qty += 1;
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
  showToast(`${product.name} added to cart 🛒`);
  pulseCartIcon();
}

function removeFromCart(id) {
  const cart = loadCart().filter(i => i.id !== id);
  saveCart(cart);
}

function updateQty(id, delta) {
  const cart = loadCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
  return cart;
}

function cartTotal(cart) {
  return cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
}

function cartCount(cart) {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function updateCartBadge(cart) {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  const count = cartCount(cart);
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

function pulseCartIcon() {
  const icon = document.querySelector('.nav-cart');
  if (!icon) return;
  icon.classList.add('pulse');
  setTimeout(() => icon.classList.remove('pulse'), 400);
}

function showToast(msg, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  // Enforce max 3 notifications
  const toasts = container.querySelectorAll('.toast');
  if (toasts.length >= 3) {
    const oldestToast = toasts[toasts.length - 1];
    oldestToast.style.animation = 'toastOut 0.35s forwards';
    setTimeout(() => oldestToast.remove(), 380);
  }

  const el = document.createElement('div');
  el.className = `toast${type === 'error' ? ' error' : ''}`;
  
  // Create notification structure with close button
  el.innerHTML = `
    <div class="toast-content">${msg}</div>
    <button class="toast-close" aria-label="Close notification">✕</button>
  `;
  
  container.appendChild(el);
  
  // Close button functionality
  const closeBtn = el.querySelector('.toast-close');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removeToast(el);
  });

  // Auto-remove after 1.3 seconds
  const timeoutId = setTimeout(() => removeToast(el), 1300);
  
  // Store timeout ID so we can clear it if closed manually
  el.timeoutId = timeoutId;
}

function removeToast(el) {
  if (el.timeoutId) clearTimeout(el.timeoutId);
  el.style.animation = 'toastOut 0.35s forwards';
  setTimeout(() => el.remove(), 380);
}

function openCart() {
  document.querySelector('.cart-panel')?.classList.add('open');
  document.querySelector('.cart-backdrop')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartPanel();
}
function closeCart() {
  document.querySelector('.cart-panel')?.classList.remove('open');
  document.querySelector('.cart-backdrop')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartPanel() {
  const cart = loadCart();
  const panel = document.querySelector('.cart-panel');
  if (!panel) return;

  const itemsEl = panel.querySelector('.cart-items');
  const footerEl = panel.querySelector('.cart-footer');

  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty">
      <span class="cart-empty-icon">🍣</span>
      <p>Your cart is empty</p>
      <a href="menu.html" class="btn btn-dark btn-sm" onclick="closeCart()">Browse Menu</a>
    </div>`;
    const summary = footerEl.querySelector('.cart-summary');
    if (summary) summary.innerHTML = '';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.src='https://placehold.co/72x72/f2ede4/8a8680?text=🍜'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="cart-item-del" onclick="deleteItem(${item.id})" title="Remove">✕</button>
        </div>
      </div>
      <div style="font-weight:600;font-size:.9rem;flex-shrink:0">$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join('');

  const sub = parseFloat(cartTotal(cart));
  const delivery = sub > 0 ? (sub >= 30 ? 0 : 3.99) : 0;
  const tax = (sub * 0.08).toFixed(2);
  const total = (sub + delivery + parseFloat(tax)).toFixed(2);

  const summary = footerEl.querySelector('.cart-summary');
  if (summary) summary.innerHTML = `
    <div class="cart-row"><span>Subtotal</span><span>$${sub.toFixed(2)}</span></div>
    <div class="cart-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:#27ae60">Free</span>' : '$' + delivery.toFixed(2)}</span></div>
    <div class="cart-row"><span>Tax (8%)</span><span>$${tax}</span></div>
    <div class="cart-row total"><span>Total</span><span>$${total}</span></div>
  `;

}

window.changeQty = function(id, delta) {
  updateQty(id, delta);
  renderCartPanel();
};

window.deleteItem = function(id) {
  removeFromCart(id);
  renderCartPanel();
};

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

function initNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });
  updateCartBadge(loadCart());
  const searchInput = document.querySelector('.nav-search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) window.location.href = `menu.html?search=${encodeURIComponent(q)}`;
      }
    });
  }
}

function fmt(n) { return '$' + parseFloat(n).toFixed(2); }

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();

  const cartTrigger = document.querySelector('.nav-cart');
  const backdrop    = document.querySelector('.cart-backdrop');
  const closeBtn    = document.querySelector('.cart-close');

  if (cartTrigger) cartTrigger.addEventListener('click', openCart);
  if (backdrop)    backdrop.addEventListener('click', closeCart);
  if (closeBtn)    closeBtn.addEventListener('click', closeCart);

  // Wire checkout & clear-cart buttons — they live in the DOM from layout.js
  // (display:none doesn't stop getElementById from finding them)
  const checkoutBtn  = document.getElementById('checkout-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeCart();
      window.location.href = 'checkout.html';
    });
  }
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      localStorage.removeItem(CART_KEY);
      updateCartBadge([]);
      renderCartPanel();
      showToast('Cart cleared!');
    });
  }
});
