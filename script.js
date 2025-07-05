// Chart.js: mock AAPL stock data
const ctx = document.getElementById('stockChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'AAPL',
      data: [191.5, 193.0, 194.2, 195.1, 195.12],
      borderColor: '#4f46e5',
      tension: 0.3,
      fill: false,
    }]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: false } }
  }
});

// Constants
const stockPrice = 195.12;
let tradeMode = 'buy';

// DOM Elements
const form = document.getElementById('trade-form');
const sharesInput = document.getElementById('shares-input');
const estTotal = document.getElementById('estimated-total');
const portfolioValueDisplay = document.getElementById('portfolio-value');
const buyTab = document.getElementById('buy-tab');
const sellTab = document.getElementById('sell-tab');
const submitBtn = document.getElementById('submit-btn');

// Helpers
function formatCurrency(amount) {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function getPortfolioValue() {
  return parseFloat(portfolioValueDisplay.textContent.replace(/[$,]/g, ''));
}

function updateEstimate() {
  const shares = parseInt(sharesInput.value) || 0;
  estTotal.textContent = formatCurrency(shares * stockPrice);
}

// Switch mode
buyTab.addEventListener('click', () => {
  tradeMode = 'buy';
  buyTab.classList.add('active');
  sellTab.classList.remove('active');
  submitBtn.textContent = 'Buy';
  submitBtn.classList.add('buy-btn');
  submitBtn.classList.remove('sell-btn');
});

sellTab.addEventListener('click', () => {
  tradeMode = 'sell';
  sellTab.classList.add('active');
  buyTab.classList.remove('active');
  submitBtn.textContent = 'Sell';
  submitBtn.classList.remove('buy-btn');
  submitBtn.classList.add('sell-btn');
});

// Estimate update
sharesInput.addEventListener('input', updateEstimate);
updateEstimate();

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const shares = parseInt(sharesInput.value) || 0;
  const total = shares * stockPrice;
  let portfolioValue = getPortfolioValue();

  if (tradeMode === 'buy') {
    portfolioValue += total;
    alert(`Bought ${shares} AAPL for ${formatCurrency(total)}!`);
  } else {
    if (total > portfolioValue) {
      alert("You can't sell more than you own!");
      return;
    }
    portfolioValue -= total;
    alert(`Sold ${shares} AAPL for ${formatCurrency(total)}!`);
  }

  portfolioValueDisplay.textContent = formatCurrency(portfolioValue);
  form.reset();
  updateEstimate();
});
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const shares = parseInt(sharesInput.value) || 0;
  const total = shares * stockPrice;

  // Update portfolio value (mock backend logic)
  const currentValue = parseFloat(
    portfolioValueDisplay.textContent.replace(/[$,]/g, '')
  );
  const newValue = currentValue + total;

  portfolioValueDisplay.textContent = `$${newValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

  // Reset form
  form.reset();
  estTotal.innerHTML = `$${(10 * stockPrice).toFixed(2)}`; // Default 10 shares

  alert(`Bought ${shares} AAPL shares for $${total.toFixed(2)}!`);
});
