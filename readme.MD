### Validation made Ez

Who said Validation has to be hard and annoying - Ware2Go 2019

>I should not have to do this much work to validate something - Maddie Doetsch Ware2Go 2019

| Function |Params| Description |
| ------------- |-------------| -----|
|required| errorMessage|	checks if value is empty or not	|
|isString|errorMessage|checks if value is a STRING	|
|isBoolean|errorMessage|checks if value is a BOOLEAN|
|isNumber|errorMessage|checks if value is a INT	|
|isWholeNumber|errorMessage|checks if value is a Whole Number|
|isObject|errorMessage|	checks if value is an OBJECT|	
|isEmpty|errorMessage|	checks if value is an EMPTY|	
|isAlphanumeric|errorMessage|checks if value is Alphanumeric|
|isEmail|errorMessage|checks if value is valid Email|
|isPhoneNumber|errorMessage|checks if value is valid Phone Number|
|maxLength|maxNumber, errorMessage|checks if value exceeds max length	|
|minLength|minNumber, errorMessage|checks if value is below min length	|
|maxValue|maxNumber, errorMessage|checks if value exceeds max number value|
|minValue|minNumber, errorMessage|checks if value is below min number value	|
|customValidation| cb, errorMessage	| pass in a custom call back that returns a Boolean False if there is an error True is there is not an error|




#### Examples:

```javascript
import ezValidation from "util/ezValidation"

val = "asdf"
ezValidation(val).customValidation((val) => val == "asdf" ? false : true, "Please enter valid response").errorMessage
// output = "Please enter valid response"

val = 123
ezValidation(val).isNumber("I am not a number").maxValue(100, "Too large").errorMessage
// output = "Too large"

val = "I am a large string"
ezValidation(val).isString().maxLength(4).required()
// output = "Exceeds maximum length of  4"

val = "I am a large string"
ezValidation(val, "DEFAULT ERROR").isString().maxLength(4).required()
// output = "DEFAULT ERROR"
````