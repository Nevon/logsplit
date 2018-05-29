const envelope = require("./envelope");
const approximateSize = require("./size");
const computeOptions = require("./options");
const { forEach, forEachKey } = require("./collections");

const createLogSplitter = (log, options = {}) => {
  const { maxByteSize, createReference } = computeOptions(options);

  const shouldBeExtracted = object => approximateSize(object) >= maxByteSize;

  const extract = message => {
    const reference = createReference(message);
    log(envelope(reference, message));
    return reference;
  };

  const split = message => {
    if (typeof message !== "object" || !message) {
      return message;
    }

    const references = Array.isArray(message)
      ? forEach(message, split)
      : forEachKey(message, split);

    return shouldBeExtracted(references) ? extract(references) : references;
  };

  return split;
};

module.exports = createLogSplitter;
