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
});

test(`should overwrite the FormController instance created by angularJS $compile
    function if the component definition set the given variable in the form name attribute`, () => {
        const componentDefinition = {
            template: `
                <form name="$ctrl.formName">
                    <label>Name: </label>
                    <input name="fieldName" ng-model="$ctrl.name" required>
                    <p ng-show="$ctrl.formName.fieldName.$touched">
                        The name field is required.
                    </p>
                </form>
                `,
            $ctrl: {
                formName: {
                    fieldName: {
                        $touched: true
                    }
                }
            }
        };
        //@TODO: In this example the input still remaining the ng-untouched class. This should be changed too.
        expect(angularjsSnapshotFormat(componentDefinition)).toMatchSnapshot();
    });
