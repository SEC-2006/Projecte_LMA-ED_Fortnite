<?php

class loteTenda {
    public $id;
    public $preu;
    public $nom;
    public $cosmetics = [];
    public $usuaris = [];

    public function __construct($id, $preu = 0, $nom = '', $cosmetics = [], $usuaris = []) {
        $this->id = $id;
        $this->preu = $preu;
        $this->nom = $nom;
        $this->cosmetics = $cosmetics;
        $this->usuaris = $usuaris;
    }

    
}