<?php
require_once 'BaseDao.php';

class UserDao extends BaseDao {
    public function __construct() {
        parent::__construct("users");
    }

    // register
    public function registerUser($data) {
        $stmt = $this->connection->prepare("
            INSERT INTO users (username, email, password)
            VALUES (:username, :email, :password)
        ");
        return $stmt->execute($data);
    }

    // login
    public function getUserByEmail($email) {
        $stmt = $this->connection->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        return $stmt->fetch();
    }

    // get one
    public function getUserById($id) {
        $stmt = $this->connection->prepare("SELECT id, username, email, role, created_at FROM users WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    // update
    public function updateUser($id, $data) {
        $data['id'] = $id;
        $stmt = $this->connection->prepare("
            UPDATE users 
            SET username = :username, email = :email
            WHERE id = :id
        ");
        return $stmt->execute($data);
    }

    // change pwd
    public function changePassword($id, $newPassword) {
        $stmt = $this->connection->prepare("
            UPDATE users SET password = :password WHERE id = :id
        ");
        $stmt->bindParam(":password", $newPassword);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    // za admina
    public function getAllUsers() {
        $stmt = $this->connection->prepare("
            SELECT id, username, email, role, created_at FROM users
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // obrisi 
    public function deleteUser($id) {
        $stmt = $this->connection->prepare("DELETE FROM users WHERE id = :id");
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }
}
?>
