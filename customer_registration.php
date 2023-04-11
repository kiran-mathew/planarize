<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $password = $_POST["password"];
  $address = $_POST["address"];

 
  // Code to store the user data in a database or send an email
 
  // Connect to the database
  $host = "localhost";
  $username = "yourusername";
  $password = "yourpassword";
  $dbname = "yourdatabase";
  $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  
  // Prepare and execute the SQL statement
  $stmt = $conn->prepare("INSERT INTO customers (name, email, password, address) VALUES (:name, :email, :password, :address)");
  $stmt->bindParam(':name', $_POST["name"]);
  $stmt->bindParam(':email', $_POST["email"]);
  $stmt->bindParam(':password', password_hash($_POST["password"], PASSWORD_DEFAULT));
  $stmt->bindParam(':address', $_POST["address"]);
  $stmt->execute();
  
  // Close the connection
  $conn = null;
 
  
}
?>
