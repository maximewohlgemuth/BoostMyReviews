document.getElementById('saveSettingsBtn').addEventListener('click', function () {
    const notificationsEnabled = document.getElementById('notificationToggle').checked;
    const rewardThreshold = document.getElementById('rewardThreshold').value;
    const nfcLimit = document.getElementById('nfcUsageLimit').value;

    alert('Paramètres enregistrés:\n' +
        'Notifications: ' + (notificationsEnabled ? 'Activées' : 'Désactivées') + '\n' +
        'Seuil de récompense: ' + rewardThreshold + ' points\n' +
        'Limite NFC: ' + nfcLimit + ' utilisations par jour');
});
