<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/CarDao.php';

class CarService extends BaseService {
    public function __construct() {
        parent::__construct(new CarDao());
    }

    public function getCarsByUser($user_id) {
        return $this->dao->getCarsByUser($user_id);
    }

    public function countCarsByUser($user_id) {
        return $this->dao->countCarsByUser($user_id);
    }
}
?>
