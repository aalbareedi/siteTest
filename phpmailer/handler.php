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
"Reply-To:" . filter_var($_POST["Email"], FILTER_SANITIZE_EMAIL) . "\r\n" . 
"From: Dr. John Los Site<customer@drjohnlos.com>";

$result = mail("aalbareedipaypal@yahoo.com", "Message from " . $_POST["Name"], $body, $headers);

// To test errors:
// $result = false;

echo json_encode([
    "result" => $result ? "success" : "error"
]);