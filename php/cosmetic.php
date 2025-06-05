<?php

class cosmetic {
    public $id;
    public $nom;
    public $tipus;

    public function __construct($id, $nom = '', $tipus = '') {
        $this->id = $id;
        $this->nom = $nom;
        $this->tipus = $tipus;
    }

    

}