"use client";

import { signUpLocal } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import * as z from "zod";

const passwordSchema = z
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
    });

const formSchema = z
    .object({
        name: z
            .string()
            .min(2, {
                message: "Name must be at least 2 characters long",
            })
            .max(100, {
                message: "Name must be at most 100 characters long",
            }),
        email: z.email({ pattern: z.regexes.rfc5322Email }),
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export default function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const router = useRouter();

    const { mutateAsync: signUp, isPending } = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => signUpLocal(data),
        onSuccess: () => {
            console.log("User signed up successfully");

            router.push("/signin");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        signUp(data);
    };

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
            </CardHeader>

            <CardContent>
                <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Name</FieldLabel>

                                    <Input
                                        {...field}
                                        id="name"
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        required
                                        placeholder="John Doe"
                                    />

                                    {fieldState.error && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Email</FieldLabel>

                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        required
                                        placeholder="your@email.com"
                                    />

                                    {fieldState.error && (
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
                                    <FieldLabel>Password</FieldLabel>

                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        required
                                        placeholder="Create a strong password"
                                    />

                                    {fieldState.error && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Confirm Password</FieldLabel>

                                    <Input
                                        {...field}
                                        id="confirmPassword"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        required
                                        placeholder="Confirm your password"
                                    />

                                    {fieldState.error && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
                <Button
                    type="submit"
                    form="sign-up-form"
                    disabled={!form.formState.isValid || isPending}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30"
                >
                    {isPending ? "Creating Account..." : "Create Account"}
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

                    <span>Sign up with Google</span>
                </Button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href={"/signin"}
                        className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

                <p className="text-center text-[10px] text-gray-500">
                    By creating an account, you agree to our{" "}
                    <Link
                        href={"/"}
                        className="text-emerald-600 hover:underline"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href={"/"}
                        className="text-emerald-600 hover:underline"
                    >
                        Privacy Policy
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
