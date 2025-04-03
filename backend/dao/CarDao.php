<?php
require_once 'BaseDao.php';

class CarDao extends BaseDao {
    public function __construct() {
        parent::__construct("cars");
    }

    //list all cars 
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

//get car by id moram vidjei mogu li ghde ubaciti u projekt 

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

    // novo auto
    public function addCar($data) {
        $stmt = $this->connection->prepare("
            INSERT INTO cars (user_id, model, year, engine, horsepower, image_url)
            VALUES (:user_id, :model, :year, :engine, :horsepower, :image_url)
        ");
        return $stmt->execute($data);
    }

    // update
    public function updateCar($id, $data) {
        $data['id'] = $id;
        $stmt = $this->connection->prepare("
            UPDATE cars 
            SET model = :model, year = :year, engine = :engine, horsepower = :horsepower, image_url = :image_url
            WHERE id = :id
        ");
        return $stmt->execute($data);
    }

    // delete
    public function deleteCar($id) {
        $stmt = $this->connection->prepare("DELETE FROM cars WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // 🔍 Optional: Get all cars by a specific user (used in profile/dashboard)
    public function getCarsByUser($user_id) {
        $stmt = $this->connection->prepare("SELECT * FROM cars WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // ovo vidjeti da mozda user moze da vidi
    // samo svoja dodana ako hoce al to moram na frontu dpdat
    public function countCarsByUser($user_id) {
        $stmt = $this->connection->prepare("
            SELECT COUNT(*) as total FROM cars WHERE user_id = :user_id
        ");
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetch()['total'];
    }
    
}

?>
