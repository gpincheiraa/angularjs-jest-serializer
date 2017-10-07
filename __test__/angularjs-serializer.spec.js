const defaultWrapper = {
    template: "<a>Render Me</a>",
    $ctrl: {
        someValue: 1
    }
};
const wrongWrapper = { template: "" };

test("should use angularjsSnapshotFormat for print the snapshot output", () => {
    const spy = jest.fn();
    const mock = jest.mock("../src/angularjsSnapshotFormat", (cb) => ({
        angularjsSnapshotFormat: spy
    }));
    const { print } = require("../src/angularjs-serializer");

    print(defaultWrapper);

    expect(spy).toHaveBeenCalledWith(defaultWrapper);
});

test("should test if the passed wrapper have the desired object definition", () => {
    const { test } = require("../src/angularjs-serializer");

    expect(test(defaultWrapper)).toBe(true);
    expect(test(wrongWrapper)).toBe(false);
});
