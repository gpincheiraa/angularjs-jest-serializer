import { removeHTMLComments } from "../src/utils";

test("Should remove the comment elements in a given NodeList", () => {

    const bodyElement = document.querySelector("body");
    const divWithComments = document.createElement("div");
    divWithComments.innerHTML = `
        <!-- A annoying comment -->
        <div> <a> Remove the comments please" </a> </div>
    `;
    bodyElement.appendChild(divWithComments);

    removeHTMLComments(divWithComments.childNodes);

    expect(divWithComments.innerHTML).toMatchSnapshot();
})
