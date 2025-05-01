"use client";
import Image from "next/image";
import { useState } from "react";
import contactImg from "@/assets/contact-img.png";

export default function ContactPage() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side - Form */}
        <div className="p-10">
          <p className="text-orange-500 font-semibold mb-2">Get in Touch</p>
          <h1 className="text-3xl font-bold mb-4">
            Let`s Chat, Reach Out to Us
          </h1>
          <p className="text-gray-600 mb-8">
            Have questions or feedback? We`re here to help. Send us a message,
            and we`ll respond within 24 hours.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <textarea
              rows={4}
              placeholder="Leave us message"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            ></textarea>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="privacy"
                className="w-4 h-4"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                I agree to our friendly{" "}
                <a href="#" className="text-blue-600 underline">
                  privacy policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isChecked}
              className={`px-6 py-2 rounded-lg text-white transition ${
                isChecked
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Send Message
            </button>
          </form>
        </div>
        {/* Right Side - Image & Contact Info */}
        <div className="relative p-10 flex flex-col items-center justify-center">
          <Image
            src={contactImg}
            alt="Contact person"
            className="w-100 h-auto mb-8 rounded-xl"
          />

          {/* Contact Info Box with background */}
          <div className="bg-blue-100 w-full p-4 rounded-xl shadow-md space-y-4">
            {/* Email Info */}
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0L12 13.5 2.25 6.75"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600 text-sm">techteam@kawruh.com</p>
              </div>
            </div>

            {/* Phone Info */}
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h2.28a2 2 0 011.71 1l1.47 2.94a2 2 0 01-.45 2.34l-.88.88a16 16 0 006.06 6.06l.88-.88a2 2 0 012.34-.45l2.94 1.47a2 2 0 011 1.71V19a2 2 0 01-2 2h-1C9.6 21 3 14.4 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600 text-sm">(0252) 8324 9231</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
