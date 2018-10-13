function Polling(options, webhookOptions, evaluate) {
  if (options.uri === undefined || options.method === undefined) {
    throw new Error(`Invalid options to create a new Polling object`);
  }
  if (evaluate === undefined || typeof evaluate !== 'function') {
    throw new Error(`Invalid evaluate callback to create a new Polling object`);
  }
  if (webhookOptions.uri === undefined || webhookOptions.method === undefined) {
    throw new Error(`Invalid options to create a new Polling object`);
  }
  this.options = options;
  this.evaluate = evaluate;
  this.webhookOptions = webhookOptions;
};

module.exports.Polling = Polling;