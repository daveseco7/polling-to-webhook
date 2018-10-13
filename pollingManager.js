const Polling = require('./types/polling').Polling;
const schedule = require('node-schedule');
const config = require('config');
const rp = require('request-promise');

const map = new Map();
const cron = config.get('job.cron');


const performBatchPolling = function () {
    for (let key of map.keys()) {
        performPolling(key, map.get(key))
        .catch(err => { console.log(err.message) });;
    }
}

const performPolling = function (key, pollingObject) {
    return rp(pollingObject.options)
        .then(response => {
            if (pollingObject.evaluate(response)) {
                return triggerWebhook(key, pollingObject.webhookOptions)
                    .catch(err => { throw err; });
            }
        })
        .catch(err => { throw err; });
}

const triggerWebhook = function (key, options) {
    return rp(options)
        .then(map.delete(key))
        .catch(err => { throw err; });
}

// perform polling X in X sec
schedule.scheduleJob(cron, performBatchPolling);

module.exports = {
    registerPolling: function (key, options, webhookOptions, evaluate) {
        map.set(key, new Polling(options, webhookOptions, evaluate));
    }
};