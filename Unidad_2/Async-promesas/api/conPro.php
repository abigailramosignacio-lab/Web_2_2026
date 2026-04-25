<?php
// 1. Configuración de errores (desactivados para que no rompan el JSON)
error_reporting(0);
ini_set('display_errors', 0);

// 2. Cabeceras de seguridad y CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// 3. Manejo del método OPTIONS (Preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 4. Conexión directa a la base de datos
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "doguito_petshop";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $id = $_GET["id"] ?? null;
        if ($id) {
            // Obtener un solo producto por ID
            $stmt = $conn->prepare("SELECT * FROM producto WHERE id=?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $producto = $result->fetch_assoc();
            echo json_encode($producto);
        } else {
            // Listar todos los productos
            $result = $conn->query("SELECT * FROM producto");
            $productos = [];
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            echo json_encode($productos);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        
        // Generar ID único (ya que en tu DB es varchar y no autoincremental)
        $id = uniqid(); 
        $nombre = $input["nombre"];
        $precio = $input["precio"];

        if (!empty($nombre) && !empty($precio)) {
            $stmt = $conn->prepare("INSERT INTO producto (id, nombre, precio) VALUES (?, ?, ?)");
            // "ssd" -> string para id, string para nombre, double para precio
            $stmt->bind_param("ssd", $id, $nombre, $precio);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Producto creado", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "No se pudo insertar: " . $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $_GET['id'] ?? null;
        $nombre = $input['nombre'] ?? null;
        $precio = $input['precio'] ?? null;

        if ($id && $nombre && $precio) {
            $stmt = $conn->prepare("UPDATE producto SET nombre=?, precio=? WHERE id=?");
            $stmt->bind_param("sds", $nombre, $precio, $id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Actualizado con éxito"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos para actualizar"]);
        }
        break;

    case 'DELETE':
        $id = $_GET["id"] ?? null;
        if ($id) {
            $stmt = $conn->prepare("DELETE FROM producto WHERE id=?");
            $stmt->bind_param("s", $id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Eliminado correctamente"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

$conn->close();
?>