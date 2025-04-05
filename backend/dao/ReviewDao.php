<?php
require_once 'BaseDao.php';

class ReviewDao extends BaseDao {
    public function __construct() {
        parent::__construct("reviews");
    }

    // get all
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
            JOIN cars c ON r.car_id = c.id
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // get one
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
            JOIN cars c ON r.car_id = c.id
            WHERE r.id = :id
        ");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    // add
    public function addReview($data) {
        $stmt = $this->connection->prepare("
            INSERT INTO reviews (user_id, car_id, title, review_text, rating)
            VALUES (:user_id, :car_id, :title, :review_text, :rating)
        ");
        return $stmt->execute($data);
    }

    // update
    public function updateReview($id, $data) {
        $data['id'] = $id;
        $stmt = $this->connection->prepare("
            UPDATE reviews
            SET title = :title,
                review_text = :review_text,
                rating = :rating
            WHERE id = :id
        ");
        return $stmt->execute($data);
    }

    // delete
    public function deleteReview($id) {
        $stmt = $this->connection->prepare("DELETE FROM reviews WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // isto kao i ostalo
    public function getReviewsByUser($user_id) {
        $stmt = $this->connection->prepare("
            SELECT * FROM reviews WHERE user_id = :user_id
        ");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
    //isto zbog profila 
    public function countReviewsByUser($user_id) {
        $stmt = $this->connection->prepare("
            SELECT COUNT(*) as total FROM reviews WHERE user_id = :user_id
        ");
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetch()['total'];
    }
    
}
?>
