const bytes = message => ~-encodeURI(message).split(/%..|./).length;
const size = message => bytes(JSON.stringify(message));

module.exports = size;
