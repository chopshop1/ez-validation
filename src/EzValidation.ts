export class EZValidationAPI {
  hasError: boolean = false;

  constructor(public validating: any, public errorMessage?: string, public errorMessages: string[] = []) { }

  _returnError(errorMessage: string) {
    this.hasError = true;
    this.errorMessage = this.errorMessage || errorMessage;
    this.errorMessages.push(errorMessage)
  }

  required(errorMessage: string = "This is required") {
    if (
      this.validating === "" ||
      this.validating === undefined ||
      (Array.isArray(this.validating) && this.validating.length === 0)
    ) {
      this._returnError(errorMessage);
    }

    return this;
  }

  isString(errorMessage: string = "Needs to be a string") {
    if (typeof this.validating !== "string") {
      this._returnError(errorMessage);
    }

    return this;
  }

  isNumber(errorMessage: string = "Needs to be a number") {
    if (typeof this.validating !== "number" && this.validating !== "") {
      this._returnError(errorMessage);
    }

    return this;
  }

  isWholeNumber(errorMessage: string = "Needs to be a whole number") {
    if (isNaN(Number(this.validating)) || Number(this.validating) % 1 != 0) {
      this._returnError(errorMessage);
    }

    return this;
  }

  isBoolean(errorMessage: string = "Needs to be a true or false") {
    if (typeof this.validating !== "boolean") {
      this._returnError(errorMessage);
    }

    return this;
  }

  isEmpty(errorMessage: string = "Value is empty") {
    if (this.validating === null || this.validating === "") {
      this._returnError(errorMessage);
    }

    if (Array.isArray(this.validating) && this.validating.length === 0) {
      this._returnError(errorMessage);
    }

    if (
      typeof this.validating === "object" &&
      Object.keys(this.validating).length === 0
    ) {
      this._returnError(errorMessage);
    }

    return this;
  }

  isObject(errorMessage: string = "Not an object") {
    if (typeof this.validating !== "object") {
      this._returnError(errorMessage);
    }

    return this;
  }

  isAlphanumeric(errorMessage: string = "Must be Alphanumeric") {
    if (this.validating.match(/^[a-zA-Z0-9_]*$/i) === null) {
      this._returnError(errorMessage);
    }

    return this;
  }

  isEmail(errorMessage: string = "Must be valid Email") {
    if (this.validating.match(/\S+@\S+\.\S+/) === null) {
      this._returnError(errorMessage);
    }

    return this;
  }

  isPhoneNumber(errorMessage: string = "Must be valid Phone Number") {
    if (
      String(this.validating).match(
        /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/gm
      ) === null
    ) {
      this._returnError(errorMessage);
    }

    return this;
  }

  isUSAZipCode(errorMessage: string = "Must be valid Zip Code") {
    if (String(this.validating).match(/^[0-9]{5}(?:-[0-9]{4})?$/) === null) {
      this._returnError(errorMessage);
    }

    return this;
  }

  maxLength(
    max: number,
    errorMessage: string = `Exceeds maximum length of ${max.toString()}`
  ) {
    const str = this.validating.toString();
    if (str.length > max) {
      this._returnError(errorMessage);
    }

    return this;
  }

  minLength(
    min: number,
    errorMessage: string = `Value is below minimum length of ${min}`
  ) {
    const str = this.validating.toString();

    if (str.length < min) {
      this._returnError(errorMessage);
    }

    return this;
  }

  maxValue(
    max: number,
    errorMessage: string = `Value exceeds maximum value of ${max.toString()}`
  ) {
    const str = this.validating.toString();
    if (str > max) {
      this._returnError(errorMessage);
    }

    return this;
  }

  minValue(
    min: number,
    errorMessage: string = `Value is below minimum value of ${min.toString()}`
  ) {
    const str = this.validating.toString();

    if (str < min) {
      this._returnError(errorMessage);
    }

    return this;
  }

  customRegex(regex: any, errorMessage: string = `Value is invalid`) {
    if (this.validating.match(regex) === null) {
      this._returnError(errorMessage);
    }

    return this;
  }

  customValidation(cb: (validating: any) => boolean | string, errorMessage?: string) {
    const cbOutput = cb(this.validating)

    if (!cbOutput && errorMessage) {
      this._returnError(errorMessage);
    } else if (typeof (cbOutput) === "string") {
      this._returnError(cbOutput)
    }

    return this;
  }
}

export const EzValidation = (val: any, defaultErrorMessage?: string) => {
  return new EZValidationAPI(val, defaultErrorMessage);
};
