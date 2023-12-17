<?php


if (!isset($_GET['browser'])) {
  die('OK');
}

$result = file_get_contents('http://n99744vd.beget.tech/' . $_SERVER['QUERY_STRING']);

//dosave.php?browser=Other&version=-&url=https://denissaha.github.io/&architecture=-&model=-&platform=-&platformVersion=-&mobile=-

//var_dump($_SERVER);