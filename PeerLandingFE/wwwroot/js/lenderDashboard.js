document.getElementById('accountMenu').addEventListener('click', async function () {
    await fetchAccountDetails();
    await getBalance();
});

async function fetchAccountDetails() {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('jwtToken');

    try {
        const response = await fetch(`/ApiMstUser/GetUserById?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
            displayAccountDetails(result.data);
        } else {
            alert(result.message || 'Failed to fetch account details');
        }
    } catch (error) {
        console.log(error);
        alert('Gagal: ' + error.message);
    }
}

function displayAccountDetails(data) {
    const accountDetailsDiv = document.getElementById('accountDetails');
    accountDetailsDiv.innerHTML = `
        <h2>Account Details</h2>
        <table class="table table-bordered">
            <tr>
                <th>ID</th>
                <td>${data.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>${data.name}</td>
            </tr>
            <tr>
                <th>Role</th>
                <td>${data.role}</td>
            </tr>
            <tr>
                <th>Balance</th>
                <td>${data.balance}</td>
            </tr>
        </table>
    `;
}

document.getElementById('getBalanceButton').addEventListener('click', async function () {
    await getBalance(); 
});

function getUserId() {
    return localStorage.getItem('userId');
}

function getToken() {
    return localStorage.getItem('jwtToken');
}

async function getBalance() {
    try {
        const response = await fetch(`/ApiLender/GetBalance?id=${getUserId()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        console.log(result.data.balance);
        if (result.success) {
            displayBalance(result.data.balance);
        } else {
            alert(result.message || 'Failed to fetch balance');
        }
    } catch (error) {
        console.log(error);
        alert('Error: ' + error.message);
    }
}

function displayBalance(balance) {
    $("#balanceModal").modal('show');
    const balanceDiv = document.getElementById('balance');
    balanceDiv.innerHTML = `<p>Your current balance: ${balance}</p>`;
}

async function updateBalance(newBalance) {
    const token = localStorage.getItem('jwtToken');

    try {
        const response = await fetch(`/ApiLender/UpdateBalance?Id=${getUserId()}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Balance: newBalance })
        });

        const result = await response.json();
        if (result.success) {
            alert(result.message);
            getBalance(); // Refresh balance after update
        } else {
            alert(result.message || 'Failed to update balance');
        }
    } catch (error) {
        console.log(error);
        alert('Error: ' + error.message);
    }
}

document.getElementById('getBalanceButton').addEventListener('click', getBalance);
document.getElementById('updateBalanceButton').addEventListener('click', function () {
    const newBalance = prompt('Enter new balance:');
    updateBalance(newBalance);
});
