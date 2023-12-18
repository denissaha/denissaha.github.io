function doSave(queryString) {
  if (location.href.indexOf('localhost') !== -1) {
    httpGetAsync('../localhostsave.php' + getQuery, getCallback);
  } else {
    httpGetAsync('https://denissaha.000webhostapp.com/save.php' + getQuery, getCallback);
  }
}

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
  "bitness",
  "formFactor",
  "uaFullVersion",
  "wow64",
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
          getQuery += '&url=' + window.location.origin;
          getQuery += '&ua=' + navigator.userAgent;
          getQuery += '&navplatform=' + navigator.platform;
          getQuery += '&userAgentData=' + JSON.stringify(userAgentData);
          return true;
        }
      });
    }
    if (getQuery != '') {
      console.log(getQuery);
      doSave(getQuery);
    }
  }); 
  console.log('Added start query from ' + window.location.href + '.');
} else {
  console.log('No user agent!');
}