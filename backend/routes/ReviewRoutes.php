<?php

/**
 * @OA\Get(
 *     path="/reviews",
 *     summary="Get all reviews",
 *     tags={"Reviews"},
 *     @OA\Response(response=200, description="List of reviews")
 * )
 */
Flight::route('GET /reviews', function() {
    Flight::json(Flight::reviewService()->getAllReviews());
});

/**
 * @OA\Get(
 *     path="/reviews/{id}",
 *     summary="Get a review by ID",
 *     tags={"Reviews"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Review details")
 * )
 */
Flight::route('GET /reviews/@id', function($id) {
    Flight::json(Flight::reviewService()->getReviewById($id));
});

/**
 * @OA\Post(
 *     path="/reviews",
 *     summary="Add a new review",
 *     tags={"Reviews"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "car_id", "title", "review_text", "rating"},
 *             @OA\Property(property="user_id", type="integer"),
 *             @OA\Property(property="car_id", type="integer"),
 *             @OA\Property(property="title", type="string"),
 *             @OA\Property(property="review_text", type="string"),
 *             @OA\Property(property="rating", type="number", format="float")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Review added")
 * )
 */
Flight::route('POST /reviews', function() {
    $data = Flight::request()->data->getData();
    Flight::json([
        "success" => Flight::reviewService()->createReview($data),
        "message" => "Review added"
    ]);
});

/**
 * @OA\Put(
 *     path="/reviews/{id}",
 *     summary="Update a review",
 *     tags={"Reviews"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="title", type="string"),
 *             @OA\Property(property="review_text", type="string"),
 *             @OA\Property(property="rating", type="number", format="float")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Review updated")
 * )
 */
Flight::route('PUT /reviews/@id', function($id) {
    $data = Flight::request()->data->getData();
    $rows = Flight::reviewService()->updateReview($id, $data);

    Flight::json([
        "success" => $rows > 0,
        "message" => $rows > 0 ? "Review updated" : "No review updated"
    ]);
});

/**
 * @OA\Delete(
 *     path="/reviews/{id}",
 *     summary="Delete a review",
 *     tags={"Reviews"},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Review deleted")
 * )
 */
Flight::route('DELETE /reviews/@id', function($id) {
    $rows = Flight::reviewService()->deleteReview($id);

    Flight::json([
        "success" => $rows > 0,
        "message" => $rows > 0 ? "Review deleted" : "No review deleted"
    ]);
});

?>
