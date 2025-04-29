<?php

Flight::route('GET /users', function() {
    Flight::json(Flight::userService()->getAllUsers());
});

Flight::route('GET /users/@id', function($id) {
    Flight::json(Flight::userService()->getUserById($id));
});

Flight::route('POST /users/register', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->registerUser($data));
});

Flight::route('POST /users/login', function() {
    $data = Flight::request()->data->getData();
    $user = Flight::userService()->loginUser($data['email'], $data['password']);
    Flight::json($user);
});

Flight::route('PUT /users/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->updateUser($id, $data));
});

Flight::route('DELETE /users/@id', function($id) {
    Flight::json(Flight::userService()->deleteUser($id));
});

?>
