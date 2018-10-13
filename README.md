# polling-to-webhoook
A simple way to implement a polling mechanism that triggers a webhook in response.

![](https://raw.githubusercontent.com/daveseco7/polling-to-webhoook/master/polling-to-webhook.png)

* cron expression config
    * location: _**config/default.json**_
    * content:
```
{
    "job": {
        "cron": "* * * * *"
    }
}
```


* callbacks to evaluate the response from the polling
```
const evaluteTrue = function(response){
    console.log("positive evaluation");
    return true;
}

const evaluteFalse = function(response){
    console.log("negative evaluation");
    return false;
}
```

* [request-promise](https://github.com/request/request-promise) __options__ that will be used for the polling and for the webhook response

```
const options = {uri:'https://www.google.pt/', method: 'GET'};
const webhookOptions = {uri:'http://localhost:8000/', method: 'GET'};
```


* simple use case of polling-2-webhook
```
const pollingManager = require('polling-to-webhook');
pollingManager.registerPolling('key1', options, webhookOptions, evaluteTrue);
pollingManager.registerPolling('key2', options, webhookOptions, evaluteTrue);
pollingManager.registerPolling('key3', options, webhookOptions, evaluteTrue);
pollingManager.registerPolling('key4', options, webhookOptions, evaluteFalse);

```
* If you need to refresh tokens or headers, just register a new object with the same key of the object you wish to update.
