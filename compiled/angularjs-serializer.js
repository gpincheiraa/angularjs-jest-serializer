"use strict";

var _require = require("./angularjsSnapshotFormat"),
    angularjsSnapshotFormat = _require.angularjsSnapshotFormat;

module.exports = {
  test: function test(wrapper) {
    //@TODO validations for entry format
    return wrapper.hasOwnProperty("template") && wrapper.hasOwnProperty("$ctrl");
  },
  print: function print(wrapper, serializer) {
    return angularjsSnapshotFormat(wrapper);
  }
};