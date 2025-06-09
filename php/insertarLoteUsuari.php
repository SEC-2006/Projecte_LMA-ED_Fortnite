<?php
header('Content-Type: application/json');

$connexioBD = mysqli_connect("localhost", "samuel", "", "Projecte_LMA_ED");
if (!$connexioBD) {
    die(json_encode(["status" => "error", "message" => "Connexió fallida: " . mysqli_connect_error()]));
}

// Recollir dades
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar les dades
if (!isset($data['idUsuari']) || !isset($data['idLote'])) {
    echo json_encode(["status" => "error", "message" => "Dades incompletes."]);
    mysqli_close($connexioBD);
    exit;
}

$idUsuari = $data['idUsuari'];
$idLote = $data['idLote'];

// Insertar el loteUsuari
$sqlInsert = "INSERT INTO lotesUsuari (idUsuari, idLote) VALUES (?, ?)";
$stmt = mysqli_prepare($connexioBD, $sqlInsert);
if ($stmt) {
    mysqli_stmt_bind_param($stmt, "ii", $idUsuari, $idLote);
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(["status" => "success", "message" => "Lote insertat correctament."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al insertar el lote: " . mysqli_error($connexioBD)]);
    }
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["status" => "error", "message" => "Error al preparar la consulta: " . mysqli_error($connexioBD)]);
}

mysqli_close($connexioBD);