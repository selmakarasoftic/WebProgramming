<?php
require_once 'UserDao.php';
require_once 'CarDao.php';
require_once 'ReviewDao.php';
require_once 'MeetupDao.php';
require_once 'GalleryDao.php';

$carDao = new CarDao();
$reviewDao = new ReviewDao();
$meetupDao = new MeetupDao();
$galleryDao = new GalleryDao();
$userDao = new UserDao();

// da provjeri jel ima kad testiram i to 
function safeInsertUser($userDao, $data) {
    $existing = $userDao->getByEmail($data['email']);
    if (!$existing) {
        $userDao->insert($data);
        return end($userDao->getAll())['id'];
    } else {
        return $existing['id'];
    }
}

function safeInsertCar($carDao, $data) {
    $all = $carDao->getAll();
    foreach ($all as $car) {
        if ($car['model'] === $data['model'] && $car['year'] == $data['year'] && $car['user_id'] == $data['user_id']) {
            return $car['id'];
        }
    }
    $carDao->insert($data);
    return end($carDao->getAll())['id'];
}

function safeInsertReview($reviewDao, $data) {
    $all = $reviewDao->getAll();
    foreach ($all as $rev) {
        if ($rev['user_id'] == $data['user_id'] && $rev['car_id'] == $data['car_id']) {
            return $rev['id'];
        }
    }
    $reviewDao->insert($data);
    return end($reviewDao->getAll())['id'];
}

function safeInsertMeetup($meetupDao, $data) {
    $all = $meetupDao->getAll();
    foreach ($all as $meetup) {
        if ($meetup['title'] === $data['title'] && $meetup['date'] === $data['date']) {
            return $meetup['id'];
        }
    }
    $meetupDao->insert($data);
    return end($meetupDao->getAll())['id'];
}

function safeInsertGallery($galleryDao, $data) {
    $all = $galleryDao->getAll();
    foreach ($all as $img) {
        if ($img['user_id'] == $data['user_id'] && $img['title'] === $data['title']) {
            return $img['id'];
        }
    }
    $galleryDao->insert($data);
    return end($galleryDao->getAll())['id'];
}

// za usere 
$userId = safeInsertUser($userDao, [
    'username' => 'selma_test',
    'email' => 'selma_test@example.com',
    'password' => password_hash('test123', PASSWORD_DEFAULT),
    'role' => 'guest'
]);
echo "<h3>All Users:</h3><pre>";
print_r($userDao->getAll());
echo "</pre>";

$userDao->update($userId, ['username' => 'updated_selma']);
echo "<h3>User After Update:</h3><pre>";
print_r($userDao->getById($userId));
echo "</pre>";
// $userDao->delete($userId); // Uncomment to test delete

// za auta
$carId = safeInsertCar($carDao, [
    'user_id' => $userId,
    'model' => 'Audi A4',
    'year' => 2022,
    'engine' => '2.0 TFSI',
    'horsepower' => 190,
    'image_url' => 'https://example.com/audi.jpg'
]);
echo "<h3>All Cars:</h3><pre>";
print_r($carDao->getAll());
echo "</pre>";

$carDao->update($carId, ['model' => 'Audi A4 S-line']);
echo "<h3>Car After Update:</h3><pre>";
print_r($carDao->getById($carId));
echo "</pre>";
// $carDao->delete($carId);

// za reviews
$reviewId = safeInsertReview($reviewDao, [
    'user_id' => $userId,
    'car_id' => $carId,
    'title' => 'Solid Car!',
    'review_text' => 'Very comfortable and smooth ride.',
    'rating' => 5
]);
echo "<h3>All Reviews:</h3><pre>";
print_r($reviewDao->getAll());
echo "</pre>";

$reviewDao->update($reviewId, ['title' => 'Updated Review']);
echo "<h3>Review After Update:</h3><pre>";
print_r($reviewDao->getById($reviewId));
echo "</pre>";
// $reviewDao->delete($reviewId);

// za meetups
$meetupId = safeInsertMeetup($meetupDao, [
    'title' => 'AutoVerse Sarajevo Meetup',
    'date' => '2025-04-10',
    'location' => 'Sarajevo City Center',
    'organizer_id' => $userId,
    'description' => 'Join us for a gathering of car enthusiasts!'
]);
echo "<h3>All Meetups:</h3><pre>";
print_r($meetupDao->getAll());
echo "</pre>";

$meetupDao->update($meetupId, ['location' => 'Skenderija Hall']);
echo "<h3>Meetup After Update:</h3><pre>";
print_r($meetupDao->getById($meetupId));
echo "</pre>";
// $meetupDao->delete($meetupId);

// za galeriju 
$galleryId = safeInsertGallery($galleryDao, [
    'user_id' => $userId,
    'title' => 'My Audi A4',
    'image_url' => 'https://example.com/gallery/audi.jpg'
]);
echo "<h3>All Gallery Items:</h3><pre>";
print_r($galleryDao->getAll());
echo "</pre>";

$galleryDao->update($galleryId, ['title' => 'Updated Audi Gallery']);
echo "<h3>Gallery After Update:</h3><pre>";
print_r($galleryDao->getAll());
echo "</pre>"; 
//$galleryDao->delete($galleryId);
?>
