// Chart.js: mock AAPL stock data
const ctx = document.getElementById('stockChart').getContext('2d');
const stockChart = new Chart(ctx, {
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
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

// Buy Form Logic
const form = document.getElementById('trade-form');
const sharesInput = document.getElementById('shares-input');
const estTotal = document.getElementById('estimated-total');
const portfolioValueDisplay = document.getElementById('portfolio-value');

// Constant price for AAPL (mock)
const stockPrice = 195.12;

sharesInput.addEventListener('input', () => {
  const shares = parseInt(sharesInput.value) || 0;
  estTotal.innerHTML = `$${(shares * stockPrice).toFixed(2)}`;
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
