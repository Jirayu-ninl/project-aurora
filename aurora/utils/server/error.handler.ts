import { env } from '@aurora/env.mjs'

const ErrorHandler = (e: any) => {
  let message: string = 'Database connection failed'
  if (
    typeof e === 'object' &&
    e &&
    'message' in e &&
    typeof e.message === 'string'
  ) {
    if (env.NODE_ENV !== 'production') console.log(e)
    message = e.message
  }
  return message
}

export { ErrorHandler }
