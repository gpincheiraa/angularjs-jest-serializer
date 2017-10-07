"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var removeHTMLComments = exports.removeHTMLComments = function removeHTMLComments(allChildrenNodes) {
    for (var i = 0; i < allChildrenNodes.length; i++) {
        if (allChildrenNodes[i].nodeType === 8) {
            allChildrenNodes[i].parentNode.removeChild(allChildrenNodes[i]);
        }
    }
    return allChildrenNodes;
};