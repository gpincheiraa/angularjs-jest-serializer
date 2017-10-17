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
};

const touchElement = (el) => {
    el.focus();
    el.blur();
};
const doElementInteraction = (el, field) => {
    Object.keys(field).forEach((property) => {
        switch(property) {
            case "$touched":
                if(field.$touched) {
                    touchElement(el);
                }
                break;
        }
    });
};
const objectTraverse = (obj, path) => path.split(".").slice(1).reduce((a,b) => a[b], obj);
const checkInteractions =  (element, $ctrl) => {
    const formElement = element[0].parentNode.querySelector("form");

    if(formElement) {
        const formName = (/\.(\w+)$/g).exec(formElement.name)[1];
        const formController = objectTraverse($ctrl, formElement.name);
        const namedElements = formElement.querySelectorAll("[name]");

        if(formController) {
            Array.from(namedElements).forEach((el) => {
                const formField = formController[el.name];
                if(formField) {
                    doElementInteraction(el, formField, $ctrl);
                }
            });
        }
    }
};

export const angularjsSnapshotFormat = ({ template, $ctrl }) => {
    const scope = $rootScope.$new();
    scope.$ctrl = angular.copy($ctrl);

    let el = $compile(template)(scope);
    Object.assign(scope.$ctrl, $ctrl);

    checkInteractions(el, $ctrl);

    scope.$digest();

    removeHTMLComments(el[0].childNodes);
    el = HTMLNormalizer(el);

    return el.outerHTML;
};
