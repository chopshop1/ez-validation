import { EzValidation, schemaValidation } from '../src';

const values = {
  noValidation: "hi",
  email: "fake-email",
  name: "im a cow",
}

const validationSchema = {
  email: (val: string) => EzValidation(val).isEmail().required().errorMessage,
  name: (val: string) => EzValidation(val).maxLength(2).errorMessage
}

const nestedValidationSchema = {
  email: {
    validate: validationSchema.email
  },
  name: {
    validate: validationSchema.name
  }
}

describe("util/schemaValidation", () => {
  it("validates values in schema and returns array of errors", () => {
    const validation = schemaValidation(values, validationSchema)

    expect(Object.keys(validation).length).toBe(2)
  })

  it("allows user to pass schemaValidationKey", () => {
    const validation = schemaValidation(values, nestedValidationSchema, "validate")

    expect(Object.keys(validation).length).toBe(2)
  })
})