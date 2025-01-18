import joi from 'joi'

const envVarsSchema = joi.object({
  VITE_USER_NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
  VITE_API_URL: joi.string().uri().required(),
}).unknown().required()

console.log(import.meta.env)

const { error, value: envVars } = envVarsSchema.validate(import.meta.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const config = {
  env: envVars.VITE_USER_NODE_ENV,
  apiUrl: envVars.VITE_API_URL,
}

