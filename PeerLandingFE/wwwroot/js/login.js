async function submitLogin() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/ApiLogin/Login' ,
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            const token = result.data.token;
            const role = result.data.role.toLowerCase();
            const userId = result.data.id;

            localStorage.setItem('userId', userId);
            localStorage.setItem('jwtToken', result.data.token);
            localStorage.setItem('role', role);
            window.location.href = '/Home/Index';

            if (role === "admin") {
                window.location.href = 'MstUser/Index'; 
            } else if (role === "lender") {
                window.location.href = 'Lender/Dashboard'; 
            } else if (role === "borrower") {
                window.location.href = 'Borrower/Dashboard'; 
            } else {
                alert('Unknown role. Access denied.');
            }
        } else {
            alert(result.message || 'Login Failed. Please try again');
        }

    }
    catch (error) {
        console.log(error);
        alert('Gagal:' + error.message);
    }
}