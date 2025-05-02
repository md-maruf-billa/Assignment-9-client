"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useRef } from "react";
import { useRouter } from "next/navigation"; // ✅ Added

interface OTPForm {
  otp: string[];
}

export default function VerificationFormSection() {
  const router = useRouter(); // ✅ Hook

  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<OTPForm>({
      defaultValues: {
        otp: Array(6).fill(""),
      },
    });

  const otpValues = useWatch({ control, name: "otp" });
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const onSubmit = (data: OTPForm) => {
    const otpCode = data.otp.join("");
    console.log("Submitted OTP:", otpCode);

    // Clear form
    reset({
      otp: Array(6).fill(""),
    });

    inputRefs.current[0]?.focus();
  };

  const handleChange = (value: string, index: number) => {
    const newValue = value.replace(/[^0-9]/g, "").slice(0, 1);
    setValue(`otp.${index}`, newValue);
    if (newValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const currentValue = getValues(`otp.${index}`);
      if (!currentValue && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const isFormValid = otpValues?.every((digit) => digit !== "");

  return (
    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
      <CardHeader className="text-left px-0">
        <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-gray-600">
          Enter the 6-digit code sent to your email address to continue.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 lg:flex lg:justify-between gap-3 mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Controller
                key={index}
                name={`otp.${index}` as const}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    ref={(el: HTMLInputElement | null) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    className="w-full h-14 lg:w-14 lg:h-16 text-xl lg:text-2xl font-bold text-center text-gray-900 bg-white border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all"
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                )}
              />
            ))}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-teal-600 hover:bg-teal-700 py-6 text-lg font-semibold shadow-md transition-all"
            disabled={!isFormValid}
          >
            Verify & Continue
          </Button>

          {/* ✅ Cancel Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full mt-4 py-6 text-lg"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Didn&apos;t receive a code?{" "}
          <Button
            variant="link"
            className="text-teal-600 cursor-pointer p-0 h-auto"
          >
            Resend Code
          </Button>
        </div>
      </CardContent>

      <div className="text-xs text-gray-400 mt-8 text-center">
        By verifying, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
}
