import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@src/firebase";


const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email || '', credentials.password || '');
          if (userCredential.user) {
            return userCredential.user; // Return the authenticated user object
          }
          return null; // Return null if user is not authenticated (optional)
        } catch (error) {
          console.error('Firebase Authentication Error:', error);
          throw new Error('Authentication failed'); // Throw error to indicate authentication failure
        }
      }
    })
  ]
};

export default NextAuth(authOptions);
