<?php
// Получение данных из POST запроса
$sourceAccount = $_POST['source_account'];
$destinationAccount = $_POST['destination_account'];
$amount = $_POST['amount'];

// Подключение к базе данных
$host = 'localhost';
$username = 'root';
$password = 'mysql';
$database = 'banking_system';
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Ошибка подключения к базе данных: " . $conn->connect_error);
}

// Выполнение транзакции
$sql = "UPDATE accounts SET balance = balance - $amount WHERE account_number = $sourceAccount;
        UPDATE accounts SET balance = balance + $amount WHERE account_number = $destinationAccount;";
if ($conn->multi_query($sql) === TRUE) {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false, "error" => $conn->error));
}
$conn->close();
?>
