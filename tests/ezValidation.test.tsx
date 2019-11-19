import { EzValidation, EZValidationAPI } from "../src/EzValidation";

class CustomValidations extends EZValidationAPI {
  customMethod() {
    if (this.validating == 0) {
      this._returnError("value can't be 0");
    }
    return this;
  }
}

describe("util/ezValidationTest", () => {
  it("returns error messages if there are multiple errors", () => {
    const validation = EzValidation('3').isNumber().isString().isBoolean().isEmail().required().errorMessages

    expect(validation.length).toEqual(3)
  })

  it("testing custom validation", () => {
    const validation = new CustomValidations(0).customMethod().errorMessage

    expect(validation).toEqual("value can't be 0")
  })

  it("returns if EzValidation is a class", () => {
    const validation = EzValidation("test");
    expect(typeof validation).toEqual("object");
  });

  it("returns custom error message passed through", () => {
    const validation = EzValidation("test").isNumber("custom error message")
      .errorMessage;
    expect(validation).toEqual("custom error message");
  });

  it("returns custom primary error message passed through first", () => {
    const validation = EzValidation("test", "I am primary error message")
      .required("I am secondary error message")
      .isNumber("I am secondary error message too").errorMessage;
    expect(validation).toEqual("I am primary error message");
  });

  it("returns positive REQUIRED check", () => {
    const validation = EzValidation("hello").required().errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative REQUIRED check", () => {
    const validation = EzValidation("").required().hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive type STRING checks", () => {
    const validation = EzValidation("hello").isString().errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative type STRING checks", () => {
    const validation = EzValidation(3).isString().hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive type NUMBER checks", () => {
    const validation = EzValidation(2).isNumber().errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative type NUMBER checks", () => {
    const validation = EzValidation("2342").isNumber().hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive type WHOLENUMBER checks", () => {
    const validation = EzValidation(2).isWholeNumber().errorMessage;
    expect(validation).toEqual(undefined);

    const validation1 = EzValidation("2").isWholeNumber().errorMessage;
    expect(validation1).toEqual(undefined);
  });

  it("returns negative type WHOLENUMBER checks", () => {
    const validation = EzValidation(1.23).isWholeNumber().hasError;
    expect(validation).toEqual(true);
    const validation1 = EzValidation("2.23").isWholeNumber().hasError;
    expect(validation1).toEqual(true);
  });

  it("returns positive type BOOLEAN checks", () => {
    const validation = EzValidation(true).isBoolean().errorMessage;
    expect(validation).toEqual(undefined);
    const validation2 = EzValidation(false).isBoolean().errorMessage;
    expect(validation2).toEqual(undefined);
  });

  it("returns negative type BOOLEAN checks", () => {
    const validation = EzValidation("false").isBoolean().hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive type EMPTY checks", () => {
    const validation = EzValidation(["2341"]).isEmpty().errorMessage;
    expect(validation).toEqual(undefined);
    const validation2 = EzValidation({ key: "val" }).isEmpty().errorMessage;
    expect(validation2).toEqual(undefined);
    const validation3 = EzValidation("hello").isEmpty().errorMessage;
    expect(validation3).toEqual(undefined);
  });

  it("returns negative type EMPTY checks", () => {
    const validation = EzValidation([]).isEmpty().hasError;
    expect(validation).toEqual(true);
    const validation2 = EzValidation({}).isEmpty().hasError;
    expect(validation2).toEqual(true);
    const validation3 = EzValidation("").isEmpty().hasError;
    expect(validation3).toEqual(true);
  });

  it("returns positive type OBJECT checks", () => {
    const validation = EzValidation({ hi: "im'a object" }).isObject()
      .errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative type OBJECT checks", () => {
    const validation = EzValidation(123).isObject().hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive type isALPHANUMERIC checks", () => {
    const validation = EzValidation("asdfj1234jlasfj2").isAlphanumeric()
      .errorMessage;
    expect(validation).toEqual(undefined);
    const validation2 = EzValidation("").isAlphanumeric().errorMessage;
    expect(validation2).toEqual(undefined);
  });

  it("returns negative type isALPHANUMERIC checks", () => {
    const validation = EzValidation(
      "ASDF-SAF-*9(*@(#H9HF(SDFH@(5H928)))"
    ).isAlphanumeric().hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive type isEMAIL checks", () => {
    const validation = EzValidation("fake@fake.com").isEmail().errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative type isEMAIL checks", () => {
    const validation = EzValidation("fake").isEmail().hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive type isPHONENUMBER checks", () => {
    const validation = EzValidation("770-234-2342").isPhoneNumber()
      .errorMessage;
    expect(validation).toEqual(undefined);
    const validation2 = EzValidation("770-2342342").isPhoneNumber()
      .errorMessage;
    expect(validation2).toEqual(undefined);
    const validation3 = EzValidation(5555555559).isPhoneNumber().errorMessage
    expect(validation3).toEqual(undefined)
  });

  it("returns negative type isPHONENUMBER checks", () => {
    const validation = EzValidation("fake").isPhoneNumber().hasError;
    expect(validation).toEqual(true);
    const validation2 = EzValidation("7702-3-42342").isPhoneNumber().hasError;
    expect(validation2).toEqual(true);
    const validation3 = EzValidation("234567890123").isPhoneNumber().hasError;
    expect(validation3).toEqual(true);
  });

  it("returns positive type isUSAZipCode checks", () => {
    const validation = EzValidation("23422").isUSAZipCode().errorMessage;
    expect(validation).toEqual(undefined);
    const validation2 = EzValidation(12341).isUSAZipCode().errorMessage;
    expect(validation2).toEqual(undefined);
  });

  it("returns negative type isUSAZipCod checks", () => {
    const validation = EzValidation("234234234").isUSAZipCode().hasError;
    expect(validation).toEqual(true);
    const validation2 = EzValidation("asdf2").isUSAZipCode().hasError;
    expect(validation2).toEqual(true);
    const validation3 = EzValidation(12).isUSAZipCode().hasError;
    expect(validation3).toEqual(true);
  });

  it("returns positive MAXVALUE check", () => {
    const validation = EzValidation(100).maxValue(101).errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative MAXVALUE check", () => {
    const validation = EzValidation(100).maxValue(99).hasError;
    expect(validation).toEqual(true);
  });

  it("returns negative MAXVALUE check", () => {
    const validation = EzValidation(100).maxValue(99, "too large").hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive MINVALUE check", () => {
    const validation = EzValidation(100).minValue(10).errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative MINVALUE check", () => {
    const validation = EzValidation(5).minValue(10, "too small").hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive MAXLENGTH check", () => {
    const validation = EzValidation("This is a long string").maxLength(50)
      .errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative MAXLENGTH check", () => {
    const validation = EzValidation("This is a long string").maxLength(
      5,
      "string too long"
    ).hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive MINLENGTH check", () => {
    const validation = EzValidation(200).minLength(2).errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative MINLENGTH check", () => {
    const validation = EzValidation("hi").minLength(10, "length too short")
      .hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive custom regex", () => {
    const validation = EzValidation("hi").customRegex("hi").errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative custom regex", () => {
    const validation = EzValidation("hi").customRegex("no").hasError;
    expect(validation).toEqual(true);
  });

  it("returns positive custom validation", () => {
    const validation = EzValidation("hi").customValidation(
      (val: string) => val === "hi",
      "val is not hi"
    ).errorMessage;
    expect(validation).toEqual(undefined);
  });

  it("returns negative custom validation", () => {
    const validation = EzValidation("hi").customValidation(
      (val: string) => val !== "hi",
      "val is not hi"
    ).hasError;
    expect(validation).toEqual(true);
  });

  it("user can return string in customValidation, and string displays", () => {
    const errMsg = "this is an error";
    const validation = EzValidation("hi").customValidation(
      (val: string) => val === "hi" ? errMsg : false
    ).errorMessage;

    expect(validation).toEqual(errMsg);
  });
});
