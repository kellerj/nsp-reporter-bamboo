# nsp-reporter-mocha

[![npm](https://img.shields.io/npm/v/nsp-reporter-mocha.svg)](https://www.npmjs.com/package/nsp-reporter-mocha)
[![Travis CI](https://img.shields.io/travis/kellerj/nsp-reporter-mocha/master.svg)](https://travis-ci.org/kellerj/nsp-reporter-mocha)
![node](https://img.shields.io/node/v/nsp-reporter-mocha.svg)
[![License](https://img.shields.io/npm/l/nsp-reporter-mocha.svg)](https://github.com/kellerj/nsp-reporter-mocha/blob/master/LICENSE)


Mocha json-compatible reporter for the Node Security Project (nsp)

See the [nsp](https://github.com/nodesecurity/nsp) website for more information.

### Sample Output

```json
{
  "stats": {
    "tests": 1,
    "passes": 0,
    "failures": 1,
    "duration": 1176,
    "start": "2017-11-27T22:50:36.092Z",
    "end": "2017-11-27T22:50:37.268Z"
  },
  "failures": [
    {
      "title": "Regular Expression Denial of Service",
      "fullTitle": "undefined Regular Expression Denial of Service",
      "duration": 0,
      "errorCount": 1,
      "error": "Module debug has a known vulnerability: \"Regular Expression Denial of Service\" (vulnerable: <= 2.6.8 || >= 3.0.0 <= 3.0.1, patched: >= 2.6.9 < 3.0.0 || >= 3.1.0, yours: 2.6.8), see https://nodesecurity.io/advisories/534"
    }
  ],
  "passes": [],
  "skipped": []
}
```