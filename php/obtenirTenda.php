<?php
header('Content-Type: application/json');
require_once 'cosmetic.php';
require_once 'loteTenda.php';

$connexioBD = mysqli_connect("localhost", "samuel", "", "Projecte_LMA_ED");
if(!$connexioBD) {
    die(json_encode(["status" => "error", "message" => "Connexió fallida: " . mysqli_connect_error()]));
}

// 1. Cosmetics
$sqlCosmetics = "SELECT id, nom, tipus FROM cosmetic";
$resultCosmetics = mysqli_query($connexioBD, $sqlCosmetics);
$cosmetics = [];
if ($resultCosmetics) {
    while ($row = mysqli_fetch_assoc($resultCosmetics)) {
        $cosmetics[$row['id']] = new cosmetic($row['id'], $row['nom'], $row['tipus']);
    }
}

// 2. loteTenda
$sqlLotes = "SELECT id, preu, nom FROM loteTenda";
$resultLotes = mysqli_query($connexioBD, $sqlLotes);
$lotes = [];
if ($resultLotes) {
    while ($row = mysqli_fetch_assoc($resultLotes)) {
        $lotes[$row['id']] = new loteTenda($row['id'], $row['preu'], $row['nom']);
        $lotes[$row['id']]->cosmetics = [];
        $lotes[$row['id']]->usuaris = [];
    }
}

// 3. relacions cosmetics-lote
$sqlCosmeticsLote = "SELECT idCosmetic, idLoteTenda FROM cosmeticsLote";
$resultCosmeticsLote = mysqli_query($connexioBD, $sqlCosmeticsLote);
if ($resultCosmeticsLote) {
    while ($row = mysqli_fetch_assoc($resultCosmeticsLote)) {
        $idCosmetic = $row['idCosmetic'];
        $idLoteTenda = $row['idLoteTenda'];
        if (isset($lotes[$idLoteTenda]) && isset($cosmetics[$idCosmetic])) {
            $lotes[$idLoteTenda]->cosmetics[] = $cosmetics[$idCosmetic];
        }
    }
}

// 4. relacions lotes-usuari
$sqlLotesUsuari = "SELECT idUsuari, idLote FROM lotesUsuari";
$resultLotesUsuari = mysqli_query($connexioBD, $sqlLotesUsuari);
if ($resultLotesUsuari) {
    while ($row = mysqli_fetch_assoc($resultLotesUsuari)) {
        $idUsuari = $row['idUsuari'];
        $idLote = $row['idLote'];
        if (isset($lotes[$idLote])) {
            $lotes[$idLote]->usuaris[] = $idUsuari;
        }
    }
}

// 5. resposta
echo json_encode([
    "status" => "success",
    "cosmetics" => array_values($cosmetics),
    "lotesTenda" => array_values($lotes)
]);
mysqli_close($connexioBD);