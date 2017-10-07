"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.angularjsSnapshotFormat = undefined;

var _angular = require("angular");

var _angular2 = _interopRequireDefault(_angular);

var _domAttributesList = require("./domAttributesList");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var angularInjector = _angular2.default.injector(["ng"]);
var $compile = angularInjector.get("$compile");
var $rootScope = angularInjector.get("$rootScope");

var HTMLNormalizer = function HTMLNormalizer(element) {
    var allChildrenElements = element[0].getElementsByTagName("*");

    [].concat(_toConsumableArray(allChildrenElements)).forEach(function (child) {
        [].concat(_toConsumableArray(child.attributes)).forEach(function (attr) {
            if (attr.value && _domAttributesList.domAttributesList.indexOf(attr.name) === -1) {
                attr.value = "[ngExpression]";
            }
        });
    });
    return element[0];
};

var angularjsSnapshotFormat = exports.angularjsSnapshotFormat = function angularjsSnapshotFormat(_ref) {
    var template = _ref.template,
        $ctrl = _ref.$ctrl;

    var scope = $rootScope.$new();
    scope.$ctrl = $ctrl;

    var el = $compile(template)(scope);
    scope.$digest();

    (0, _utils.removeHTMLComments)(el[0].childNodes);
    el = HTMLNormalizer(el);

    return el.outerHTML;
};