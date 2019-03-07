class Validation {
  hasError: boolean = false;

  constructor(public validating: any, public errorMessage?: string) {}

  private _returnError(errorMessage: string) {
    this.hasError = true;
    this.errorMessage = this.errorMessage || errorMessage;
  }

  public required(errorMessage: string = "This is required") {
    if (
      this.validating === "" ||
      this.validating === undefined ||
      (Array.isArray(this.validating) && this.validating.length === 0)
    ) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public isString(errorMessage: string = "Needs to be a string") {
    if (typeof this.validating !== "string") {
      this._returnError(errorMessage);
    }

    return this;
  }

  public isNumber(errorMessage: string = "Needs to be a number") {
    if (typeof this.validating !== "number" && this.validating !== "") {
      this._returnError(errorMessage);
    }

    return this;
  }

  public isWholeNumber(errorMessage: string = "Needs to be a whole number") {
    if (typeof this.validating !== "number" || this.validating % 1 != 0) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public isBoolean(errorMessage: string = "Needs to be a true or false") {
    if (typeof this.validating !== "boolean") {
      this._returnError(errorMessage);
    }

    return this;
  }

  public isEmpty(errorMessage: string = "Value is empty") {
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

  public isObject(errorMessage: string = "Not an object") {
    if (typeof this.validating !== "object") {
      this._returnError(errorMessage);
    }

    return this;
  }

  public isAlphanumeric(errorMessage: string = "Must be Alphanumeric") {
    if (this.validating.match(/^([0-9]|[a-z])+([0-9a-z]+)$/i) === null) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public isEmail(errorMessage: string = "Must be valid Email") {
    if (this.validating.match(/\S+@\S+\.\S+/) === null) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public isPhoneNumber(errorMessage: string = "Must be valid Phone Number") {
    if (
      this.validating.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      ) === null
    ) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public maxLength(
    max: number,
    errorMessage: string = `Exceeds maximum length of ${max.toString()}`
  ) {
    const str = this.validating.toString();
    if (str.length > max) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public minLength(
    min: number,
    errorMessage: string = `Value is below minimum length of ${min}`
  ) {
    const str = this.validating.toString();

    if (str.length < min) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public maxValue(
    max: number,
    errorMessage: string = `Value exceeds maximum value of ${max.toString()}`
  ) {
    const str = this.validating.toString();
    if (str > max) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public minValue(
    min: number,
    errorMessage: string = `Value is below minimum value of ${min.toString()}`
  ) {
    const str = this.validating.toString();

    if (str < min) {
      this._returnError(errorMessage);
    }

    return this;
  }

  public customValidation(
    cb: (validating: any) => boolean,
    errorMessage: string
  ) {
    if (!cb(this.validating)) {
      this._returnError(errorMessage);
    }

    return this;
  }
}

export const EzValidation = (val: any, defaultErrorMessage?: string) => {
  return new Validation(val, defaultErrorMessage);
};
