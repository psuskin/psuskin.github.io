let data = {
    "Weight": [
        {
            "month": "January",
            "value": 80
        },
        {
            "month": "February",
            "value": 81
        },
    ],
    "Height": [
        {
            "month": "January",
            "value": 90
        },
        {
            "month": "February",
            "value": 90
        },
    ],
    "Strength": [
        {
            "month": "January",
            "value": 80
        },
        {
            "month": "February",
            "value": 81
        },
    ],
    "Endurance": [
        {
            "month": "January",
            "value": 60
        },
        {
            "month": "February",
            "value": 65
        },
    ],
    "Wealth": [
        {
            "month": "January",
            "value": 70
        },
        {
            "month": "February",
            "value": 71
        },
    ],
    "Charisma": [
        {
            "month": "January",
            "value": 1
        },
        {
            "month": "February",
            "value": 2
        },
    ],
}

let explanations = {
    "Weight": "This stat tracks your weight over time.",
    "Height": "This stat tracks your height over time.",
    "Strength": "This stat tracks your strength over time.",
    "Endurance": "This stat tracks your endurance over time.",
    "Wealth": "This stat tracks your wealth over time.",
    "Charisma": "This stat tracks your charisma over time."
}

function getColor(value) {
    const hue = (value * 1.2).toString(10); // Scale hue from 0 to 120 (red to green)
    return `hsl(${hue}, 80%, 45%)`;
}

// Get the latest data for each status
let stats = Object.keys(data).map(key => {
    return {
        status: key,
        quantity: data[key][data[key].length - 1].value
    };
});

// Output Each Info Cards 
var cardContainer = $("#infoCardContainer");
stats.forEach(card => {
    var block = `
    <div class="col-6 col-lg-3">
        <div class="card stats-card text-center pt-4" data-status="${card.status}">
            <div class="card-inner">
                <div class="card-front">
                    <p class="text-gray-300 fs-19 mb-1">${card.status}</p>
                    <p class="fw-bold fs-1" style="color: ${getColor(card.quantity)}">${card.quantity}</p>
                </div>
                <div class="card-back">
                    <p class="fs-19 mb-1">${card.status}</p>
                    <p class="fs-6">${explanations[card.status]}</p>
                </div>
            </div>
        </div>
    </div>
    `
    $(cardContainer).append(block);
});

// Handle card click event to flip the card
$(document).on('click', '.stats-card', function() {
    $(this).toggleClass('flipped');
});

// Prepare data for the chart
let labels = data["Weight"].map(item => item.month);
let datasets = Object.keys(data).map((key, index) => {
    let colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return {
        label: key,
        data: data[key].map(item => item.value),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length] + '33', // Add transparency
        tension: 0.4 // Smooth the lines
    };
});

// Create the chart
var ctx = document.getElementById('statsChart').getContext('2d');
var statsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: datasets
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month'
                },
                grid: {
                    display: false
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                },
                min: 0,
                max: 100,
                ticks: {
                    beginAtZero: true
                },
                grid: {
                    color: '#e0e0e0'
                }
            }
        }
    }
});

window.addEventListener('resize', function() {
    statsChart.resize();
});