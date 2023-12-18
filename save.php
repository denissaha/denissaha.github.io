<?php


if (!isset($_GET['browser'])) {
  die('OK');
}

include "safemysql.class.php";
function isLocalhost($whitelist = ['127.0.0.1', '::1']) {
  return in_array($_SERVER['REMOTE_ADDR'], $whitelist);
}
if (isLocalhost()) {
  $opts = array(
    'user'    => 'admin',
    'pass'    => '123',
    'db'      => 'userbrowserlog',
    'charset' => 'utf8'
  );
} else {
  $opts = array(
    'user'    => 'id21681915_admin',
    'pass'    => '2v6Y&1EO1',
    'db'      => 'id21681915_userbrowserlog',
    'charset' => 'utf8'
  );
}
$db = new SafeMySQL($opts); // with some of the default settings overwritten

$ip = '0.0.0.0';
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
  $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
  $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
  $ip = $_SERVER['REMOTE_ADDR'];
}

$url = trim($_GET['url']);
$browser = trim($_GET['browser']);
$version = trim($_GET['version']);
$mobile = intval(trim($_GET['mobile']));
$userAgentData = json_decode(trim($_GET['userAgentData']));
var_dump($userAgentData);
$ua = trim($_GET['ua']);
$secchua = '';
foreach ($userAgentData->brands as $item) {
  $secchua .= '"' . $item->brand . '";v="' . $item->version . '";';
}
$uaFullVersion = $userAgentData->uaFullVersion;
$notabrand = $userAgentData->brands[0]->version;
$navplatform = trim($_GET['navplatform']);
$platform = $userAgentData->platform;
$platformversion = $userAgentData->platformVersion;
$fullversionlist = json_encode($userAgentData->fullVersionList);
$brands = json_encode($userAgentData->brands);
$sql  = "
  INSERT INTO `visitors` 
  SET `ip`=?s, 
  `datetime`=CONCAT(CURDATE(), ' ', CURTIME()), 
  `url` = ?s, 
  `browser` = ?s, 
  `version` = ?s, 
  `mobile` = ?i,
  `ua` = ?s,
  `secchua` = ?s,
  `uafullversion` = ?s,
  `notabrand` = ?s,
  `navplatform` = ?s,
  `platform` = ?s,
  `platformversion` = ?s,
  `fullversionlist` = ?s,
  `brands` = ?s
";
$db->query($sql, 
  $ip, 
  $url, 
  $browser, 
  $version, 
  $mobile,
  $ua,
  $secchua,
  $uaFullVersion,
  $notabrand,
  $navplatform,
  $platform,
  $platformversion,
  $fullversionlist,
  $brands
);

echo $db->insertId();

 