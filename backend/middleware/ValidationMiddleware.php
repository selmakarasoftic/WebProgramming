<?php

class ValidationMiddleware {

    public function validateRegistration($data) {
        if (!isset($data['username']) || strlen($data['username']) < 3) {
            throw new Exception('Username must be at least 3 characters.');
        }
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }
        if (!isset($data['password']) || strlen($data['password']) < 6) {
            throw new Exception('Password must be at least 6 characters.');
        }
        return true;
    }

    public function validateLogin($data) {
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }
        if (!isset($data['password']) || empty($data['password'])) {
            throw new Exception('Password is required.');
        }
        return true;
    }

    public function validatePasswordChange($data) {
        if (!isset($data['old_password']) || empty($data['old_password'])) {
            throw new Exception('Old password is required.');
        }
        if (!isset($data['new_password']) || strlen($data['new_password']) < 6) {
            throw new Exception('New password must be at least 6 characters.');
        }
        return true;
    }
} 