<?php

require_once 'BaseService.php';
require_once __DIR__ . '/../dao/CarDao.php';

class CarService extends BaseService {
    public function __construct() {
        $dao = new CarDao();
        parent::__construct($dao);
    }

    public function getAllCars() {
        return $this->dao->getAllCars();
    }

    public function getCarById($id) {
        return $this->dao->getCarById($id);
    }

    public function createCar($data) {
        // Business Logic
        if (!isset($data['model']) || empty($data['model'])) {
            throw new Exception('Model is required.');
        }
        if ($data['year'] < 1886 || $data['year'] > intval(date('Y'))) {
            throw new Exception('Year must be between 1886 and today.');
        }
        if ($data['horsepower'] <= 0) {
            throw new Exception('Horsepower must be a positive number.');
        }
        return $this->dao->addCar($data);
    }

    public function updateCar($id, $data) {
        return $this->dao->updateCar($id, $data);
    }

    public function deleteCar($id) {
        return $this->dao->deleteCar($id);
    }

    public function getCarsByUser($user_id) {
        return $this->dao->getCarsByUser($user_id);
    }

    public function countCarsByUser($user_id) {
        return $this->dao->countCarsByUser($user_id);
    }
}
?>
