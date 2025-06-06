<?php
header('Content-Type: application/json');

$connexioBD = mysqli_connect("localhost", "samuel", "", "Projecte_LMA_ED");
if (!$connexioBD) {
    die(json_encode(["status" => "error", "message" => "Connexió fallida: " . mysqli_connect_error()]));
}

// 1. Obtenir dades
$dades = json_decode(file_get_contents('php://input'), true);
$email = isset($dades['email']) ? $dades['email'] : null;
$password = isset($dades['password']) ? $dades['password'] : null;

if (!$email || !$password) {
    echo json_encode(["status" => "error", "message" => "Faltan datos para el registro."]);
    mysqli_close($connexioBD);
    exit;
}

// 2. Verificar ya esta creat
$sqlCheckUser = "SELECT id FROM usuaris WHERE email = \"".$email."\";";
$stmtCheckUser = mysqli_prepare($connexioBD, $sqlCheckUser);
mysqli_stmt_execute($stmtCheckUser);
$resultCheckUser = mysqli_stmt_get_result($stmtCheckUser);

if ($resultCheckUser && mysqli_fetch_assoc($resultCheckUser)) {
    echo json_encode(["status" => "error", "message" => "El usuario ya está registrado."]);
    mysqli_close($connexioBD);
    exit;
}

// 3. Insertar nou
$sqlRegister = "INSERT INTO usuaris (email, contrasenya) VALUES (?, ?)";
$stmtRegister = mysqli_prepare($connexioBD, $sqlRegister);
mysqli_stmt_bind_param($stmtRegister, "ss", $email, $password);

if (mysqli_stmt_execute($stmtRegister)) {
    echo json_encode(["status" => "success", "message" => "Registro exitoso."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al registrar el usuario."]);
}

mysqli_close($connexioBD);