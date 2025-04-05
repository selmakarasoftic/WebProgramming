<?php
require_once 'BaseDao.php';

class MeetupDao extends BaseDao {
    public function __construct() {
        parent::__construct("meetups");
    }

    // get all
    public function getAllMeetups() {
        $stmt = $this->connection->prepare("
            SELECT 
                m.id,
                m.title,
                m.date,
                m.location,
                m.description,
                u.username AS organizer_name,
                u.id AS organizer_id
            FROM meetups m
            JOIN users u ON m.organizer_id = u.id
            ORDER BY m.date DESC
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // get one 
    public function getMeetupById($id) {
        $stmt = $this->connection->prepare("
            SELECT 
                m.*,
                u.username AS organizer_name
            FROM meetups m
            JOIN users u ON m.organizer_id = u.id
            WHERE m.id = :id
        ");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    // create
    public function addMeetup($data) {
        $stmt = $this->connection->prepare("
            INSERT INTO meetups (title, date, location, description, organizer_id)
            VALUES (:title, :date, :location, :description, :organizer_id)
        ");
        return $stmt->execute($data);
    }

    // update
    public function updateMeetup($id, $data) {
        $data['id'] = $id;
        $stmt = $this->connection->prepare("
            UPDATE meetups
            SET title = :title,
                date = :date,
                location = :location,
                description = :description
            WHERE id = :id
        ");
        return $stmt->execute($data);
    }

    // delete
    public function deleteMeetup($id) {
        $stmt = $this->connection->prepare("DELETE FROM meetups WHERE id = :id");
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    // ovo isto kao i za auta i galeriju
    public function getMeetupsByOrganizer($organizer_id) {
        $stmt = $this->connection->prepare("SELECT * FROM meetups WHERE organizer_id = :organizer_id");
        $stmt->bindParam(":organizer_id", $organizer_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    //ovo ce mi trebat jer na profilu ispisujem koliko je dodanih objava 
    public function countMeetupsByUser($user_id) {
        $stmt = $this->connection->prepare("
            SELECT COUNT(*) as total FROM meetups WHERE organizer_id = :user_id
        ");
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetch()['total'];
    }
    
}
?>