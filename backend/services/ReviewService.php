<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/ReviewDao.php';

class ReviewService extends BaseService {
    public function __construct() {
        parent::__construct(new ReviewDao());
    }

    public function getReviewsByUser($user_id) {
        return $this->dao->getReviewsByUser($user_id);
    }

    public function getReviewsByCar($car_id) {
        return $this->dao->getReviewsByCar($car_id);
    }

    public function countReviewsByUser($user_id) {
        return $this->dao->countReviewsByUser($user_id);
    }
}
?>
