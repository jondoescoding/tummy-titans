
import { useState } from "react";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { CheckIcon, XIcon } from "lucide-react";
import { isValidDoctorCode, getDoctorNameByCode } from "@/lib/patientData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DoctorCodeInputProps {
  form: UseFormReturn<any>;
  fieldName: string;
}

const DoctorCodeInput = ({ form, fieldName }: DoctorCodeInputProps) => {
  const [doctorName, setDoctorName] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const validateCode = (code: string) => {
    if (code.length === 5) {
      const isValidCode = isValidDoctorCode(code);
      setIsValid(isValidCode);
      const name = getDoctorNameByCode(code);
      setDoctorName(name);
      return isValidCode;
    }
    setIsValid(null);
    setDoctorName(undefined);
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    // Only allow numbers and limit to 5 digits
    if (code === "" || (/^\d+$/.test(code) && code.length <= 5)) {
      form.setValue(fieldName, code);
      if (code.length === 5) {
        validateCode(code);
      } else {
        setIsValid(null);
        setDoctorName(undefined);
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="doctorCode" className="text-sm font-medium">
        Dietitian Code
      </Label>
      <div className="relative">
        <Input
          id="doctorCode"
          className={`form-input-transition pl-4 pr-10 py-2 text-lg tracking-wider ${
            isFocused ? "ring-2 ring-primary/50" : ""
          } ${
            isValid === true
              ? "border-green-500"
              : isValid === false
              ? "border-red-500"
              : ""
          }`}
          placeholder="12345"
          {...form.register(fieldName, {
            required: "Doctor code is required",
            validate: validateCode,
          })}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          maxLength={5}
          inputMode="numeric"
        />
        {isValid !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {isValid ? (
              <CheckIcon className="h-5 w-5 text-green-500" />
            ) : (
              <XIcon className="h-5 w-5 text-red-500" />
            )}
          </motion.div>
        )}
      </div>
      {isValid === true && doctorName && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-600"
        >
          Connected to: {doctorName}
        </motion.p>
      )}
      {isValid === false && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600"
        >
          Invalid code. Please try again.
        </motion.p>
      )}
      {form.formState.errors[fieldName] && (
        <p className="text-sm text-red-600">
          {form.formState.errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default DoctorCodeInput;
