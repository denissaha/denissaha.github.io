function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getCallback(text) {
  //div = document.getElementById('info-div').innerText = 'Отправлено. ID записи = ' + text;
}

var hints = [
  "architecture",
  "model",
  "platform",
  "platformVersion",
  "fullVersionList",
];
var getQuery = '';
if (navigator.userAgentData) {
  navigator.userAgentData.getHighEntropyValues(hints).then((userAgentData) => {
    if (userAgentData.fullVersionList) {
      console.log(userAgentData);
      userAgentData.fullVersionList.forEach(element => {
        if (element.brand && element.brand == 'Google Chrome') {
          getQuery = getQuery + (getQuery == '' ? '?' : '&') + 'browser=' + element.brand + '&version=' + element.version;
          getQuery += '&url=' + window.location.href;
          getQuery += '&architecture=' + userAgentData.architecture;
          getQuery += '&model=' + userAgentData.model;
          getQuery += '&platform=' + userAgentData.platform;
          getQuery += '&platformVersion=' + userAgentData.platformVersion;
          getQuery += '&mobile=' + userAgentData.mobile;
          return true;
        }
      });
    }
    if (getQuery != '') {
      $.ajax({
        console.log('AJAX!');
        url: 'http://n99744vd.beget.tech/save.php' + getQuery
      });
      //httpGetAsync('http://n99744vd.beget.tech/save.php' + getQuery, getCallback);
    }
  }); 
  console.log('Added start query from ' + window.location.href + '.');
} else {
  console.log('No user agent!');
}
if (getQuery == '') {
  console.log('Empty getQuery! Adding a Other browser start.');
  //Mozilla || Safari || OPera || Yandex || IE || ...
  getQuery = getQuery + (getQuery == '' ? '?' : '&') + 'browser=Other&version=-';
  getQuery += '&url=' + window.location.href;
  getQuery += '&architecture=-';
  getQuery += '&model=-';
  getQuery += '&platform=-';
  getQuery += '&platformVersion=-';
  getQuery += '&mobile=-';
  //httpGetAsync('http://n99744vd.beget.tech/save.php' + getQuery, getCallback);
  $.ajax({
     console.log('AJAX No Chrome!');
     url: 'http://n99744vd.beget.tech/save.php' + getQuery
  });
    
}
