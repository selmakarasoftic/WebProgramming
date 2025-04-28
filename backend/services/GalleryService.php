<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/GalleryDao.php';

class GalleryService extends BaseService {
    public function __construct() {
        parent::__construct(new GalleryDao());
    }

    public function getGalleryItemsByUser($user_id) {
        return $this->dao->getGalleryItemsByUser($user_id);
    }
}
?>
