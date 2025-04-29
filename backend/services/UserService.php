<?php

require_once 'BaseService.php';
require_once __DIR__ . '/../dao/UserDao.php';

class UserService extends BaseService {
    public function __construct() {
        $dao = new UserDao();
        parent::__construct($dao);
    }

    public function registerUser($data) {
        // Business Logic: Validate before register
        if (!isset($data['username']) || strlen($data['username']) < 3) {
            throw new Exception('Username must be at least 3 characters.');
        }
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }
        if (!isset($data['password']) || strlen($data['password']) < 6) {
            throw new Exception('Password must be at least 6 characters.');
        }
        // Hash password before saving
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        return $this->dao->registerUser($data);
    }

    public function loginUser($email, $password) {
        $user = $this->dao->getUserByEmail($email);
        if (!$user || !password_verify($password, $user['password'])) {
            throw new Exception('Invalid email or password.');
        }
        return $user;
    }

    public function getUserById($id) {
        return $this->dao->getUserById($id);
    }

    public function updateUser($id, $data) {
        return $this->dao->updateUser($id, $data);
    }

    public function changePassword($id, $newPassword) {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        return $this->dao->changePassword($id, $hashedPassword);
    }

    public function getAllUsers() {
        return $this->dao->getAllUsers();
    }

    public function deleteUser($id) {
        return $this->dao->deleteUser($id);
    }
}
?>
