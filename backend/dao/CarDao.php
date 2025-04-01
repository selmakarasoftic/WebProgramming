<?php
require_once 'BaseDao.php';
class CarDao extends BaseDao {
    public function __construct() {
        parent::__construct("cars");
    }

    public function getByYear($year) {
        $stmt = $this->connection->prepare("SELECT * FROM cars WHERE year = :year");
        $stmt->bindParam(':year', $year);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}

?>
