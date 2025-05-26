<?php

/**
 * @OA\Get(
 *     path="/gallery",
 *     summary="Get all gallery items",
 *     security={{"ApiKey": {}}},
 *     tags={"Gallery"},
 *     @OA\Response(
 *         response=200,
 *         description="List of gallery items"
 *     )
 * )
 */
Flight::route('GET /gallery', function () {
        Flight::auth_middleware()->authorizeRoles([Roles::ADMIN, Roles::GUEST]);

    Flight::json(Flight::galleryService()->getAllGalleryItems());
});

/**
 * @OA\Get(
 *     path="/gallery/{id}",
 *     summary="Get a gallery item by ID",
 *     security={{"ApiKey": {}}},
 *     tags={"Gallery"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the gallery item",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Gallery item found"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Gallery item not found"
 *     )
 * )
 */
Flight::route('GET /gallery/@id', function ($id) {
        Flight::auth_middleware()->authorizeRoles([Roles::ADMIN, Roles::GUEST]);

    Flight::json(Flight::galleryService()->getGalleryItemById($id));
});

/**
 * @OA\Post(
 *     path="/gallery",
 *     summary="Add a new gallery item",
 *     security={{"ApiKey": {}}},
 *     tags={"Gallery"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "title", "image_url"},
 *             @OA\Property(property="user_id", type="integer"),
 *             @OA\Property(property="title", type="string"),
 *             @OA\Property(property="image_url", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Gallery item created"
 *     )
 * )
 */
Flight::route('POST /gallery', function () {
        Flight::auth_middleware()->authorizeRoles([Roles::ADMIN]);

    $data = Flight::request()->data->getData();
    $success = Flight::galleryService()->createGalleryItem($data);

    Flight::json([
        "success" => $success,
        "message" => $success ? "Gallery item created successfully" : "Failed to create gallery item"
    ]);
});

/**
 * @OA\Delete(
 *     path="/gallery/{id}",
 *     summary="Delete a gallery item",
 *     security={{"ApiKey": {}}},
 *     tags={"Gallery"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Gallery item ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Gallery item deleted"
 *     )
 * )
 */
Flight::route('DELETE /gallery/@id', function ($id) {
        Flight::auth_middleware()->authorizeRoles([Roles::ADMIN]);

    $rows = Flight::galleryService()->deleteGalleryItem($id);

    Flight::json([
        "success" => $rows > 0,
        "deleted_id" => $id,
        "message" => $rows > 0 ? "Gallery item deleted successfully" : "No item deleted (check ID)"
    ]);
});

/**
 * @OA\Get(
 *     path="/gallery/user/{user_id}",
 *     summary="Get gallery items by user ID",
 *     security={{"ApiKey": {}}},
 *     tags={"Gallery"},
 *     @OA\Parameter(
 *         name="user_id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Gallery items by user"
 *     )
 * )
 */
Flight::route('GET /gallery/user/@user_id', function ($user_id) {
        Flight::auth_middleware()->authorizeRoles([Roles::ADMIN, Roles::GUEST]);

    Flight::json(Flight::galleryService()->getGalleryItemsByUser($user_id));
});
