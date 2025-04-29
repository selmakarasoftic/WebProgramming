<?php

require_once 'BaseService.php';
require_once __DIR__ . '/../dao/GalleryDao.php';

class GalleryService extends BaseService {
    public function __construct() {
        $dao = new GalleryDao();
        parent::__construct($dao);
    }

    public function getAllGalleryItems() {
        return $this->dao->getAllGalleryItems();
    }

    public function getGalleryItemById($id) {
        return $this->dao->getGalleryItemById($id);
    }

    public function createGalleryItem($data) {
        // Business Logic: Validate before inserting
        if (!isset($data['title']) || strlen($data['title']) < 3) {
            throw new Exception('Title must be at least 3 characters.');
        }
        if (!isset($data['image_url']) || empty($data['image_url'])) {
            throw new Exception('Image URL is required.');
        }
        return $this->dao->addGalleryItem($data);
    }

    public function deleteGalleryItem($id) {
        return $this->dao->deleteGalleryItem($id);
    }

    public function getGalleryItemsByUser($user_id) {
        return $this->dao->getGalleryItemsByUser($user_id);
    }
}
?>
