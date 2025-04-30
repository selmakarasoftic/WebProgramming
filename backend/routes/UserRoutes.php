<?php

/**
 * @OA\Get(
 *     path="/users",
 *     summary="Get all users (admin only)",
 *     tags={"Users"},
 *     @OA\Response(response=200, description="List of users")
 * )
 */
Flight::route('GET /users', function () {
    Flight::json(Flight::userService()->getAllUsers());
});

/**
 * @OA\Get(
 *     path="/users/{id}",
 *     summary="Get a user by ID",
 *     tags={"Users"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="User info")
 * )
 */
Flight::route('GET /users/@id', function ($id) {
    Flight::json(Flight::userService()->getUserById($id));
});

/**
 * @OA\Post(
 *     path="/register",
 *     summary="Register a new user",
 *     tags={"Users"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"username", "email", "password"},
 *             @OA\Property(property="username", type="string"),
 *             @OA\Property(property="email", type="string"),
 *             @OA\Property(property="password", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="User registered")
 * )
 */
Flight::route('POST /register', function () {
    $data = Flight::request()->data->getData();
    Flight::json([
        "success" => Flight::userService()->registerUser($data),
        "message" => "User registered"
    ]);
});

/**
 * @OA\Post(
 *     path="/login",
 *     summary="Login a user",
 *     tags={"Users"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email", "password"},
 *             @OA\Property(property="email", type="string"),
 *             @OA\Property(property="password", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Login response")
 * )
 */
Flight::route('POST /login', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->getUserByEmail($data['email']));
});

/**
 * @OA\Put(
 *     path="/users/{id}",
 *     summary="Update a user",
 *     tags={"Users"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="username", type="string"),
 *             @OA\Property(property="email", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="User updated")
 * )
 */
Flight::route('PUT /users/@id', function ($id) {
    $data = Flight::request()->data->getData();
    $rows = Flight::userService()->updateUser($id, $data);

    Flight::json([
        "success" => $rows > 0,
        "message" => $rows > 0 ? "User updated" : "No user updated"
    ]);
});

/**
 * @OA\Delete(
 *     path="/users/{id}",
 *     summary="Delete a user",
 *     tags={"Users"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="User deleted")
 * )
 */
Flight::route('DELETE /users/@id', function ($id) {
    $rows = Flight::userService()->deleteUser($id);

    Flight::json([
        "success" => $rows > 0,
        "message" => $rows > 0 ? "User deleted" : "No user deleted"
    ]);
});

?>
