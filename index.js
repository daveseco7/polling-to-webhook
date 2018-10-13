const pollingManager = require('./pollingManager');


const evaluteTrue = function(response){
    console.log("positive evaluation");
    return true;
}

const evaluteFalse = function(response){
    console.log("negative evaluation");
    return false;
}

const options = {uri:'https://www.google.pt/', method: 'GET'};
const webhookOptions = {uri:'http://localhost:8000/', method: 'GET'};

pollingManager.registerPolling('key1', options, webhookOptions, evaluteTrue);
pollingManager.registerPolling('key2', options, webhookOptions, evaluteTrue);
pollingManager.registerPolling('key3', options, webhookOptions, evaluteTrue);
pollingManager.registerPolling('key4', options, webhookOptions, evaluteFalse);



// If you need to refresh tokens or headers,
// just add a new entry with the same key of the object you wish to refresh
function function2() {
    pollingManager.registerPolling('key4', options,  {uri:'https://www.google.pt/', method: 'GET'}, evaluteFalse);
}

setTimeout(function2, 120000);



//aceitar callback ou url do webhook
