<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// /*
// Tested working with PHP5.4 and above (including PHP 7 )

//  */
// require_once './vendor/autoload.php';

// use FormGuide\Handlx\FormHandler;


// $pp = new FormHandler(); 

// $validator = $pp->getValidator();
// $validator->fields(['Name','Email'])->areRequired()->maxLength(50);
// $validator->fields(['Subject'])->maxLength(50);
// $validator->field('Email')->isEmail();
// $validator->field('Message')->maxLength(6000);




// $pp->sendEmailTo('aalbareedi@yahoo.com'); // ← Your email here

// echo $pp->process($_POST);

$body = "<b>Name: </b>" . htmlspecialchars($_POST["Name"]) . 
"<br>" . "<b>Email: </b>" . htmlspecialchars($_POST["Email"]) . 
"<br>" . "<b>Phone: </b>" . htmlspecialchars($_POST["Phone"]) . 
"<br>" . "<b>Message: </b>" . htmlspecialchars($_POST["Message"]);

$headers = "MIME-Version:1.0\r\n" . 
"Content-type:text/html:charset=UTF-8\r\n" . 
"Reply-To:" . $_POST["Email"] . "\r\n" . 
"From: Braces Specialist<vpnfg0lsvg6z@a2plcpnl0239.prod.iad2.secureserver.net>";

mail("aalbareedi@yahoo.com", "Message from " . $_POST["Name"], $body, $headers);