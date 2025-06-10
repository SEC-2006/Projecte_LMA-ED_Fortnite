<?php
$paVos = $_GET['paVos'];
$idUsuario = $_GET['idUsuari'];

$connexioBD = mysqli_connect("localhost", "samuel", "", "Projecte_LMA_ED");
if (!$connexioBD) {
    die(json_encode(["status" => "error", "message" => "Connexió fallida: " . mysqli_connect_error()]));
}

// Actualizar el campo paVos del usuario
$sqlUpdate = "UPDATE usuaris SET paVos = ? WHERE id = ?";
$stmt = mysqli_prepare($connexioBD, $sqlUpdate);
mysqli_stmt_bind_param($stmt, "ii", $paVos, $idUsuario);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["status" => "success", "message" => "paVos actualizado correctamente."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al actualizar paVos."]);
}

mysqli_stmt_close($stmt);
mysqli_close($connexioBD);