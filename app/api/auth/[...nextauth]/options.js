import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs"

export const options = {
    providers: [
        CredentialsProvider({

            name: 'credentials',
            credentials: {},

            async authorize(credentials){
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
                    console.log(user?.role);
                    if(!user) return null;

                    const passwordMatched = await bcrypt.compare(password, user.password);
                    if(!passwordMatched) return null;

                    return {
                        user, 
                        role: user?.role
                    };
                } catch (error) {
                    console.log(error);
                }
                return user;
            },
        }),
        // GitHubProvider({
        //     profile(profile) {
        //         console.log("profile GitHub :: ", profile);

        //         let userRole = "GitHub User";
        //         if(profile?.email == "yangalwarujwal1830@gmail.com"){
        //             userRole = "admin";
        //         }
        //         return {
        //             ...profile,
        //             role: userRole,
        //         };
        //     },
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
        // GoogleProvider({
        //     profile(profile) {
        //         console.log("profile Google :: ", profile);

        //         return {
        //             ...profile,
        //             id: profile.sub,
        //             role: userRole,
        //         };
        //     },
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) token.role = user.role;
            return token;
        },
        async session({session, token}) {
            if(session?.user) session.user.role = token.role;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
};