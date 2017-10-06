import angular from "angular";
import { domAttributesList } from "./domAttributesList"
import { removeHTMLComments } from "./utils"

const angularInjector = angular.injector(["ng"]);
const $compile = angularInjector.get("$compile");
const $rootScope = angularInjector.get("$rootScope");

const HTMLNormalizer = (element) => {
    const allChildrenElements = element[0].getElementsByTagName("*");

    [...allChildrenElements].forEach((child) => {
		[...child.attributes].forEach((attr) => {
			if(attr.value && domAttributesList.indexOf(attr.name) === -1) {
                attr.value = "[ngExpression]";
            }
		});
	});
    return element[0];
}

export const angularjsSnapshotFormat = ({ template, $ctrl }) => {
    const scope = $rootScope.$new();
    scope.$ctrl = $ctrl;

    let el = $compile(template)(scope);
    scope.$digest();

    removeHTMLComments(el[0].childNodes);
    el = HTMLNormalizer(el);

    return el.outerHTML;
}
