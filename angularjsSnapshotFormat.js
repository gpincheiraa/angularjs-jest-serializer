import "angular";
import "angular-mocks";
import { domAttributesList } from "./domAttributesList"
import { removeHTMLComments } from "./utils"

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
    let el;
    inject(($compile, $rootScope) => {
        const scope = $rootScope.$new();
        scope.$ctrl = $ctrl;
        el = $compile(template)(scope);
        scope.$digest();

        removeHTMLComments(el[0].childNodes);
        el = HTMLNormalizer(el);
    });
    return el.outerHTML;
}
