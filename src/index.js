const { assign, keys } = Object;

const envelope = require("./envelope");
const approximateSize = require("./size");
const computeOptions = require("./options");

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
      if (shouldBeExtracted(message)) {
        console.warn(
          "[Logsplit] Unsplittable large item encountered (%d bytes, maxByteSize is %d): %j",
          approximateSize(message),
          maxByteSize,
          message
        );
      }
      return message;
    }

    const references = Array.isArray(message)
      ? message.map(split)
      : keys(message).reduce(
          (acc, key) =>
            assign({}, acc, {
              [key]: split(message[key])
            }),
          {}
        );

    return shouldBeExtracted(references) ? extract(references) : references;
  };

  return split;
};

module.exports = createLogSplitter;
