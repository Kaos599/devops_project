// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    const body = document.body;
    body.setAttribute('data-theme', 
        body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
});

// Mock Real-Time Metrics
function updateMetrics() {
    document.getElementById('cpu-value').textContent = 
        `${Math.floor(Math.random() * 100)}% Usage`;
    document.getElementById('memory-value').textContent = 
        `${Math.floor(Math.random() * 64)} GB / 128 GB`;
}

// Initialize Charts
const cpuCtx = document.getElementById('cpuChart').getContext('2d');
new Chart(cpuCtx, {
    type: 'line',
    data: {
        labels: ['1m', '5m', '15m'],
        datasets: [{
            label: 'CPU Load',
            data: [0.2, 0.5, 0.3],
            borderColor: '#4CAF50',
        }]
    }
});

// Simulate live updates
setInterval(updateMetrics, 2000);