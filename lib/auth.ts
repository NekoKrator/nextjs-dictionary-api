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
        try {
          console.log('authorize called with:', credentials);

          if (!credentials?.email || !credentials?.password) {
            console.log('Missing email or password');
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          console.log('User from DB:', user);

          if (!user) {
            console.log('User not found, creating new user');
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword
              }
            });
            console.log('Created user:', newUser);

            return { id: newUser.id.toString(), email: newUser.email };
          }

          if (!user.password) {
            console.log('User exists but no password');
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log('Password valid:', isValid);

          if (!isValid) {
            console.log('Invalid password');
            return null;
          }

          return { id: user.id.toString(), email: user.email };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
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
