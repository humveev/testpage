// Thanks http://stackoverflow.com/questions/1638337/the-best-way-to-synchronize-client-side-javascript-clock-with-server-date

var serverTimeOffset = false;
function getServerTime(callback) {
    if (serverTimeOffset === false) {

        var scripts = document.getElementsByTagName("script"),
            URL = scripts[scripts.length - 1].src;

        var clientTimestamp = Date.parse(new Date().toUTCString());
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("HEAD", URL + "?noCache=" + Date.now(), true);
        xmlhttp.onload = function(){
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {

                    var serverDateStr = xmlhttp.getResponseHeader('Date');
                    var serverTimestamp = Date.parse(new Date(Date.parse(serverDateStr)).toUTCString());

                    var serverClientRequestDiffTime = serverTimestamp - clientTimestamp;
                    var nowTimeStamp  = Date.parse(new Date().toUTCString());

                    var serverClientResponseDiffTime = nowTimeStamp - serverTimestamp;
                    var responseTime = (serverClientRequestDiffTime - nowTimeStamp + clientTimestamp - serverClientResponseDiffTime )/2;

                    serverTimeOffset = (serverClientResponseDiffTime - responseTime);

                    var date = new Date();

                    date.setTime(date.getTime() + serverTimeOffset);

                    callback.call(null, date);
                } else {
                    console.error(xmlhttp.statusText);
                }
            }
        };
        xmlhttp.send(null);
        
    } else {
        var date = new Date();

        date.setTime(date.getTime() + serverTimeOffset);

        callback.call(null, date);
    }
}
