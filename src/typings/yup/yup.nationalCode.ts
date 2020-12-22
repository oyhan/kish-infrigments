
import * as Yup from 'yup';
import { isValidNationalCode, isValidMobileNumber } from '../../infrastructure/validators';


// Yup.addMethod(Yup.stri, ‘methodName’, function(anyArgsYouNeed) {
//     const { message } = anyArgsYouNeed;
//     return this.test(‘test-name’, message, function(value) {
//         const { path, createError } = this;
//         const { some, more, args } = anyArgsYouNeed;
//         // [value] - value of the property being tested
//         // [path]  - property name,
//         // ...
//         return someCondition || conditionTwo || createError(...);
//     });
// });

 Yup.addMethod<Yup.StringSchema<string>>(Yup.string, "nationalCode", function (message: string) {

    return this.test("isValidNationalCode", message, function (value: string) {
        const { path, createError } = this;
        return isValidNationalCode(value);
    });
});
Yup.addMethod<Yup.StringSchema<string>>(Yup.string, "mobileNumber", function (message: string) {

    return this.test("isValidMobileNumber", message, function (value: string) {
        const { path, createError } = this;
        return isValidMobileNumber(value);
    });
});
