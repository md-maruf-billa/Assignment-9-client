import Image from "next/image";
import otpImages from "@/assets/otp.jpg";

export default function VerificationImageSection() {
  return (
    <div className="md:w-1/2 bg-gradient-to-br hidden from-teal-500 to-teal-700 p-12 md:flex flex-col justify-center items-center text-white">
      <div className="w-full max-w-xs">
        <Image
          src={otpImages}
          alt="Email Verification"
          className="rounded-lg shadow-2xl object-cover w-full h-auto"
          priority
        />
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Secure Account Verification</h2>
        <p className="opacity-90">
          Protect your account with our two-step verification process.
        </p>
      </div>
    </div>
  );
}
