export const removeHTMLComments = (allChildrenNodes) => {
    for(let i = 0; i < allChildrenNodes.length ; i++) {
        if(allChildrenNodes[i].nodeType === 8) {
            allChildrenNodes[i].parentNode.removeChild(allChildrenNodes[i]);
        }
    }
    return allChildrenNodes;
};
