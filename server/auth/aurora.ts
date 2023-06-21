/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type GetServerSidePropsContext } from 'next'
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth'
import { SignInCredentials, SignInProvider } from '@aurora/libs/auth/signIn'

import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
// import DiscordProvider from 'next-auth/providers/discord'
import { env } from '@aurora/env.mjs'
import prisma from '@aurora/libs/database/prisma'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/app/portal',
    signOut: '/app/portal',
    error: '/app/portal',
    newUser: '/app/user',
  },
  callbacks: {
    session: ({ session, user }: any) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
        plane: user.plan,
      },
    }),

    // redirect: async ({ baseUrl }) => {
    //   const appUrl = baseUrl + '/app/user'
    //   return appUrl
    // },
    // signIn: async ({ user, account }) => SignInProvider(user, account),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.AUTH_FB_APP_ID,
      clientSecret: env.AUTH_FB_APP_SECRET,
    }),
    GithubProvider({
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    }),
    // DiscordProvider({
    //   clientId: env.AUTH_DISCORD_CLIENT_ID,
    //   clientSecret: env.AUTH_DISCORD_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: 'Email',
      id: 'theiceji',
      type: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'text', placeholder: 'E-mail' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        return SignInCredentials(credentials)
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}