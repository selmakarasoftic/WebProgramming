<?php
require_once 'BaseDao.php';

class ReviewDao extends BaseDao {
    public function __construct() {
        parent::__construct("reviews");
    }

    // get all - koristi JOIN s users i cars
    public function getAllReviews() {
        $stmt = $this->connection->prepare("
            SELECT 
                r.id,
                r.title,
                r.review_text,
                r.rating,
                r.user_id,
                r.car_id,
                u.username AS reviewer_name,
                c.model AS car_model,
                c.image_url AS car_image
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            LEFT JOIN cars c ON r.car_id = c.id
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // get one - koristi JOIN s users i cars
    public function getReviewById($id) {
        $stmt = $this->connection->prepare("
            SELECT 
                r.id,
                r.title,
                r.review_text,
                r.rating,
                r.user_id,
                r.car_id,
                u.username AS reviewer_name,
                c.model AS car_model,
                c.image_url AS car_image
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            LEFT JOIN cars c ON r.car_id = c.id
            WHERE r.id = :id
        ");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    //  addReview se koristi preko BaseDao::add($data)
    //  updateReview se koristi preko BaseDao::update($id, $data)
    //  deleteReview se koristi preko BaseDao::delete($id)

    // isto kao i ostalo
    public function getReviewsByUser($user_id) {
        $stmt = $this->connection->prepare("
            SELECT * FROM reviews WHERE user_id = :user_id
        ");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // isto zbog profila 
    public function countReviewsByUser($user_id) {
        $stmt = $this->connection->prepare("
            SELECT COUNT(*) as total FROM reviews WHERE user_id = :user_id
        ");
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetch()['total'];
    }

    public function getLatestReview() {
        $stmt = $this->connection->prepare("
            SELECT 
                r.id,
                r.title,
                r.review_text,
                r.rating,
                r.user_id,
                r.car_id,
                u.username AS reviewer_name,
                c.model AS car_model,
                c.image_url AS car_image
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            LEFT JOIN cars c ON r.car_id = c.id
            ORDER BY r.id DESC
            LIMIT 1
        ");
        $stmt->execute();
        return $stmt->fetch();
    }
}
?>
