document.addEventListener('DOMContentLoaded', function () {
    const employeeStatsTable = document.getElementById('employeeStatsTable');

    // Initialiser le sélecteur de dates avec flatpickr
    flatpickr("#dateRange", {
        mode: "range",
        dateFormat: "Y-m-d"
    });

    // Événement au clic sur le bouton Appliquer
    document.getElementById('applyDateRangeBtn').addEventListener('click', function () {
        const dateRange = document.getElementById('dateRange').value;
        if (dateRange) {
            const dates = dateRange.split(" to ");
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[1]);
            updateEmployeeStats(startDate, endDate);
        }
    });

    // Générer les statistiques pour 25 employés par défaut (sur une année)
    updateEmployeeStats();

    function updateEmployeeStats(startDate = new Date('2023-01-01'), endDate = new Date('2023-12-31')) {
        employeeStatsTable.innerHTML = ''; // Réinitialiser la table

        for (let i = 1; i <= 25; i++) {
            const employeeData = getEmployeeData(i, startDate, endDate);
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>Employé ${i}</td>
                <td>${employeeData.daily}</td>
                <td>${employeeData.weekly}</td>
                <td>${employeeData.monthly}</td>
                <td>${employeeData.yearly}</td>
            `;

            employeeStatsTable.appendChild(row);
        }
    }

    function getEmployeeData(employeeId, startDate, endDate) {
        // Calcul de la durée en jours entre startDate et endDate
        const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

        // Génération de données fictives basées sur la durée
        const daily = Math.floor(Math.random() * 10) + 5; // Entre 5 et 15 avis par jour
        const totalReviews = daily * days;
        const weekly = Math.floor(totalReviews / 7);
        const monthly = Math.floor(totalReviews / 30);
        const yearly = totalReviews; // Total pour la période sélectionnée

        return {
            daily: daily,
            weekly: weekly,
            monthly: monthly,
            yearly: yearly
        };
    }
});
