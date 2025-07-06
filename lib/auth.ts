import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './db'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email
            }
          })

          return { id: newUser.id, email: newUser.email }
        }

        return { id: user.id, email: user.email }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '#' // /auth/signin
  },
  callbacks: {
    session: ({ session, token }) => ({ ...session, user: { ...session.user, id: token.sub } })
  }

}
