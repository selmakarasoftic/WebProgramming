<?php
class ReviewDao extends BaseDao {
    public function __construct() {
        parent::__construct("reviews");
    }

    public function getByCarId($car_id) {
        $stmt = $this->connection->prepare("SELECT * FROM reviews WHERE car_id = :car_id");
        $stmt->bindParam(':car_id', $car_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}

?>