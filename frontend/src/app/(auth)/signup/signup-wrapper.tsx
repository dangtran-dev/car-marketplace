"use client";

import LoadingDots from "@/components/loader";
import { useCheckAuthRedirect, useLoading } from "@/hooks";
import { TiFlashOutline } from "react-icons/ti";
import SignUpForm from "./signup-form";

export default function SignUpWrapper() {
    const authStatus = useCheckAuthRedirect(false);
    const isLoading = useLoading();

    if (isLoading || !authStatus) return <LoadingDots />;

    return (
        <div>
            <section className="py-5">
                <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                    <TiFlashOutline className="w-7 h-7 text-white" />
                </div>

                <div className="mt-6 text-center">
                    <h1 className="mb-2 text-3xl text-gray-900 font-bold">
                        Join EcoDrive
                    </h1>

                    <p className="text-gray-600">
                        Create your account and start exploring
                    </p>
                </div>

                <section className="flex justify-center mt-7">
                    <SignUpForm />
                </section>
            </section>
        </div>
    );
}
