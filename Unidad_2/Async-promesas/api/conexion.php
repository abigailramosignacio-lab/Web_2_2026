<?php
error_reporting(0);
ini_set('display_errors', 0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "doguito_petshop";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Conexión mala: " . $conn->connect_error]));
}
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $id = $_GET["id"] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM clientes WHERE id=?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $cliente = $result->fetch_assoc();
            echo json_encode($cliente);
        } else {
            $result = $conn->query("SELECT * FROM clientes");
            $clientes = [];
            while ($row = $result->fetch_assoc()) {
                $clientes[] = $row;
            }
            echo json_encode($clientes);
        }
        break;
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input["id"] ?? uniqid();
        $nombre = $input["nombre"];
        $email = $input["email"];
        $stmt = $conn->prepare("INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $id, $nombre, $email);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Creado exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        break;
    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $_GET['id'] ?? null;
        $nombre = $input['nombre'] ?? null;
        $email = $input['email'] ?? null;

        if ($id && $nombre && $email) {
            $stmt = $conn->prepare("UPDATE clientes SET nombre=?, email=? WHERE id=?");
            $stmt->bind_param("sss", $nombre, $email, $id);
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Actualizado exitosamente", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos", "debug" => ["id" => $id, "nombre" => $nombre, "email" => $email]]);
        }
        break;
    case 'DELETE':
        $id = $_GET["id"] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            break;
        }
        $stmt = $conn->prepare("DELETE FROM clientes WHERE id=?");
        $stmt->bind_param("s", $id);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Eliminado exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
$conn->close();
?>