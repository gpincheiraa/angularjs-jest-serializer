# angularjs-jest-serializer
[travis-image]: https://api.travis-ci.org/gpincheiraa/angularjs-jest-serializer.svg?branch=master
[travis-url]: https://travis-ci.org/gpincheiraa/angularjs-jest-serializer

[![Build Status][travis-image]][travis-url]

This is a serializer for compile AngularJS templates with components scope for generate
snapshots for testing.

#### Install it
```
npm install --save-dev  github:gpincheiraa/angularjs-jest-serializer
```

#### Add it to your jest config
```json
"jest": {
  "snapshotSerializers": ["angularjs-jest-serializer"]
}
```
