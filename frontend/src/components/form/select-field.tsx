import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type SelectFieldProps = {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    options: { label: string; value: string }[] | string[];
};

export default function SelectField({
    control,
    name,
    label,
    placeholder,
    options,
}: SelectFieldProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>

                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        required
                        onOpenChange={(open) => {
                            if (!open) field.onBlur();
                        }}
                    >
                        <SelectTrigger id={name}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>

                        <SelectContent>
                            {options?.map((option, index) => (
                                <SelectItem
                                    key={index}
                                    value={
                                        typeof option === "string"
                                            ? option
                                            : option.value
                                    }
                                >
                                    {typeof option === "string"
                                        ? option
                                        : option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
