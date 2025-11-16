"use client";

import { TiFlashOutline } from "react-icons/ti";
import SignInForm from "./signin-form";

export default function SignInWrapper() {
    return (
        <div>
            <section className="py-5">
                <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                    <TiFlashOutline className="w-7 h-7 text-white" />
                </div>

                <div className="mt-6 text-center">
                    <h1 className="mb-2 text-3xl text-gray-900 font-bold">
                        Welcome Back
                    </h1>

                    <p className="text-gray-600">
                        Sign in to your EcoDrive account
                    </p>
                </div>

                <section className="flex justify-center mt-7">
                    <SignInForm />
                </section>
            </section>
        </div>
    );
}
