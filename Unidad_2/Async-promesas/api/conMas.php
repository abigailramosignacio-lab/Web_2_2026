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
            $stmt = $conn->prepare("SELECT * FROM mascotas WHERE id=?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $mascota = $result->fetch_assoc();
            echo json_encode($mascota);
        } else {
            $result = $conn->query("SELECT * FROM mascotas");
            $mascotas = [];
            while ($row = $result->fetch_assoc()) {
                $mascotas[] = $row;
            }
            echo json_encode($mascotas);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input["id"] ?? uniqid();
        $nombre = $input["nombre"];
        $raza = $input["raza"];
        $edad = $input["edad"];
        $peso = $input["peso"];
        $duenold = $input["duenold"];
        $stmt = $conn->prepare("INSERT INTO mascotas (id, nombre, raza, edad, peso, duenold) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $id, $nombre, $raza, $edad, $peso, $duenold);
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
        $raza = $input['raza'] ?? null;
        $edad = $input['edad'] ?? null;
        $peso = $input['peso'] ?? null;
        $duenold = $input['duenold'] ?? null;
        if ($id && $nombre && $raza && $edad && $peso && $duenold) {
            $stmt = $conn->prepare("UPDATE mascotas SET nombre=?, raza=?, edad=?, peso=?, duenold=? WHERE id=?");
            $stmt->bind_param("ssssss", $nombre, $raza, $edad, $peso, $duenold, $id);
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Actualizado exitosamente", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
        }
        break;

    case 'DELETE':
        $id = $_GET["id"] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            break;
        }
        $stmt = $conn->prepare("DELETE FROM mascotas WHERE id=?");
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