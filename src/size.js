const isNode = !!Buffer;

const character = /%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./;
const bytes = message => ~-encodeURI(message).split(character).length;
const sizeByStringSplit = message => bytes(JSON.stringify(message));

const sizeByBuffer = message =>
  Buffer.byteLength(JSON.stringify(message), "utf8");

/**
 * Calculating size using `Buffer.byteLength` is much
 * faster than splitting by regex and getting the length,
 * so we do that when available.
 *
 * https://github.com/Nevon/logsplit/pull/1
 */

module.exports = isNode ? sizeByBuffer : sizeByStringSplit;
