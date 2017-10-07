var { angularjsSnapshotFormat } = require("../src/angularjsSnapshotFormat");

test("should render a template that doesn't contains AngularJS directives", () => {
    const componentDefinition = {
        template: "<a>Serialize me!</a>",
        $ctrl: {}
    };
    expect(angularjsSnapshotFormat(componentDefinition)).toMatchSnapshot();
});

test("should replace the angular expressions on directives", () => {
    const componentDefinition = {
        template: `
            <div>
                <input ng-model="$ctrl.someValue"> {{ $ctrl.someValue }}
            </div>`,
        $ctrl: {
            someValue : "Hello AngularJS Serializer!"
        }
    };
    expect(angularjsSnapshotFormat(componentDefinition)).toMatchSnapshot();
});

test("should not replace the directives attributes that doesn't have an angular expression", () => {
    const componentDefinition = {
        template: `
            <div ui-view>
                <div class="well well-sm"
                     uib-datepicker
                     ng-model="$ctrl.someValue"
                     datepicker-options="$ctrl.options"></div>
            </div>`,
        $ctrl: {}
    };
    expect(angularjsSnapshotFormat(componentDefinition)).toMatchSnapshot();
})
