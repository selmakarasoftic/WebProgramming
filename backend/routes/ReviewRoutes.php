<?php

Flight::route('GET /reviews', function() {
    Flight::json(Flight::reviewService()->getAllReviews());
});

Flight::route('GET /reviews/@id', function($id) {
    Flight::json(Flight::reviewService()->getReviewById($id));
});

Flight::route('POST /reviews', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::reviewService()->createReview($data));
});

Flight::route('PUT /reviews/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::reviewService()->updateReview($id, $data));
});

Flight::route('DELETE /reviews/@id', function($id) {
    Flight::json(Flight::reviewService()->deleteReview($id));
});

?>
