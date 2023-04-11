<?php include('server.php') ?>
<!DOCTYPE html>

<html>
  <head>
    <title>Login Page</title>
    <link rel="stylesheet" type="text/css" href="style1.css">
    <script src="loginadmin.js"></script>
  </head>
  <body>
    <header id="header" class="fixed-top ">
       
    
      <h1 >PLANARIZE<span>✿</span></h1>
    <div class="login-page">
      <div class="avatar">
        <img src="https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_960_720.png" alt="Avatar">
      </div>
      <div class="form">
        <h2>𝓛𝓞𝓖𝓘𝓝 ✿</h2>
        <form method="post" action="login.php">
  	<?php include('errors.php'); ?>
	  <div class="input-group">
          <input type="text" placeholder="Username" name="username">
      </div>
	  <div class="input-group">
          <input type="password" name="password" placeholder="Password" >
          </div>
<div class="input-group">
          <button id="login"class="btn" name="login_user">Log in</button>
      </div>
        </form>
        <p class="message">Not registered? <a href="http://localhost/planerize/register_as.php">Create an account</a></p>
        <p class="message">Forgot your password? <a href="#">Click here to reset it</a></p>
        <script src="loginadmin.js"></script>
      </div>
    </div>
  </body>
</html>
