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
       
    
      <h1 >PLANARIZE<span>	✿</span></h1>
    <div class="login-page">
      <div class="avatar">
        <img src="https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_960_720.png" alt="Avatar">
      </div>
      <div class="form">
        <h2>𝓛𝓞𝓖𝓘𝓝  ✿</h2>
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
        <p class="message">Not registered? <a href="register_as.html">Create an account</a></p>
        <p class="message">Forgot your password? <a href="#">Click here to reset it</a></p>
        <script src="loginadmin.js"></script>
      </div>
    </div>
  <!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
</body>
</html>
