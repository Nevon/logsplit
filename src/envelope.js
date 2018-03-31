const envelope = (reference, message) => ({
  $reference: reference,
  $item: message
});

module.exports = envelope;
