<?php

class HttpError extends Error
{
}

try {
    // if(filter_var($_GET["email"], FILTER_VALIDATE_EMAIL)) 

    // GET array is automatically defined for you with the key/values from the query string
    // calling mail function in PHP (target address, subject, body)
    $body = "<b>Name: </b>" . htmlspecialchars($_GET["name"]) .
        "<br>" . "<b>Email: </b>" . htmlspecialchars($_GET["email"]) .
        "<br>" . "<b>Message: </b>" . htmlspecialchars($_GET["msg"]);

    $headers = "MIME-Version:1.0\r\n" .
        "Content-type:text/html:charset=UTF-8\r\n" .
        "Reply-To:" . $_GET["email"] . "\r\n" .
        "From: My Site Form<y1vsee023uqa@a2plcpnl0481.prod.iad2.secureserver.net>";

    $result = mail("aalbareedi@yahoo.com", "Message from " . $_GET["name"], $body, $headers);

    if (!$result) {
        throw new HttpError("Sending failed.", 500);
    }

    http_response_code(200);
    echo json_encode([
        "message" => "Message sent successfully!"
    ]);
} catch (HttpError $error) {
    http_response_code($error->getCode());
    echo json_encode([
        "error" => $error->getMessage()
    ]);
} catch (Exception $error) {
    http_response_code(500);
    echo json_encode([
        "error" => "Something went wrong. Try again later."
    ]);
}
