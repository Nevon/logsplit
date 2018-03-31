const uuidv4 = require("uuid/v4");

const DEFAULT_OPTIONS = {
  maxByteSize: 1500,
  createReference: () => `Log-Reference-${uuidv4()}`
};

module.exports = configuration =>
  Object.assign({}, DEFAULT_OPTIONS, configuration);
