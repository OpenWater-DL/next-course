
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/prisma/client";
import { NextApiHandler } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt'

// 处理自行注册的方式
import CredentialsProvider from "next-auth/providers/credentials";

// Define NextAuth options
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
  providers: [

    CredentialsProvider({
      name:'Credentials',
      credentials:{
        email:{ label: 'Email', type:'email',placeholder:'Email'},
        password:{label:'Password',type:'password',placeholder:'password'}
      },
      async authorize(credentials, req){
        if(!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({ where:{ email: credentials.email}});

        if(!user) return null;
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword!)
        return passwordsMatch? user : null
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  session:{
    strategy:'jwt'
  }
  
};

// Create the NextAuth handler
const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

// Export handler as GET and POST methods
export { handler as GET, handler as POST };

