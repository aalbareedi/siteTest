<?php
// if(filter_var($_GET["email"], FILTER_VALIDATE_EMAIL)) 

// GET array is automatically defined for you with the key/values from the query string
// calling mail function in PHP (target address, subject, body)
$body = "<b>Name: </b>" . htmlspecialchars($_GET["name"]) . 
"<br>" . "<b>Email: </b>" . htmlspecialchars($_GET["email"]) . 
"<br>" . "<b>Phone: </b>" . htmlspecialchars($_GET["phone"]) . 
"<br>" . "<b>Message: </b>" . htmlspecialchars($_GET["msg"]);

$headers = "MIME-Version:1.0\r\n" . 
"Content-type:text/html:charset=UTF-8\r\n" . 
"Reply-To:" . $_GET["email"] . "\r\n" . 
"From: Braces Specialist<vpnfg0lsvg6z@a2plcpnl0239.prod.iad2.secureserver.net>";

mail("albareedi@comcast.net", "Message from " . $_GET["name"], $body, $headers);


?>

