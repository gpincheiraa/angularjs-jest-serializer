var { angularjsSnapshotFormat } = require("./angularjsSnapshotFormat");

module.exports = {
    test(wrapper) {
      //@TODO validations for entry format
      return wrapper.hasOwnProperty("template") && wrapper.hasOwnProperty("$ctrl");
    },
    print(wrapper, serializer) {
      return angularjsSnapshotFormat(wrapper);
    },
 };
