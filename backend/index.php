<?php
require __DIR__ . '/vendor/autoload.php';

// Register services
require_once __DIR__ . '/services/CarService.php';
require_once __DIR__ . '/services/ReviewService.php';
require_once __DIR__ . '/services/UserService.php';
require_once __DIR__ . '/services/GalleryService.php';
require_once __DIR__ . '/services/MeetupService.php';
require_once __DIR__ . '/services/AuthService.php';
require_once __DIR__ . '/middleware/AuthMiddleware.php';
require_once __DIR__ . '/data/roles.php';

Flight::register('auth_middleware', 'AuthMiddleware');
Flight::register('carService', 'CarService');
Flight::register('reviewService', 'ReviewService');
Flight::register('userService', 'UserService');
Flight::register('galleryService', 'GalleryService');
Flight::register('meetupService', 'MeetupService');
Flight::register('auth_service', 'AuthService');
//now i implement middleware to protect all routes except login register and docs 
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once __DIR__ . '/dao/config.php';

Flight::route('/*', function(){
    $url = Flight::request()->url;

    if (
        str_starts_with($url, '/auth/login') ||
        str_starts_with($url, '/auth/register') ||
        str_starts_with($url, '/public/v1/docs') 
    ) {
        return true;
    }

    try {
        $token = Flight::request()->getHeader("Authentication");
        /*if (!$token) {
            Flight::halt(401, "Missing authentication header");
        }

        $decoded = JWT::decode($token, new Key(Database::JWT_SECRET(), 'HS256'));
        Flight::set('user', $decoded->user);*/
        if(Flight::auth_middleware()->verifyToken($token))
               return TRUE;
    } catch (Exception $e) {
        Flight::halt(401, $e->getMessage());
    }
});

// Load routes
require_once __DIR__ . '/routes/CarRoutes.php';
require_once __DIR__ . '/routes/ReviewRoutes.php';
require_once __DIR__ . '/routes/UserRoutes.php';
require_once __DIR__ . '/routes/GalleryRoutes.php';
require_once __DIR__ . '/routes/MeetupRoutes.php';
require_once __DIR__ . '/routes/AuthRoutes.php';

Flight::start();


?>
