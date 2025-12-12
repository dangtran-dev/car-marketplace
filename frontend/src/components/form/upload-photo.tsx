"use client";

import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

type UploadImage = {
    file: File;
    previewUrl: string;
};

export default function UploadPhoto({ form }: { form: any }) {
    const [uploadImages, setUploadImages] = useState<UploadImage[]>([]);

    useEffect(() => {
        return () => {
            uploadImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        };
    }, [uploadImages]);

    const handleImageUpload = (files: File[] | null | undefined) => {
        if (!files || files.length === 0) return;

        const newImages = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        const updatedImages = [...uploadImages, ...newImages];
        setUploadImages(updatedImages);

        form.setValue(
            "images",
            updatedImages.map((img) => img.file),
            { shouldValidate: true }
        );
        form.trigger("images");
    };

    const removeImage = (index: number) => {
        const removed = uploadImages[index];
        if (removed) URL.revokeObjectURL(removed.previewUrl);

        const updated = uploadImages.filter((_, i) => i !== index);
        setUploadImages(updated);

        form.setValue(
            "images",
            updated.length ? updated.map((img) => img.file) : null,
            { shouldValidate: true }
        );
        form.trigger("images");
    };

    return (
        <Controller
            name="images"
            control={form.control}
            render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="images">Upload Photos *</FieldLabel>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                        <Input
                            id="images"
                            type="file"
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            multiple
                            className="hidden"
                            onChange={(event) => {
                                handleImageUpload(
                                    Array.from(event.target.files ?? [])
                                );
                                event.target.value = "";
                            }}
                        />

                        <Label
                            htmlFor="images"
                            className="flex flex-col cursor-pointer"
                        >
                            <LuUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />

                            <p className="text-gray-700 mb-2">
                                Click to upload or drag and drop
                            </p>

                            <p className="text-sm text-gray-500">
                                PNG, JPG up to 10MB (minimum 3 photos
                                recommended)
                            </p>
                        </Label>
                    </div>

                    {uploadImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {uploadImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative group aspect-video rounded-xl overflow-hidden"
                                >
                                    <img
                                        src={image.previewUrl}
                                        alt={`Upload ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />

                                    <Button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <IoClose className="w-4 h-4" />
                                    </Button>

                                    {index === 0 && (
                                        <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                            Cover
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
