<?php

Flight::route('GET /meetups', function() {
    Flight::json(Flight::meetupService()->getAllMeetups());
});

Flight::route('GET /meetups/@id', function($id) {
    Flight::json(Flight::meetupService()->getMeetupById($id));
});

Flight::route('POST /meetups', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::meetupService()->createMeetup($data));
});

Flight::route('PUT /meetups/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::meetupService()->updateMeetup($id, $data));
});

Flight::route('DELETE /meetups/@id', function($id) {
    Flight::json(Flight::meetupService()->deleteMeetup($id));
});

?>
