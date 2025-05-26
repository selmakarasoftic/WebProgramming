<?php

/**
 * @OA\Get(
 *     path="/users",
 *     summary="Get all users (admin only)",
 *     security={{"ApiKey": {}}},
 *     tags={"Users"},
 *     @OA\Response(response=200, description="List of users")
 * )
 */
Flight::route('GET /users', function () {
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN]);

    Flight::json(Flight::userService()->getAllUsers());
});

/**
 * @OA\Get(
 *     path="/users/{id}",
 *     summary="Get a user by ID",
 *     security={{"ApiKey": {}}},
 *     tags={"Users"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="User info")
 * )
 */
Flight::route('GET /users/@id', function ($id) {
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN]);
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
    
    // Validate request data
    Flight::validation_middleware()->validateRegistration($data);
    
    $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
    $success = Flight::userService()->registerUser($data);

    Flight::json([
        "success" => $success,
        "message" => $success ? "User registered successfully" : "Registration failed"
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
    
    // Validate request data
    Flight::validation_middleware()->validateLogin($data);
    
    try {
        $user = Flight::userService()->loginUser($data['email'], $data['password']);
        Flight::json([
            "success" => true,
            "user" => $user,
            "message" => "Login successful"
        ]);
    } catch (Exception $e) {
        Flight::json([
            "success" => false,
            "message" => $e->getMessage()
        ], 401);
    }
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
        "message" => $rows > 0 ? "User updated successfully" : "No user updated"
    ]);
});

/**
 * @OA\Delete(
 *     path="/users/{id}",
 *     summary="Delete a user",
 *     security={{"ApiKey": {}}},
 *     tags={"Users"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="User deleted")
 * )
 */
Flight::route('DELETE /users/@id', function ($id) {
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN]);
    $rows = Flight::userService()->deleteUser($id);

    Flight::json([
        "success" => $rows > 0,
        "message" => $rows > 0 ? "User deleted successfully" : "No user deleted"
    ]);
});
