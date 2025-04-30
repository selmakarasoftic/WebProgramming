<?php
require_once 'BaseDao.php';

class CarDao extends BaseDao {
    public function __construct() {
        parent::__construct("cars");
    }

    // Get all cars
    public function getAllCars() {
        $stmt = $this->connection->prepare("
            SELECT 
                c.id,
                c.model,
                c.year,
                c.engine,
                c.horsepower,
                c.image_url,
                u.username AS uploader,
                u.id AS user_id
            FROM cars c
            JOIN users u ON c.user_id = u.id
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // Get car by ID
    public function getCarById($id) {
        $stmt = $this->connection->prepare("
            SELECT 
                c.id,
                c.model,
                c.year,
                c.engine,
                c.horsepower,
                c.image_url,
                u.username AS uploader,
                u.id AS user_id
            FROM cars c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = :id
        ");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    // Add new car
    public function addCar($data) {
        $stmt = $this->connection->prepare("
            INSERT INTO cars (user_id, model, year, engine, horsepower, image_url)
            VALUES (:user_id, :model, :year, :engine, :horsepower, :image_url)
        ");
        return $stmt->execute($data);
    }

    // Update car
    public function updateCar($id, $data) {
        $data['id'] = $id;
        $stmt = $this->connection->prepare("
            UPDATE cars 
            SET model = :model, year = :year, engine = :engine, horsepower = :horsepower, image_url = :image_url
            WHERE id = :id
        ");
        $stmt->execute($data);
        return $stmt->rowCount(); // ✅ returns number of rows affected
    }

    // Delete car
    public function deleteCar($id) {
        $stmt = $this->connection->prepare("DELETE FROM cars WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->rowCount(); // ✅ returns number of rows affected
    }

    // Get all cars by user
    public function getCarsByUser($user_id) {
        $stmt = $this->connection->prepare("SELECT * FROM cars WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // Count user cars
    public function countCarsByUser($user_id) {
        $stmt = $this->connection->prepare("SELECT COUNT(*) as total FROM cars WHERE user_id = :user_id");
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetch()['total'];
    }
}
?>
