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


async function getBalance() {
    const token = localStorage.getItem('jwtToken');

    try {
        const response = await fetch('https://localhost:7218/rest/v1/lender/GetBalance', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
            displayBalance(result.data.balance); 
        } else {
            alert(result.message || 'Failed to fetch balance');
        }
    } catch (error) {
        console.log(error);
        alert('Gagal: ' + error.message);
    }
}


function displayBalance(balance) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <p>Your current balance is: <strong>${balance}</strong></p>
        <input type="number" id="newBalance" placeholder="Enter new balance" />
        <button id="updateBalanceButton" class="btn btn-primary">Update Balance</button>
    `;

    $('#balanceModal').modal('show'); 

    document.getElementById('updateBalanceButton').addEventListener('click', async function () {
        const newBalance = document.getElementById('newBalance').value;
        await updateBalance(newBalance);
    });
}

async function updateBalance(newBalance) {
    const token = localStorage.getItem('jwtToken');

    try {
        const response = await fetch('https://localhost:7218/rest/v1/lender/UpdateBalance', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ balance: newBalance }) 
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
            alert('Balance updated successfully!');
            $('#balanceModal').modal('hide'); 
        } else {
            alert(result.message || 'Failed to update balance');
        }
    } catch (error) {
        console.log(error);
        alert('Gagal: ' + error.message);
    }
}

