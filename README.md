# Logsplit

Takes large objects and splits them into small chunks for separate logging, with easily followable references.

## Example

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

## <a name="installation"></a> Installation

#### NPM

```sh
npm install logsplit --save
# yarn add logsplit
```

## <a name="usage"></a> Usage

`logsplit` takes a logging function and an optional options object.

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

## License

See [LICENSE](https://github.com/Nevon/logsplit/blob/master/LICENSE) for more details.
