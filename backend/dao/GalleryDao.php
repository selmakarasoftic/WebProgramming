<?php
require_once 'BaseDao.php';

class GalleryDao extends BaseDao {
    public function __construct() {
        parent::__construct("gallery");
    }

    // get all
    public function getAllGalleryItems() {
        $stmt = $this->connection->prepare("
            SELECT 
                g.id,
                g.title,
                g.image_url,
                g.uploaded_at,
                u.username AS uploader,
                u.id AS user_id
            FROM gallery g
            JOIN users u ON g.user_id = u.id
            ORDER BY g.uploaded_at DESC
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // isto kao i za cars moram vidjeti 
    public function getGalleryItemById($id) {
        $stmt = $this->connection->prepare("
            SELECT 
                g.id,
                g.title,
                g.image_url,
                g.uploaded_at,
                u.username AS uploader
            FROM gallery g
            JOIN users u ON g.user_id = u.id
            WHERE g.id = :id
        ");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    // ✅ Upload new photo to gallery
    public function addGalleryItem($data) {
        $stmt = $this->connection->prepare("
            INSERT INTO gallery (user_id, title, image_url)
            VALUES (:user_id, :title, :image_url)
        ");
        return $stmt->execute($data);
    }

    // ✅ Delete photo from gallery
    public function deleteGalleryItem($id) {
        $stmt = $this->connection->prepare("DELETE FROM gallery WHERE id = :id");
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    // 🔍 Optional: Get all items uploaded by a specific user
    public function getGalleryItemsByUser($user_id) {
        $stmt = $this->connection->prepare("
            SELECT * FROM gallery WHERE user_id = :user_id ORDER BY uploaded_at DESC
        ");
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
?>
