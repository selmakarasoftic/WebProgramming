<?php
class Database {
    private static $connection = null;

    // JWT Secret Key
    public static function JWT_SECRET() {
        return 'SecureRandomString';
    }

    public static function connect() {
        if (self::$connection === null) {
            $host = getenv('DB_HOST') ?: 'localhost';
            $db   = getenv('DB_NAME') ?: 'defaultdb';
            $user = getenv('DB_USER') ?: 'doadmin';
            $pass = getenv('DB_PASS') ?: '';
            $port = getenv('DB_PORT') ?: '25060';

            // Optional SSL CA file path (DigitalOcean usually requires SSL)
            $ssl_options = [
                PDO::MYSQL_ATTR_SSL_CA => '/etc/ssl/certs/ca-certificates.crt',
                PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
            ];

            try {
                self::$connection = new PDO(
                    "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
                    $user,
                    $pass,
                    array_merge([
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                    ], $ssl_options)
                );
            } catch (PDOException $e) {
                die("Connection failed: " . $e->getMessage());
            }
        }
        return self::$connection;
    }
}
?>
