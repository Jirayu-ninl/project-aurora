'use server'

import { v4 as uuidv4 } from 'uuid'
import Prisma from '@aurora/libs/database/prisma'
import { CredentialsSignIn } from '@aurora/libs/auth/credentials'
import { ErrorHandler } from '@aurora/utils/server/error'

const SignIn: (c: { email: string; password: string }) => Promise<{
  session?: string
  error?: string
} | void> = async (credential) => {
  try {
    const res = await CredentialsSignIn(credential)
    if (res?.error) {
      throw new Error(res.error)
    }

    const sessionToken = uuidv4()
    const sessionExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

    if (!res?.user.id) {
      throw new Error('No user found')
    }

    const session = await Prisma.session.create({
      data: {
        sessionToken: sessionToken,
        userId: res?.user.id,
        expires: sessionExpiry,
      },
    })
    if (!session) {
      throw new Error("Can't create session")
    }

    return { session: session.sessionToken }
  } catch (e) {
    const message = ErrorHandler(e)
    return { error: message }
  }
}
export { SignIn }
