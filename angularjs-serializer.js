var { angularjsSnapshotFormat } = require("./angularjsSnapshotFormat");

module.exports = {
    test(wrapper) {
      //@TODO validations for entry format
      return true;
    },
    print(wrapper, serializer) {
      return angularjsSnapshotFormat(wrapper);
    },
 };
