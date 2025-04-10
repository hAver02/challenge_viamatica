
import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  onBlur?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type: initialType,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  required = false,
  className,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = initialType === "password";
  const type = isPassword ? (showPassword ? "text" : "password") : initialType;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={cn(
            "w-full",
            error && "border-destructive focus-visible:ring-destructive"
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default FormInput;
