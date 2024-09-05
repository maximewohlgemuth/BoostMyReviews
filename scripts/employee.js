document.addEventListener('DOMContentLoaded', function () {
    // Initialiser le sélecteur de plage de dates
    flatpickr("#dateRange", {
        mode: "range",
        dateFormat: "Y-m-d"
    });

    // Appliquer la plage de dates pour filtrer les statistiques des employés
    document.getElementById('applyDateRangeBtn').addEventListener('click', function () {
        const dateRange = document.getElementById('dateRange').value;
        if (dateRange) {
            const dates = dateRange.split(" to ");
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[1]);
            filterEmployeeStatsByDate(startDate, endDate);
        }
    });

    // Fonction pour filtrer les statistiques des employés par date
    function filterEmployeeStatsByDate(startDate, endDate) {
        const employeeStats = getEmployeeStats(startDate, endDate);
        const employeeStatsTable = document.getElementById('employeeStatsTable').querySelector('tbody');
        employeeStatsTable.innerHTML = ''; // Réinitialiser le tableau

        employeeStats.forEach(emp => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${emp.name}</td>
                <td>${emp.qrGenerated}</td>
                <td>${emp.nfcUsed}</td>
                <td>${emp.linksClicked}</td>
                <td>
                    <button class="btn-animation btn-active" data-action="qr" onclick="toggleFeature(this)">Bloquer QR</button>
                    <button class="btn-animation btn-active" data-action="nfc" onclick="toggleFeature(this)">Bloquer NFC</button>
                    <button class="btn-animation btn-active" data-action="links" onclick="toggleFeature(this)">Bloquer Liens</button>
                </td>
            `;
            employeeStatsTable.appendChild(row);
        });
    }

    // Fonction pour simuler les statistiques des employés filtrées par date
    function getEmployeeStats(startDate, endDate) {
        const employees = [];
        for (let i = 1; i <= 25; i++) {
            employees.push({
                name: `Employé ${i}`,
                qrGenerated: Math.floor(Math.random() * 300) + 200,  // Simuler les stats en fonction de la plage de dates
                nfcUsed: Math.floor(Math.random() * 200) + 100,
                linksClicked: Math.floor(Math.random() * 400) + 150
            });
        }
        return employees;
    }

    // Fonction pour gérer l'activation/désactivation des fonctionnalités
    window.toggleFeature = function (button) {
        const isInactive = button.classList.contains('btn-inactive');
        if (isInactive) {
            button.classList.remove('btn-inactive');
            button.classList.add('btn-active');
            button.textContent = `Bloquer ${capitalizeFirstLetter(button.dataset.action)}`;
        } else {
            button.classList.remove('btn-active');
            button.classList.add('btn-inactive');
            button.textContent = `Débloquer ${capitalizeFirstLetter(button.dataset.action)}`;
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
