document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Création du graphique Chart.js
    const myChart = new Chart(ctx, {
        type: 'line', // Vous pouvez changer en 'bar', 'pie', etc.
        data: {
            labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Avis laissés par année',
                data: [1200, 1350, 1500, 1700, 1900, 2100, 2300],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Met à jour les données du graphique en fonction de la période sélectionnée
    document.getElementById('statsPeriod').addEventListener('change', function () {
        const period = this.value;
        const data = getDataForPeriod(period);
        myChart.data.labels = data.labels;
        myChart.data.datasets[0].data = data.values;
        myChart.update();
    });

    function getDataForPeriod(period) {
        // Exemple de données pour chaque période
        const data = {
            daily: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                values: [5, 6, 7, 8, 9, 10, 11]
            },
            weekly: {
                labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4', 'Semaine 5'],
                values: [35, 40, 45, 50, 55]
            },
            monthly: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                values: [150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260]
            },
            yearly: {
                labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                values: [1200, 1350, 1500, 1700, 1900, 2100, 2300]
            }
        };

        return data[period];
    }
});
