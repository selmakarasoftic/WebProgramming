<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/UserDao.php';

class UserService extends BaseService {
    public function __construct() {
        parent::__construct(new UserDao());
    }

    public function getUserByEmail($email) {
        return $this->dao->getUserByEmail($email);
    }

    public function changePassword($id, $password) {
        return $this->dao->changePassword($id, $password);
    }

    public function getAllUsers() {
        return $this->dao->getAllUsers();
    }
}
?>
