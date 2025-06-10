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
    echo json_encode(["status" => "error", "message" => "Faltan datos de inicio de sesión."]);
    mysqli_close($connexioBD);
    exit;
}

// 2. Verificar usuari
$sqlLogin = "SELECT id, email, contrasenya, paVos FROM usuaris WHERE email = \"".$email."\";";
$stmt = mysqli_prepare($connexioBD, $sqlLogin);
mysqli_stmt_execute($stmt);
$resultLogin = mysqli_stmt_get_result($stmt);

if ($resultLogin && $row = mysqli_fetch_assoc($resultLogin)) {
    if ($password == $row['contrasenya']) {
        echo json_encode([
            "status" => "success",
            "message" => "Inicio de sesión exitoso.",
            "user" => [
                "id" => $row['id'],
                "email" => $row['email'],
                "paVos" => $row['paVos']
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Contraseña incorrecta."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Usuario no encontrado."]);
}

mysqli_close($connexioBD);