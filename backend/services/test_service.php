<?php
require_once 'services/UserService.php';
require_once 'services/CarService.php';
require_once 'services/ReviewService.php';
require_once 'services/MeetupService.php';
require_once 'services/GalleryService.php';

echo "<pre>";

$userService = new UserService();
$carService = new CarService();
$reviewService = new ReviewService();
$meetupService = new MeetupService();
$galleryService = new GalleryService();

echo "---------------- Creating Test User ----------------\n";
$user = $userService->getUserByEmail("serviceuser@example.com");

if (!$user) {
    $userService->create([
        "username" => "serviceuser",
        "email" => "serviceuser@example.com",
        "password" => password_hash("123456", PASSWORD_DEFAULT)
    ]);
    $user = $userService->getUserByEmail("serviceuser@example.com");
}
$user_id = $user["id"];
print_r($user);

echo "\n---------------- Adding Car ----------------\n";
$carService->create([
    "user_id" => $user_id,
    "model" => "ServiceCar",
    "year" => 2024,
    "engine" => "Hybrid",
    "horsepower" => 450,
    "image_url" => "assets/car.jpg"
]);
$cars = $carService->getCarsByUser($user_id);
$car_id = $cars[0]["id"];
print_r($cars);

echo "\n---------------- Adding Review ----------------\n";
$reviewService->create([
    "user_id" => $user_id,
    "car_id" => $car_id,
    "title" => "Service Review",
    "review_text" => "This is great.",
    "rating" => 5
]);
$reviews = $reviewService->getReviewsByUser($user_id);
$review_id = $reviews[0]["id"];
print_r($reviews);

echo "\n---------------- Adding Meetup ----------------\n";
$meetupService->create([
    "title" => "Service Meetup",
    "date" => "2025-06-01",
    "location" => "Online",
    "description" => "Meet and test",
    "organizer_id" => $user_id
]);
$meetups = $meetupService->getMeetupsByOrganizer($user_id);
$meetup_id = $meetups[0]["id"];
print_r($meetups);

echo "\n---------------- Adding Gallery ----------------\n";
$galleryService->create([
    "user_id" => $user_id,
    "title" => "Service Photo",
    "image_url" => "assets/gallery.jpg"
]);
$galleryItems = $galleryService->getGalleryItemsByUser($user_id);
$gallery_id = $galleryItems[0]["id"];
print_r($galleryItems);

echo "\n---------------- Stats ----------------\n";
echo "Cars: " . $carService->countCarsByUser($user_id) . "\n";
echo "Reviews: " . $reviewService->countReviewsByUser($user_id) . "\n";
echo "Meetups: " . $meetupService->countMeetupsByUser($user_id) . "\n";
/*
// OVDJE JE BRISANJE KOMENTARISANO 
echo "\n---------------- Deleting All Test Records ----------------\n";

foreach ($reviewService->getReviewsByUser($user_id) as $r) {
    $reviewService->delete($r['id']);
}

foreach ($carService->getCarsByUser($user_id) as $c) {
    $carService->delete($c['id']);
}

foreach ($meetupService->getMeetupsByOrganizer($user_id) as $m) {
    $meetupService->delete($m['id']);
}

foreach ($galleryService->getGalleryItemsByUser($user_id) as $g) {
    $galleryService->delete($g['id']);
}

$userService->delete($user_id);

echo "Deleted user? ";
print_r($userService->getById($user_id));
*/
echo "</pre>";
?>
