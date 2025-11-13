"use client";

import { signInLocal } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTokensStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    email: z.email({ pattern: z.regexes.rfc5322Email }),
    password: z
        .string()
        .min(8, { error: "Password must be at least 8 characters long" })
        .refine((val) => /[A-Z]/.test(val), {
            error: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[a-z]/.test(val), {
            error: "Password must contain at least one lowercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            error: "Password must contain at least one number",
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            error: "Password must contain at least one special character",
        }),
});

export default function SignInForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    const setTokens = useTokensStore((state) => state.setTokens);

    const { mutateAsync: signIn, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) =>
            signInLocal(data),
        onSuccess: (data) => {
            setTokens(data.accessToken, data.refreshToken);

            router.push("/");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        signIn(data);
    };

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
            </CardHeader>

            <CardContent>
                <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        required
                                        placeholder="your@email.com"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        required
                                        placeholder="Enter your password"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                <div className="flex items-center justify-between w-full mt-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember-me" />
                        <Label
                            htmlFor="remember-me"
                            className="text-sm font-normal"
                        >
                            Remember me
                        </Label>
                    </div>

                    <Link
                        href="/forgot-password"
                        className="text-sm text-emerald-600 hover:text-emerald-700"
                    >
                        Forgot password?
                    </Link>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
                <Button
                    type="submit"
                    form="sign-in-form"
                    disabled={!form.formState.isValid || isPending}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30"
                >
                    {isPending ? "Signing in..." : "Sign In"}
                </Button>

                <div className="flex items-center justify-between w-full">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="px-3 text-sm text-gray-500">
                        or continue with
                    </span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                <Button className="w-full h-12 flex items-center justify-center gap-2 border border-gray-300">
                    <FaGoogle />

                    <span>Sign in with Google</span>
                </Button>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        href={"/signup"}
                        className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                        Sign up for free
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
