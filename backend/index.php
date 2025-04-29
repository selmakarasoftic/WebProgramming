<?php

require 'vendor/autoload.php';

// Register services
require_once __DIR__ . '/services/CarService.php';
require_once __DIR__ . '/services/ReviewService.php';
require_once __DIR__ . '/services/UserService.php';
require_once __DIR__ . '/services/GalleryService.php';
require_once __DIR__ . '/services/MeetupService.php';

Flight::register('carService', 'CarService');
Flight::register('reviewService', 'ReviewService');
Flight::register('userService', 'UserService');
Flight::register('galleryService', 'GalleryService');
Flight::register('meetupService', 'MeetupService');

// Load routes
require_once __DIR__ . '/routes/CarRoutes.php';
require_once __DIR__ . '/routes/ReviewRoutes.php';
require_once __DIR__ . '/routes/UserRoutes.php';
require_once __DIR__ . '/routes/GalleryRoutes.php';
require_once __DIR__ . '/routes/MeetupRoutes.php';

Flight::start();

?>
