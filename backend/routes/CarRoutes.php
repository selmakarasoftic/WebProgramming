<?php

Flight::route('GET /cars', function() {
    Flight::json(Flight::carService()->getAllCars());
});

Flight::route('GET /cars/@id', function($id) {
    Flight::json(Flight::carService()->getCarById($id));
});

Flight::route('POST /cars', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::carService()->createCar($data));
});

Flight::route('PUT /cars/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::carService()->updateCar($id, $data));
});

Flight::route('DELETE /cars/@id', function($id) {
    Flight::json(Flight::carService()->deleteCar($id));
});

?>
