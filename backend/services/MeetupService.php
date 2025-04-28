<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/MeetupDao.php';

class MeetupService extends BaseService {
    public function __construct() {
        parent::__construct(new MeetupDao());
    }

    public function getMeetupsByOrganizer($user_id) {
        return $this->dao->getMeetupsByOrganizer($user_id);
    }

    public function countMeetupsByUser($user_id) {
        return $this->dao->countMeetupsByUser($user_id);
    }
}
?>
