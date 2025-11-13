import { Metadata } from "next";
import SignInWrapper from "./signin-wrapper";

export const metadata: Metadata = {
    title: "Sign In - EcoDrive",
    description: "Sign in to your EcoDrive account to manage your vehicles.",
};

export default function SignInPage() {
    return <SignInWrapper />;
}
