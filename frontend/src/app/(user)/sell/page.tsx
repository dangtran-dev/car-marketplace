"use client";

import { getCarBodyTypes, getCarBrands, sellCar } from "@/api/cars";
import { getLocation } from "@/api/location";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import UploadPhoto from "@/components/form/upload-photo";
import LoadingDots from "@/components/loader";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/providers";
import { BodyType, Brand } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import * as z from "zod";

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const formSchema = z.object({
    brand: z.string().min(1, { error: "Please select a car brand" }),
    bodyType: z.string().min(1, { error: "Please select a car body type" }),
    model: z.string().min(1, { error: "Please enter the car model" }),
    year: z
        .number({ error: "Please enter a valid year" })
        .min(0, "Year cannot be negative"),
    price: z
        .number({ error: "Please enter a valid price" })
        .min(0, { error: "Price cannot be negative" }),
    mileage: z
        .number({ error: "Please enter a valid mileage" })
        .min(0, { error: "Mileage cannot be negative" }),
    fuelType: z.string().min(1, { error: "Please select the fuel type" }),
    condition: z.string().min(1, { error: "Please select the car condition" }),
    transmission: z
        .string()
        .min(1, { error: "Please select the transmission type" }),
    description: z
        .string()
        .min(1, { error: "Please enter a short description of your car" }),
    location: z.string().min(1, { error: "Please select location" }),
    images: z
        .custom<File[] | null | undefined>()
        .refine(
            (files: File[] | null | undefined) => {
                const fileArray = Array.from(files ?? []);
                return fileArray.length > 0;
            },
            {
                message: "At least one image is required.",
            }
        )
        .refine(
            (files: File[] | null | undefined) => {
                const fileArray = Array.from(files ?? []);
                return fileArray.every((file) => file.size <= MAX_FILE_SIZE);
            },
            {
                message: "Each image must be less than 10MB.",
            }
        )
        .refine(
            (files: File[] | null | undefined) => {
                const fileArray = Array.from(files ?? []);
                return fileArray.every((file) =>
                    ACCEPTED_IMAGE_TYPES.includes(file.type)
                );
            },
            {
                message: "Only .jpg, .jpeg, .png and .webp files are accepted.",
            }
        ),
    phone: z
        .string()
        .refine((val) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(val), {
            error: "Invalid phone number format.",
        }),
});

export default function SellPage() {
    const steps = ["Basic Info", "Details & Photos", "Contact & Publish"];

    const [currentStep, setCurrentStep] = useState(0);

    const user = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            console.log(user);
            router.replace("/signin");
        }
    }, [user, router]);

    const { data: location } = useQuery<string[]>({
        queryFn: getLocation,
        queryKey: ["location"],
    });

    const { data: brands } = useQuery<Brand[]>({
        queryFn: getCarBrands,
        queryKey: ["brands"],
    });

    const brandsOption = useMemo(() => {
        return brands?.map((brand) => ({ label: brand.name, value: brand.id }));
    }, [brands]);

    const { data: bodyTypes } = useQuery<BodyType[]>({
        queryFn: getCarBodyTypes,
        queryKey: ["body-types"],
    });

    const bodyTypesOption = useMemo(() => {
        return bodyTypes?.map((bodyType) => ({
            label: bodyType.name,
            value: bodyType.id,
        }));
    }, [bodyTypes]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand: "",
            bodyType: "",
            model: "",
            year: new Date().getFullYear(),
            price: 0,
            mileage: 0,
            fuelType: "",
            condition: "",
            transmission: "",
            description: "",
            location: "",
            images: [],
            phone: "",
        },
        mode: "all",
    });

    const condition = form.watch("condition");

    const { mutateAsync: sellCarMutation, isPending } = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => sellCar(data),
        onSuccess: () => {
            router.push("/");
        },
        onError: (error: Error) => {
            console.log(form.getValues());
        },
    });

    if (isPending) {
        return <LoadingDots />;
    }

    function onSubmit(data: z.infer<typeof formSchema>) {
        sellCarMutation(data);
    }

    return (
        <main>
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-12 lg:py-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                            Sell Your Car
                        </h1>
                        <p className="text-emerald-100 text-lg font-medium">
                            List your vehicle and connect with thousands of
                            potential buyers
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="flex items-center justify-center">
                            {steps.map((step, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                                index <= currentStep
                                                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                                                    : "bg-gray-200 text-gray-500"
                                            }`}
                                        >
                                            {index < currentStep ? (
                                                <FaCheck className="w-5 h-5" />
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                        </div>
                                        <span
                                            className={`hidden md:block ${
                                                index <= currentStep
                                                    ? "text-gray-900"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {step}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`w-30 h-1 mx-4 rounded ${
                                                index < currentStep
                                                    ? "bg-emerald-500"
                                                    : "bg-gray-200"
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <Card className="rounded-2xl border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    {steps[currentStep]}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-6 lg:p-8">
                                <form
                                    id="sell-form"
                                    onSubmit={form.handleSubmit(onSubmit)}
                                >
                                    {currentStep === 0 && (
                                        <FieldGroup className="grid md:grid-cols-2 gap-6">
                                            <SelectField
                                                control={form.control}
                                                name="brand"
                                                label="Brand *"
                                                placeholder="Select brand"
                                                options={brandsOption ?? []}
                                            />

                                            <SelectField
                                                control={form.control}
                                                name="bodyType"
                                                label="Body Type *"
                                                placeholder="Select body type"
                                                options={bodyTypesOption ?? []}
                                            />

                                            <InputField
                                                control={form.control}
                                                name="model"
                                                type="text"
                                                label="Model *"
                                                placeholder="e.g., Model 3"
                                            />

                                            <InputField
                                                control={form.control}
                                                name="year"
                                                type="number"
                                                label="Year *"
                                            />

                                            <InputField
                                                control={form.control}
                                                name="price"
                                                type="number"
                                                label="Price (VND) *"
                                            />

                                            <InputField
                                                control={form.control}
                                                name="mileage"
                                                type="number"
                                                label="Mileage (km)"
                                                disabled={condition === "NEW"}
                                            />

                                            <SelectField
                                                control={form.control}
                                                name="fuelType"
                                                label="Fuel Type *"
                                                placeholder="Select Fuel Type"
                                                options={[
                                                    {
                                                        label: "Electric",
                                                        value: "ELECTRIC",
                                                    },
                                                    {
                                                        label: "Hybrid",
                                                        value: "HYBRID",
                                                    },
                                                    {
                                                        label: "Petrol",
                                                        value: "PETROL",
                                                    },
                                                    {
                                                        label: "Diesel",
                                                        value: "DIESEL",
                                                    },
                                                ]}
                                            />

                                            <SelectField
                                                control={form.control}
                                                name="condition"
                                                label="Condition *"
                                                placeholder="Select condition"
                                                options={[
                                                    {
                                                        label: "New",
                                                        value: "NEW",
                                                    },
                                                    {
                                                        label: "Like New",
                                                        value: "LIKE_NEW",
                                                    },
                                                    {
                                                        label: "Used",
                                                        value: "USED",
                                                    },
                                                    {
                                                        label: "Certified Pre-Owned",
                                                        value: "CERTIFIED_PREOWNED",
                                                    },
                                                ]}
                                            />

                                            <div className="col-span-2">
                                                <SelectField
                                                    control={form.control}
                                                    name="transmission"
                                                    label="Transmission *"
                                                    placeholder="Select transmission"
                                                    options={[
                                                        {
                                                            label: "Automatic",
                                                            value: "AUTOMATIC",
                                                        },
                                                        {
                                                            label: "Manual",
                                                            value: "MANUAL",
                                                        },
                                                        {
                                                            label: "CVT",
                                                            value: "CVT",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </FieldGroup>
                                    )}

                                    {currentStep === 1 && (
                                        <FieldGroup>
                                            <Controller
                                                name="description"
                                                control={form.control}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <Field
                                                        data-invalid={
                                                            fieldState.invalid
                                                        }
                                                    >
                                                        <FieldLabel htmlFor="description">
                                                            Description *
                                                        </FieldLabel>

                                                        <Textarea
                                                            {...field}
                                                            id="description"
                                                            placeholder="Describe your car's features, condition, history, and any other relevant details..."
                                                            required
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError
                                                                errors={[
                                                                    fieldState.error,
                                                                ]}
                                                            />
                                                        )}
                                                    </Field>
                                                )}
                                            />

                                            <SelectField
                                                control={form.control}
                                                name="location"
                                                label="Location *"
                                                placeholder="City, State"
                                                options={location ?? []}
                                            />

                                            <UploadPhoto form={form} />
                                        </FieldGroup>
                                    )}

                                    {currentStep === 2 && (
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="name">
                                                    Name *
                                                </FieldLabel>

                                                <Input
                                                    id="name"
                                                    value={user?.name || ""}
                                                    type="text"
                                                    disabled={true}
                                                />
                                            </Field>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Field>
                                                    <FieldLabel htmlFor="email">
                                                        Email *
                                                    </FieldLabel>

                                                    <Input
                                                        id="email"
                                                        value={
                                                            user?.email || ""
                                                        }
                                                        type="email"
                                                        disabled={true}
                                                    />
                                                </Field>

                                                <InputField
                                                    control={form.control}
                                                    name="phone"
                                                    label="Phone Number *"
                                                    type="tel"
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>

                                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                                                <h3 className="text-lg text-gray-900 mb-2">
                                                    Review Before Submitting
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Please make sure all details
                                                    are correct before
                                                    submitting your listing.
                                                    After submission, your
                                                    listing will be reviewed by
                                                    our moderators before it
                                                    becomes public.
                                                </p>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Review process:
                                                        </span>
                                                        <span className="text-gray-900">
                                                            Manual approval
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Estimated approval
                                                            time:
                                                        </span>
                                                        <span className="text-gray-900">
                                                            Within 24 hours
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">
                                                            Status after
                                                            submission:
                                                        </span>
                                                        <span className="text-gray-900">
                                                            Pending review
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </FieldGroup>
                                    )}
                                </form>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-8">
                                <Separator />

                                <div className="flex justify-between w-full">
                                    <Button
                                        variant="outline"
                                        className="font-semibold"
                                        disabled={currentStep < 1}
                                        onClick={() =>
                                            setCurrentStep((c) => c - 1)
                                        }
                                    >
                                        Previous
                                    </Button>

                                    {currentStep === steps.length - 1 ? (
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="font-semibold"
                                            >
                                                Preview Listing
                                            </Button>

                                            <Button
                                                type="submit"
                                                form="sell-form"
                                                disabled={
                                                    !form.formState.isValid
                                                }
                                                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/30"
                                            >
                                                Publish Now
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/30"
                                            onClick={() =>
                                                setCurrentStep((c) => c + 1)
                                            }
                                        >
                                            Next Step
                                        </Button>
                                    )}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
