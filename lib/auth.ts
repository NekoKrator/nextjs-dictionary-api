import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './db'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10)

          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword
            }
          })

          return { id: newUser.id.toString(), email: newUser.email }
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          return null
        }

        return { id: user.id.toString(), email: user.email }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    session: ({ session, token }) => ({ ...session, user: { ...session.user, id: token.sub } })
  }

}
