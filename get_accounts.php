<?php
// Подключение к базе данных
$host = 'localhost';
$username = 'root';
$password = 'mysql';
$database = 'banking_system';
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Ошибка подключения к базе данных: " . $conn->connect_error);
}

// Запрос на получение списка счетов
$sql = "SELECT * FROM accounts";
$result = $conn->query($sql);

// Проверка наличия результатов и формирование массива данных
if ($result->num_rows > 0) {
    $accounts = array();
    while ($row = $result->fetch_assoc()) {
        $accounts[] = $row;
    }
    // Вывод данных в формате JSON
    header('Content-Type: application/json');
    echo json_encode($accounts);
} else {
    echo "Нет доступных счетов";
}
$conn->close();
?>
