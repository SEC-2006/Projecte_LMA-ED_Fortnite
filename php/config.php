<?php

//Connectar a la BD
$connexioBD = mysqli_connect("localhost", "samuel", "", "Projecte_LMA_ED");

if(!$connexioBD) {
	die("Connexió fallida: " . mysqli_error($connexioBD));
}