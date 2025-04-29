<?php

Flight::route('GET /gallery', function() {
    Flight::json(Flight::galleryService()->getAllGalleryItems());
});

Flight::route('GET /gallery/@id', function($id) {
    Flight::json(Flight::galleryService()->getGalleryItemById($id));
});

Flight::route('POST /gallery', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::galleryService()->createGalleryItem($data));
});

Flight::route('DELETE /gallery/@id', function($id) {
    Flight::json(Flight::galleryService()->deleteGalleryItem($id));
});

?>
