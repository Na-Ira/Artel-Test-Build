<?php
// PHPMailer files
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

// Variables that the user sends
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Forming email
$title = "Email from John Doe";
$body  = "<b>Name:</b> $name <br />";
$body .= "<b>Email:</b> $email <br />";
$body .= "<b>Message:</b> $message <br />";
$body .= "Thank you!";

// PHPMailer settings
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
   $mail->isSMTP();
   $mail->CharSet = "UTF-8";
   $mail->SMTPAuth   = true;
   //$mail->SMTPDebug = 2;
   $mail->Debugoutput = function ($str, $level) {
      $GLOBALS['status'][] = $str;
   };

   // Email setting
   $mail->Host       = 'smtp.gmail.com'; // SMTP server
   $mail->Username   = 'your_login'; // Your email login
   $mail->Password   = 'password_in_app'; // Password in the mail server settings (gmail or other) (Application passwords)
   $mail->SMTPSecure = 'ssl';
   $mail->Port       = 465;
   $mail->setFrom('test@gmail.com', 'Test'); // Email address & sender name
   // Email recipients
   $mail->addAddress('narinaua@gmail.com');

   // Sending email
   $mail->isHTML(true);
   $mail->Subject = $title;
   $mail->Body = $body;

   // Checking sending email
   if ($mail->send()) {
      header('Location: result.php');
      exit();
   } else {
      $result = "error";
   }
} catch (Exception $e) {
   echo 'Message could not be sent.';
   echo 'Mailer Error: ' . $mail->ErrorInfo;
}
