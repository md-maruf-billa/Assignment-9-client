import VerificationFormSection from "@/components/verifyEmail/VerificationFormSection";
import VerificationImageSection from "@/components/verifyEmail/VerificationImageSection";
import React from "react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen p-6 flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full mx-4 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <VerificationImageSection />
        <VerificationFormSection />
      </div>
    </div>
  );
}
