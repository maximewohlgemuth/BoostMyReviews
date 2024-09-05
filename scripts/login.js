document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    // Validation simple (remplacez par une validation réelle)
    if (role === 'admin' && username === 'admin1' && password === 'pass2') {
        window.location.href = 'admin.html';
    } else if (role === 'employee' && username === 'emp1' && password === 'pass1') {
        window.location.href = 'employee.html';
    } else {
        loginMessage.textContent = 'Identifiant ou mot de passe incorrect.';
        loginMessage.style.display = 'block';
    }
});
