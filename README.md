[![Logsplit](https://raw.githubusercontent.com/Nevon/logsplit/master/logo.png)](https://github.com/Nevon/logsplit)

[![Build Status](https://travis-ci.org/Nevon/logsplit.svg?branch=master)](https://travis-ci.org/Nevon/logsplit)

# Logsplit

Takes large objects and splits them into small chunks for separate logging, with easily followable references.

## <a name="example"></a> Example

```javascript
const createLogSplitter = require("logsplit");
const logsplit = createLogSplitter(console.log);

const message = {
  author: "Tommy Brunn",
  packages: [
    {
      name: "express-physical",
      url: "https://github.com/Nevon/express-physical"
      // additional fields making this object very large
    }
  ]
};

console.log(logsplit(message));

// `logsplit` returns this object, which contains a reference to the extracted
// large object:
// {
//     author: 'Tommy Brunn',
//     packages: 'Log-Reference-e44ab504-2202-4879-87ba-66c30ab7cf4f'
// }

// Additionally, the extracted object gets logged separately:
// {
//     $reference: 'Log-Reference-e44ab504-2202-4879-87ba-66c30ab7cf4f',
//     $item: [
//         {
//             name: 'express-physical',
//             url: 'https://github.com/Nevon/express-physical'
//             // additional fields making this object very large
//         }
//     ]
// }
```

## <a name="motivation"></a> Motivation

For debugging purposes, I find it very useful to log all data that was used in my system. For example, request and response bodies in a web service. However, [due to limitations in logging tools](https://github.com/moby/moby/pull/35831), it's not always desirable to log the entire payload in a single message.

As it is impossible to know up front what parts of your data will be important until after you need it, Logsplit helps you to log a high level message while separately logging the details for when you need them.

## <a name="installation"></a> Installation

```sh
npm install logsplit --save
# yarn add logsplit
```

## <a name="usage"></a> Usage

`createLogSplitter` takes a logging function and an optional options object, and returns a function (`logsplit`).

```javascript
const createLogSplitter = require("logsplit");

const logFunction = message =>
  console.info(`Extracted log item ${message.$reference}: %j`, message);
const options = {
  // maximum approximate object size for extraction
  maxByteSize: 1500,
  // generate the reference string to replace the large object with
  createReference: item => `Log-Reference-${uuid()}`
};

const logsplit = createLogSplitter(logFunction, options);

console.log(logsplit(message));
```

### <a name="express-middleware"></a> Express Middleware

Logsplit can be used as an Express middleware for doing request/response body logging. If you are interested in this use case, [open an issue](https://github.com/Nevon/logsplit/issues/new).

## <a name="license"></a> License

See [LICENSE](https://github.com/Nevon/logsplit/blob/master/LICENSE) for more details.

### <a name="attribution"></a> Attributions

* [Design Credits: www.Vecteezy.com](https://www.Vecteezy.com/)
