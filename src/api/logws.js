var wsServer = document.location.href.replace("http", "ws") + "ws/";
var ws = new WebSocket(wsServer);
var logger = null;
var message = "";
setInterval(() => {
    if (logger) logger({
        Name: "fabwa@coz.org",
        Text: "[2019-08-27 19:39:05]<ConsensusService>: OnPrepareResponseReceived: height=3031946 view=0 index=0",
    });
}, 1000);
ws.onopen = function (e) {
    console.log("Connected to WebSocket server.",e);
    if (logger) {
        ws.send(message);
    }
};

ws.onclose = function (e) {
    console.log("Disconnected",e);
};

ws.onmessage = function(e) {
    let logbody = JSON.parse(e.data);
    if (logger) logger(logbody);
};

ws.onerror = function (e) {
    console.log('Error occured: ' + e.data,e);
};

exports.Regist = function(name, cb) {
    logger = cb;
    if (ws.readyState === ws.OPEN) {
        ws.send(name);
        return;
    }
    message = name;
};

exports.Close = function() {
    ws.close();
};