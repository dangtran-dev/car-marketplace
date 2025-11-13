import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type InputFieldProps = {
    control: any;
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
};

export default function InputField({
    control,
    name,
    type,
    label,
    placeholder,
    disabled,
}: InputFieldProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>

                    {type === "number" ? (
                        <Input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            required
                            disabled={disabled}
                            onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                            }
                            value={Number.isNaN(field.value) ? "" : field.value}
                        />
                    ) : (
                        <Input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            required
                        />
                    )}
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
