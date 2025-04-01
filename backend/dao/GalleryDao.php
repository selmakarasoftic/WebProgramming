<?php
require_once 'BaseDao.php';
class GalleryDao extends BaseDao {
    public function __construct() {
        parent::__construct("gallery");
    }

    public function getByUserId($user_id) {
        $stmt = $this->connection->prepare("SELECT * FROM gallery WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
?>