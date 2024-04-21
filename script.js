document.addEventListener("DOMContentLoaded", function() {
    loadAccounts();

    document.getElementById("transaction-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var sourceAccount = document.getElementById("source-account").value;
        var destinationAccount = document.getElementById("destination-account").value;
        var amount = document.getElementById("amount").value;

        performTransaction(sourceAccount, destinationAccount, amount);
    });
});

function loadAccounts() {
    fetch('get_accounts.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки счетов: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const accountsTable = document.getElementById("accounts-table");
            accountsTable.innerHTML = "";
            data.forEach(account => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${account.account_number}</td><td>${account.balance}</td>`;
                accountsTable.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка при загрузке счетов:', error));
}

function performTransaction(sourceAccount, destinationAccount, amount) {
    var formData = new FormData();
    formData.append('source_account', sourceAccount);
    formData.append('destination_account', destinationAccount);
    formData.append('amount', amount);

    fetch('perform_transaction.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка выполнения транзакции: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        alert('Транзакция успешно выполнена');
        loadAccounts(); // Обновляем список счетов после выполнения транзакции
    })
    .catch(error => console.error('Ошибка при выполнении транзакции:', error));
}
