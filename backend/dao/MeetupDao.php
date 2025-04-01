<?php
class MeetupDao extends BaseDao {
    public function __construct() {
        parent::__construct("meetups");
    }

    public function getUpcoming() {
        $stmt = $this->connection->prepare("SELECT * FROM meetups WHERE date >= CURDATE() ORDER BY date ASC");
        $stmt->execute();
        return $stmt->fetchAll();
    }
}

?>