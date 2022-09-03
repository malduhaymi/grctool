<?php
error_reporting(0);


$url=$_GET['url'];
//echo $url;
$url=utf8_decode(urldecode($url));
//echo $url ;
if($url!=""){
$handle = fopen("cybersecurityfiles.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
    	$arrayline=explode("||",$line);
        if($arrayline[0]==$url){
        	echo $arrayline[1];
            // save http request in file 
                $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    
$myfile = fopen("logs.txt", "a");
$txt = "Req URL: ".$url. " Resp URL: ".$arrayline[1]." Client IP: ".$ipaddress."\n";
fwrite($myfile, $txt);

        	break;
        }
    }

    fclose($handle);
}
}

//echo "http:127.0.0.1/grc/2.pdf";


?>