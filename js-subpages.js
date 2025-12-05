//background fade out
document.addEventListener('DOMContentLoaded', function() {
    const homeMedia = document.querySelector('.home-media');
    const scrollThreshold = 400;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            homeMedia.classList.add('darken');
        } else {
            homeMedia.classList.remove('darken');
        }
    });
});

//js animation tutprials: 
//https://www.youtube.com/watch?v=Jo8ABAJtMM0
//https://www.youtube.com/watch?v=adqwnu3gs2k <<dif btw addEventListener & IntersectionObserver


document.addEventListener('DOMContentLoaded', function() {
    // select all elements with the class .box
    const boxes = document.querySelectorAll('.box');
    const observerOptions = {
        threshold: 0.05 // triggers when 10% of the element visible
    };

    //a function that observe anything that comes into view port
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {// if the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // stop observing the element after its visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // tell the observer function to watch each box
    boxes.forEach(box => {
        observer.observe(box);
        console.log("box is-visivible");
    });
});

  const chibi_img = document.querySelector('.cast-chibi-img');
  if (chibi_img) {
    const original = chibi_img.src;
    const hover = chibi_img.dataset.hover;
    chibi_img.addEventListener('mouseenter', () => { chibi_img.src = hover; });
    chibi_img.addEventListener('mouseleave', () => { chibi_img.src = original; });
  }


// Store page
// tutorials: 
// https://www.youtube.com/watch?v=YeFzkC2awTM&pp=ygUYamF2YXNjcmlwdCBzaG9wcGluZyBjYXJ0
// https://www.youtube.com/watch?v=gXWohFYrI0M&pp=ygUYamF2YXNjcmlwdCBzaG9wcGluZyBjYXJ0
document.addEventListener('DOMContentLoaded', () => {
  //only run on store page where these elements exist
  const productCards = document.querySelectorAll('.product-card');
  const cartPanel = document.querySelector('.cart-panel');
  if (!productCards.length || !cartPanel) return;

  // references & in-memory cart
  const cart = {};
  const cartList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const emptyState = document.querySelector('.cart-empty');
  const checkoutBtn = document.querySelector('.checkout-btn');

  // format numbers as currency text 
  const formatCurrency = (value) => '€' + value.toFixed(2);

  // add the cart list ui 
  const renderCart = () => {
    cartList.innerHTML = '';
    const items = Object.values(cart);
    if (!items.length) {
      emptyState.style.display = 'block'; // show empty state
      cartTotal.textContent = '€0.00';    // reset total
      return;
    }
    emptyState.style.display = 'none';
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.qty;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.dataset.id = item.id;
      const itemName = item.name;
      const itemPrice = formatCurrency(item.price);
      li.innerHTML =
        '<div>' +
          '<div class="name">' + itemName + '</div>' +
          '<div class="cart-price">' + itemPrice + ' each</div>' +
        '</div>' +
        '<div class="cart-actions">' +
          '<button type="button" data-action="decrease" aria-label="Decrease quantity for ' + itemName + '">-</button>' +
          '<span>' + item.qty + '</span>' +
          '<button type="button" data-action="increase" aria-label="Increase quantity for ' + itemName + '">+</button>' +
          '<button type="button" data-action="remove" aria-label="Remove ' + itemName + ' from cart">x</button>' +
        '</div>';
      cartList.appendChild(li);
    });
    cartTotal.textContent = formatCurrency(total);
  };

  // +/- inline quantity controls for each product card
  const setupQuantityControls = (wrapper) => {
    const input = wrapper.querySelector('.qty-input');
    wrapper.addEventListener('click', (event) => {
      const action = event.target.dataset.action;
      if (!action) return;
      let value = parseInt(input.value, 10);
      if (Number.isNaN(value) || value < 1) value = 1;
      if (action === 'increase') {
        value += 1;
      } else {
        value = Math.max(1, value - 1);
      }
      input.value = value;
    });
  };

  // add each product card (add to cart)
  productCards.forEach((card) => {
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const qtyWrapper = card.querySelector('.quantity-row');
    const qtyInput = card.querySelector('.qty-input');
    const addBtn = card.querySelector('.add-to-cart');

    setupQuantityControls(qtyWrapper);

    addBtn.addEventListener('click', () => {
      const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      if (!cart[id]) cart[id] = { id, name, price, qty: 0 };
      cart[id].qty += qty;
      qtyInput.value = 1;
      renderCart();
    });
  });

  // actions - increase, decrease, remove
  cartList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    const li = button.closest('.cart-item');
    if (!li) return;
    const id = li.dataset.id;
    if (!id || !cart[id]) return;
    if (action === 'increase') cart[id].qty += 1;
    if (action === 'decrease') cart[id].qty -= 1;
    if (action === 'remove' || cart[id].qty < 1) delete cart[id];
    renderCart();
  });

  // demo checkout alert
  checkoutBtn?.addEventListener('click', () => {
    const items = Object.values(cart);
    if (!items.length) {
      alert('Your cart is empty—for now.');
      return;
    }
    alert('Demo checkout: thanks for supporting Sors Tali! We will wire this up soon.');
  });

  renderCart();
});

// calculator/cost estimator
// tutorials: https://www.youtube.com/watch?v=V7rFH6_9-70&pp=ygUaamF2YXNjcmlwdCBxdW90ZSBjYWxjdWF0b3I%3D

// form fields: sessions, currency, total-amount, total-summary, and radios name="campaignType"
document.addEventListener('DOMContentLoaded', function() {
  // pricing config (base in EUR)
  const ratesEur = { short: 100, long: 80 }; // per session, EUR
  const currencyInfo = {
    eur: { symbol: '€', rate: 1, label: 'EUR', decimals: 2 },
    usd: { symbol: '$', rate: 1.09, label: 'USD', decimals: 2 }, // approx EUR -> USD
    ntd: { symbol: 'NT$', rate: 35, label: 'NTD', decimals: 0 }   // approx EUR -> NTD
  };

  //form elemens
  const sessionsInput = document.getElementById('sessions');
  const currencySelect = document.getElementById('currency');
  const campaignRadios = document.querySelectorAll('input[name="campaignType"]');
  const totalAmount = document.getElementById('total-amount');
  const totalSummary = document.getElementById('total-summary');

  // format for money strings
  function formatMoney(value, decimals, symbol) {
    return symbol + value.toFixed(decimals);
  }

  function updateTotal() {
    // to select campaign type (short / long)
    var checked = null;
    campaignRadios.forEach(function(radio) {
      if (radio.checked) checked = radio.value;
    });
    const selectedType = checked || 'short';

    // sessions 1-30
    let sessions = parseInt(sessionsInput.value, 10);
    if (Number.isNaN(sessions)) sessions = 1;
    if (sessions < 1) sessions = 1;
    if (sessions > 30) sessions = 30;
    sessionsInput.value = sessions;

    // totals in EUR then convert to selected currency
    const eurPerSession = ratesEur[selectedType];
    const eurTotal = eurPerSession * sessions;

    const currency = currencyInfo[currencySelect.value];
    const totalConverted = eurTotal * currency.rate;
    const perSessionConverted = eurPerSession * currency.rate;

    // update ui text
    totalAmount.textContent = formatMoney(totalConverted, currency.decimals, currency.symbol);
    totalSummary.textContent = currency.label + ' ' + currency.symbol + perSessionConverted.toFixed(currency.decimals) + ' per session x ' + sessions + ' session(s)';
  }

  // event wiring
  sessionsInput.addEventListener('input', updateTotal);
  currencySelect.addEventListener('change', updateTotal);
  campaignRadios.forEach(function(radio) {
    radio.addEventListener('change', updateTotal);
  });
  updateTotal();
});
