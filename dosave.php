<?php


if (!isset($_GET['browser'])) {
  die('OK');
}
$queryString = str_replace( '&amp;', '&', $_SERVER['QUERY_STRING']);
//var_dump($queryString);

$context = stream_context_create(
  array(
      "http" => array(
          "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
      )
  )
);

$result = file_get_contents('http://n99744vd.beget.tech/save.php?' . $queryString, false, $context);

//dosave.php?browser=Other&version=-&url=https://denissaha.github.io/&architecture=-&model=-&platform=-&platformVersion=-&mobile=-

//var_dump($_SERVER);