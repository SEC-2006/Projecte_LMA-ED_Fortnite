<?php

class loteTenda {
    public $id;
    public $preu;
    public $nom;
    public $cosmetics = [];

    public function __construct($id, $preu = 0, $nom = '', $cosmetics = []) {
        $this->id = $id;
        $this->preu = $preu;
        $this->nom = $nom;
        $this->cosmetics = $cosmetics;
    }

    
}