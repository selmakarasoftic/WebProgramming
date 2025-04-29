<?php

require_once 'BaseService.php';
require_once __DIR__ . '/../dao/MeetupDao.php';

class MeetupService extends BaseService {
    public function __construct() {
        $dao = new MeetupDao();
        parent::__construct($dao);
    }

    public function getAllMeetups() {
        return $this->dao->getAllMeetups();
    }

    public function getMeetupById($id) {
        return $this->dao->getMeetupById($id);
    }

    public function createMeetup($data) {
        // Business Logic: Validate before inserting
        if (!isset($data['title']) || strlen($data['title']) < 3) {
            throw new Exception('Title must be at least 3 characters.');
        }
        if (!isset($data['location']) || strlen($data['location']) < 3) {
            throw new Exception('Location must be at least 3 characters.');
        }
        if (!isset($data['date']) || empty($data['date'])) {
            throw new Exception('Date is required.');
        }
        if (!isset($data['description']) || strlen($data['description']) < 10) {
            throw new Exception('Description must be at least 10 characters.');
        }
        return $this->dao->addMeetup($data);
    }

    public function updateMeetup($id, $data) {
        return $this->dao->updateMeetup($id, $data);
    }

    public function deleteMeetup($id) {
        return $this->dao->deleteMeetup($id);
    }

    public function getMeetupsByOrganizer($organizer_id) {
        return $this->dao->getMeetupsByOrganizer($organizer_id);
    }

    public function countMeetupsByUser($user_id) {
        return $this->dao->countMeetupsByUser($user_id);
    }
}
?>
