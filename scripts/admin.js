document.addEventListener('DOMContentLoaded', function () {
    window.loadContent = function (page) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', page, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                document.getElementById('tabContent').innerHTML = xhr.responseText;
                initializeTab(page);
            } else {
                document.getElementById('tabContent').innerHTML = '<p>Erreur de chargement du contenu.</p>';
            }
        };
        xhr.send();
    };

    function initializeTab(page) {
        if (page === 'employees.html') {
            initializeEmployeeTab();
        } else if (page === 'statistics.html') {
            initializeStatisticsTab();
        }
    }

    function initializeEmployeeTab() {
        flatpickr("#dateRange", {
            mode: "range",
            dateFormat: "Y-m-d"
        });

        document.getElementById('applyDateRangeBtn').addEventListener('click', function () {
            const dateRange = document.getElementById('dateRange').value;
            if (dateRange) {
                const dates = dateRange.split(" to ");
                const startDate = new Date(dates[0]);
                const endDate = new Date(dates[1]);
                filterEmployeeStatsByDate(startDate, endDate);
            }
        });
    }

    function initializeStatisticsTab() {
        const ctx = document.getElementById('statsChart').getContext('2d');
        const statsChart = new Chart(ctx, {
            type: 'line',
            data: getStatsData('yearly'),
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        document.getElementById('statsPeriod').addEventListener('change', function () {
            statsChart.data = getStatsData(this.value);
            statsChart.update();
        });
    }


    loadContent('overview.html');
});