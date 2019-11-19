import { Map } from "./types"
export const schemaValidation = (values: Map, schema: Map, schemaValidationKey: string | null = null) => {
  let tempSchema = schema

  if (schemaValidationKey) {
    tempSchema = Object.keys(schema).reduce((prev: object, key: string) => {
      return {
        ...prev,
        [key]: schema[key][schemaValidationKey]
      }
    }, {})
  }

  return Object.keys(tempSchema)
    .reduce((previous: Map, key: string) => {
      const obj = { ...previous }
      if (tempSchema[key] && tempSchema[key](values[key])) {
        obj[key] = tempSchema[key](values[key])
      }
      return obj
    }, {})

}