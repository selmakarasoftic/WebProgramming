<?php

/**
 * @OA\Get(
 *     path="/cars",
 *     summary="Get all cars",
 *     security={{"ApiKey": {}}},
 *     tags={"Cars"},
 *     @OA\Response(
 *         response=200,
 *         description="List of cars"
 *     )
 * )
 */

Flight::route('GET /cars', function () {
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN, Roles::GUEST]);
    Flight::json(Flight::carService()->getAllCars());
});

/**
 * @OA\Get(
 *     path="/cars/{id}",
 *     summary="Get a car by ID",
 *     security={{"ApiKey": {}}},
 *     tags={"Cars"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Car details"
 *     )
 * )
 */
Flight::route('GET /cars/@id', function ($id) {
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN, Roles::GUEST]);
    Flight::json(Flight::carService()->getCarById($id));
});

/**
 * @OA\Post(
 *     path="/cars",
 *     summary="Add a new car",
 *     security={{"ApiKey": {}}},
 *     tags={"Cars"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "model", "year", "engine", "horsepower", "image_url"},
 *             @OA\Property(property="user_id", type="integer"),
 *             @OA\Property(property="model", type="string"),
 *             @OA\Property(property="year", type="integer"),
 *             @OA\Property(property="engine", type="string"),
 *             @OA\Property(property="horsepower", type="integer"),
 *             @OA\Property(property="image_url", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Car added")
 * )
 */
Flight::route('POST /cars', function () {
    $data = Flight::request()->data->getData();
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN, Roles::GUEST]);
    Flight::json([
        "success" => Flight::carService()->createCar($data),
        "message" => "Car created successfully"
    ]);
});

/**
 * @OA\Put(
 *     path="/cars/{id}",
 *     summary="Update a car",
 *     security={{"ApiKey": {}}},
 *     tags={"Cars"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="model", type="string"),
 *             @OA\Property(property="year", type="integer"),
 *             @OA\Property(property="engine", type="string"),
 *             @OA\Property(property="horsepower", type="integer"),
 *             @OA\Property(property="image_url", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Car updated")
 * )
 */
Flight::route('PUT /cars/@id', function ($id) {
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN, Roles::GUEST]);
    $data = Flight::request()->data->getData();
    $rows = Flight::carService()->updateCar($id, $data);

    Flight::json([
        "success" => $rows > 0,
        "updated_id" => $id,
        "message" => $rows > 0 ? "Car updated successfully" : "No car updated (check ID)"
    ]);
});

/**
 * @OA\Delete(
 *     path="/cars/{id}",
 *     summary="Delete a car",
 *     security={{"ApiKey": {}}},
 *     tags={"Cars"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(response=200, description="Car deleted")
 * )
 */
Flight::route('DELETE /cars/@id', function ($id) {
    $rows = Flight::carService()->deleteCar($id);
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN]);


    Flight::json([
        "success" => $rows > 0,
        "deleted_id" => $id,
        "message" => $rows > 0 ? "Car deleted successfully" : "No car deleted (check ID)"
    ]);
});
