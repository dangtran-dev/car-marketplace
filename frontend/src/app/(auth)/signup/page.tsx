import { Metadata } from "next";
import SignUpWrapper from "./signup-wrapper";

export const metadata: Metadata = {
    title: "Sign Up - EcoDrive",
    description: "Create an account to start your journey with EcoDrive.",
};

export default function SignUpPage() {
    return <SignUpWrapper />;
}
