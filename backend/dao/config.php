<?php
class Database {
   private static $host = 'localhost';
   private static $dbName = 'autoverse';
   private static $username = 'root';
   private static $password = '';
   private static $connection = null;


   public static function connect() {
       if (self::$connection === null) {
           try {
               self::$connection = new PDO(
                   "mysql:host=" . self::$host . ";port=3307;dbname=" . self::$dbName,

                   self::$username,
                   self::$password,
                   [
                       PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                       PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                   ]
               );
           } catch (PDOException $e) {
               die("Connection failed: " . $e->getMessage());
           }
       }
       return self::$connection;
   }
    // JWT Secret Key Definition
    public static function JWT_SECRET() {
           return 'SecureRandomString';
    }
}
?>
