<?php

require_once 'BaseService.php';
require_once __DIR__ . '/../dao/ReviewDao.php';

class ReviewService extends BaseService {
    public function __construct() {
        $dao = new ReviewDao();
        parent::__construct($dao);
    }

    public function getAllReviews() {
        return $this->dao->getAllReviews();
    }

    public function getReviewById($id) {
        return $this->dao->getReviewById($id);
    }

    public function createReview($data) {
        if (!isset($data['title']) || strlen($data['title']) < 3) {
            throw new Exception('Title must be at least 3 characters.');
        }
        if (!isset($data['review_text']) || strlen($data['review_text']) < 10) {
            throw new Exception('Review text must be at least 10 characters.');
        }
        if (!isset($data['rating']) || $data['rating'] < 1 || $data['rating'] > 5) {
            throw new Exception('Rating must be between 1 and 5.');
        }
        return $this->dao->addReview($data);
    }

    public function updateReview($id, $data) {
        return $this->dao->updateReview($id, $data);
    }

    public function deleteReview($id) {
        return $this->dao->deleteReview($id);
    }

    public function getReviewsByUser($user_id) {
        return $this->dao->getReviewsByUser($user_id);
    }

    public function countReviewsByUser($user_id) {
        return $this->dao->countReviewsByUser($user_id);
    }
}
?>
