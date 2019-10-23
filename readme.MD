[![Actions Status](https://github.com/Amad27/ez-validation/workflows/npm-publish/badge.svg)](https://github.com/Amad27/ez-validation/actions)

# Validation made Ez

> Who said Validation has to be hard and annoying!

<hr/>

  <details open><summary>API</summary>
  <p>

| Function         | Params                  | Description                                                                                                |
| ---------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| required         | errorMessage            | checks if value is empty or not                                                                            |
| isString         | errorMessage            | checks if value is a STRING                                                                                |
| isBoolean        | errorMessage            | checks if value is a BOOLEAN                                                                               |
| isNumber         | errorMessage            | checks if value is a INT                                                                                   |
| isWholeNumber    | errorMessage            | checks if value is a Whole Number                                                                          |
| isObject         | errorMessage            | checks if value is an OBJECT                                                                               |
| isEmpty          | errorMessage            | checks if value is an EMPTY                                                                                |
| isAlphanumeric   | errorMessage            | checks if value is Alphanumeric                                                                            |
| isEmail          | errorMessage            | checks if value is valid Email                                                                             |
| isPhoneNumber    | errorMessage            | checks if value is valid Phone Number                                                                      |
| isUSAZipCode     | errorMessage            | checks if value is valid USA Zip Code                                                                      |
| maxLength        | maxNumber, errorMessage | checks if value exceeds max length                                                                         |
| minLength        | minNumber, errorMessage | checks if value is below min length                                                                        |
| maxValue         | maxNumber, errorMessage | checks if value exceeds max number value                                                                   |
| minValue         | minNumber, errorMessage | checks if value is below min number value                                                                  |
| customRegex      |  regex, errorMessage    | pass in a custom regex                                                                                     |
| customValidation |  cb, errorMessage       | pass in a custom call back that returns a Boolean False if there is an error True is there is not an error |

  </p>
  </details>

<hr/>

  <details open><summary>Examples</summary>
  <p>

```javascript
import ezValidation from "util/ezValidation";

val = "asdf";
ezValidation(val).customValidation(
  val => (val == "asdf" ? false : true),
  "Please enter valid response"
).errorMessage;
// output = "Please enter valid response"

val = 123;
ezValidation(val)
  .isNumber("I am not a number")
  .maxValue(100, "Too large").errorMessage;
// output = "Too large"

val = "I am a large string";
ezValidation(val)
  .isString()
  .maxLength(4)
  .required().errorMessage;
// output = "Exceeds maximum length of  4"

val = "I am a large string";
ezValidation(val, "DEFAULT ERROR")
  .isString()
  .maxLength(4)
  .required().errorMessage;
// output = "DEFAULT ERROR"
```

  </p>
  </details>

<hr/>

  <details><summary>Advance Custom Usage</summary>
  <p>
  If you have a validation method that isn't provided thats used often you can extend the ValidationAPI class to add your own methods!

```javascript
import { EZValidationAPI } from "../src/EzValidation";

class CustomEzValidation extends EZValidationAPI {
  customMethod() {
    if (this.validating == 0) {
      this._returnError("value can't be 0");
    }
    return this;
  }
}
new CustomEZValidation(0).customMethod().errorMessage;
// "value can't be 0"
```

  </p>
  </details>
