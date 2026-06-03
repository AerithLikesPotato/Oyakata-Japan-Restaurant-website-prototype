
// ── Site-wide dismissible alert banner ──
function renderAlert() {
  return `
  <div class="site-alert promo" id="site-alert" role="alert">
    <span>🎉 Use code <strong>WELCOME10</strong> at checkout for 10% off your first order! · Free delivery on orders over $30</span>
    <button class="site-alert-close" onclick="document.getElementById('site-alert').style.display='none'" aria-label="Dismiss">✕</button>
  </div>
  `;
}

function renderNav() {
  return `
  <nav class="nav">
    <div class="nav-inner">
      <a class="nav-logo" href="index.html">
        <img src="images/logo_oyakata.jpg" alt="Oyakata Logo">
        <div>
          <span class="nav-logo-text">Oyakata</span>
          <span class="nav-logo-sub">Japanese Restaurant</span>
        </div>
      </a>
      <div class="nav-links">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="menu.html">Menu</a>
        <a class="nav-link" href="index.html#about">About</a>
        <a class="nav-link" href="contact.html">Contact</a>
      </div>
      <div class="nav-search">
        <input class="nav-search-input" type="text" placeholder="Search dishes…" aria-label="Search">
        <span class="nav-search-icon"><i class="fa-solid fa-search"></i></span>
      </div>
      <a class="nav-cart" href="javascript:void(0)" aria-label="Cart">
        🛒<span class="cart-badge">0</span>
      </a>
      <button class="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-nav">
    <a class="mobile-nav-link" href="index.html">Home</a>
    <a class="mobile-nav-link" href="menu.html">Menu</a>
    <a class="mobile-nav-link" href="index.html#about">About</a>
    <a class="mobile-nav-link" href="contact.html">Contact</a>
    <a class="mobile-nav-link" href="checkout.html">Checkout</a>
  </div>
  `;
}

function renderCart() {
  return `
  <div class="cart-backdrop"></div>
  <div class="cart-panel">
    <div class="cart-header">
      <h2 class="cart-title">Your Order</h2>
      <button class="cart-close" aria-label="Close cart">✕</button>
    </div>
    <div class="cart-items"></div>
    <div class="cart-footer">
      <div class="cart-summary"></div>
      <button class="btn btn-primary btn-full" id="checkout-btn" style="padding:1rem;font-size:1rem">Proceed to Checkout →</button>
      <button class="btn btn-clear btn-full" id="clear-cart-btn" style="padding:0.55rem;font-size:0.8rem;opacity:0.75">🗑 Clear Cart</button>
    </div>
  </div>
  `;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">Oyakata</div>
          <div class="footer-jp">お山のレストラン</div>
          <p class="footer-desc">Authentic Japanese cuisine crafted with passion and tradition. Order online and experience the taste of Japan.</p>
        </div>
        <div class="footer-col">
          <h5>Explore</h5>
          <div class="footer-links">
            <a class="footer-link" href="index.html">Home</a>
            <a class="footer-link" href="menu.html">Full Menu</a>
            <a class="footer-link" href="menu.html?cat=specials">Today's Specials</a>
            <a class="footer-link" href="index.html#about">Our Story</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Help</h5>
          <div class="footer-links">
            <a class="footer-link" href="contact.html">Contact Us</a>
            <a class="footer-link" href="checkout.html">Track Order</a>
            <a class="footer-link" href="#">FAQ</a>
            <a class="footer-link" href="#">Returns</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Opening Hours</h5>
          <div class="footer-links">
            <span class="footer-link">Mon–Thu: 5:00pm – 11:00pm</span>
            <span class="footer-link">Fri–Sat: 5:00pm – 11:00pm</span>
            <span class="footer-link">Sunday: 5:00pm – 11:00pm</span>
          </div>
          <div style="margin-top:1.25rem">
            <h5 style="margin-bottom:.75rem">Follow Us</h5>
            <div style="display:flex;gap:.75rem">
                  <a class="footer-link" href="https://web.facebook.com/p/Oyakata-Japanese-Restaurant-100076183248036/?_rdc=1&_rdr#" style="font-size:1.2rem">
                    <i class="fa-brands fa-facebook"></i>
                  </a>
                  <a class="footer-link" href="#" style="font-size:1.2rem">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a class="footer-link" href="https://t.me/+85578423311" style="font-size:1.2rem">
                    <i class="fa-brands fa-telegram"></i>
                  </a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© 2026 Oyakata Japanese Restaurant. All rights reserved.</p>
        <div class="footer-payment">
          <span class="pay-icon">VISA</span>
          <span class="pay-icon">MC</span>
          <span class="pay-icon">ABA</span>
          <span class="pay-icon">ACELEDA</span>
          <span class="pay-icon" style="background:#0057b7;color:#fff">BAKONG</span>
        </div>
      </div>
    </div>
  </footer>
  `;
}
