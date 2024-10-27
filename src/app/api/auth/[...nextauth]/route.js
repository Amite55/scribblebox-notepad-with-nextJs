import { connectDB } from "@/lip/connectDB";
import NextAuth from "next-auth"
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session : {
        strategy : "jwt",
        maxAge: 30 * 24 * 60 * 60 ,
    },
    providers : [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize (credentials){
                const {email, password} = credentials;
                if(!email || !password){
                    return null
                }
                const db = await connectDB();
                const currentUser = await db.collection('users').findOne({email});
                if(!currentUser){
                    return null;
                }
                const passwordMatched = bcrypt.compareSync(password, currentUser.password);
                if(!passwordMatched){
                    return null
                }
                return currentUser;
            }   
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          })
    ],
    pages: {
        singIn : '/login'
    },
    callbacks : {
        async signIn({ user, account}) {
            if(account.provider === 'google' || account.provider === 'github'){
                const {name, email, image} = user;
                try{
                    const db = await connectDB();
                    const userCollection = await db.collection('users');
                    const userExist = await userCollection.findOne({email});
                    if(!userExist){
                        const res = await userCollection.insertOne(user);
                        return user;
                    } else{
                        return user;
                    }
                } catch(error) {

                }
            } else{
                return user;
            }
          },
    }
})

export {handler as POST, handler as GET}