/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GoCodeReview } from "react-icons/go";
import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi2";
import { FaArrowRightLong } from "react-icons/fa6";
import { ACCOUNT_TYPE } from "@/types/user";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { IRegisterPayload } from "@/types/auth";
import { register_user_action } from "@/services/AuthService";
import { IResponse } from "@/types/respones";
import { useRouter } from "next/navigation";
const Register = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<string>(ACCOUNT_TYPE.USER);

  const handleSubmit = async (e: any) => {
    const id = toast.loading("Verifying information ....")
    e.preventDefault();
    const userInfo: IRegisterPayload = { name: "", email: "", password: "", role: accountType }
    userInfo.name = e.target.name.value;
    userInfo.email = e.target.email.value;
    userInfo.password = e.target.password.value;
    userInfo.role = accountType;
    const res = await register_user_action(userInfo) as IResponse;
    if (res.success) {
      toast.success(res.message, { id })
      router.push("/login")
    } else {
      toast.error(res.message, { id })
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-evenly gap-10 md:gap-36 mx-auto w-full py-6 md:py-10">
          {/* Logo and Brand Name */}
          <Link href="/" className="flex items-center space-x-2">
            <GoCodeReview size={40} />
            <span className="font-bold text-3xl text-gray-800">ReviewHub</span>
          </Link>

          {/* Trustpilot Review Snippet */}
          <div className="text-right max-w-xs">
            <p className="text-sm text-gray-700 italic mb-1">
              &quot;The product is superfast, reliable and robust with great
              support team.&quot;
            </p>
            <div className="flex items-center justify-end space-x-2">
              {/* Placeholder for reviewer images */}
              <div className="flex -space-x-2">
                <Image
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Reviewer 1"
                  height={100}
                  width={100}
                />
                <Image
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Reviewer 2"
                  height={100}
                  width={100}
                />
              </div>
              {/* Placeholder for Trustpilot stars and logo */}
              <div className="flex items-center">
                <span className="text-green-500 text-xs">★★★★★</span>
                <span className="font-semibold text-sm ml-1 text-gray-600">
                  ReviewHub
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-36 mx-auto w-full p-6 md:p-10">
          {/* Login Form Section */}
          <div className="w-full max-w-md  mb-16 md:mb-0  ">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome To ReviewHub
            </h1>
            <p className="text-gray-600 mb-8">Register a new account</p>

            <form action="" onSubmit={handleSubmit}>

              {/* Name Input */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200"
                  placeholder="Jon Doe"
                />
              </div>
              {/* Email Input */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Input */}
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200 pr-10" // Added pr-10 for icon spacing
                    placeholder="Enter your password"
                  />
                  {/* Password visibility toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <HiOutlineEye className="ml-4 text-gray-500" size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-5 flex justify-between items-center">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Account Type ?
                </label>
                <RadioGroup onValueChange={setAccountType} defaultValue={ACCOUNT_TYPE.USER} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={ACCOUNT_TYPE.USER} id="r1" />
                    <Label htmlFor="r1">{ACCOUNT_TYPE.USER}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={ACCOUNT_TYPE.COMPANY} id="r2" />
                    <Label htmlFor="r2">{ACCOUNT_TYPE.COMPANY}</Label>
                  </div>
                </RadioGroup>

              </div>


              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition duration-200 flex items-center justify-center"
              >
                Register to ReviewHub
                <FaArrowRightLong className="ml-4" />
              </button>
            </form>

            <div className="mt-6 text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-gray-900 hover:underline"
              >
                Login now.
              </Link>
            </div>
          </div>

          {/* Illustration Section (Placeholder) */}
          <div className="w-full max-w-md lg:max-w-lg  ">
            {/* I will Update the svg later */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 1500 1500"
              viewBox="0 0 1500 1500"
              id="man-sharing-shopping-feedback"
            >
              <path
                fill="none"
                stroke="#ffc000"
                strokeMiterlimit="10"
                strokeWidth="3.106"
                d="M577,510H121.4c-32.1,0-58.1-26-58.1-58.1l0,0c0-32.1,26-58.1,58.1-58.1H577c32.1,0,58.1,26,58.1,58.1l0,0
		C635.2,484,609.1,510,577,510z"
              ></path>
              <polygon
                fill="#ffc000"
                points="165.2 419.4 175.8 440.8 199.4 444.2 182.3 460.9 186.4 484.3 165.2 473.2 144.1 484.3 148.1 460.9 131.1 444.2 154.7 440.8"
              ></polygon>
              <polygon
                fill="#ffc000"
                points="255.8 419.4 266.4 440.8 290 444.2 272.9 460.9 277 484.3 255.8 473.2 234.7 484.3 238.8 460.9 221.6 444.2 245.3 440.8"
              ></polygon>
              <polygon
                fill="#ffc000"
                points="346.4 419.4 357 440.8 380.6 444.2 363.5 460.9 367.5 484.3 346.4 473.2 325.3 484.3 329.4 460.9 312.3 444.2 335.9 440.8"
              ></polygon>
              <polygon
                fill="#ffc000"
                points="437 419.4 447.6 440.8 471.2 444.2 454.1 460.9 458.2 484.3 437 473.2 415.9 484.3 419.9 460.9 402.9 444.2 426.5 440.8"
              ></polygon>
              <polygon
                fill="#ffc000"
                points="527.6 419.4 538.2 440.8 561.8 444.2 544.7 460.9 548.8 484.3 527.6 473.2 506.5 484.3 510.5 460.9 493.4 444.2 517.1 440.8"
              ></polygon>
              <g>
                <circle
                  cx="1240.5"
                  cy="560.4"
                  r="100.2"
                  fill="#c2dbff"
                ></circle>
                <path
                  fill="#006b27"
                  d="M1234,580.7c0,0,13.8,3.6,42.7,16.1c38.6,16.7,41.7,48.9,35.3,89.9c-19.3-17.3-42.4-22.2-58.1-45
			C1240.5,622.1,1234,580.7,1234,580.7z"
                ></path>
                <polygon
                  fill="#2e3744"
                  points="1469 1348.8 1439.9 1348.8 1394.1 873.5 1442.6 873.5"
                ></polygon>
                <polygon
                  fill="#2e3744"
                  points="1178.2 1348.8 1207.3 1348.8 1253.1 873.5 1204.6 873.5"
                ></polygon>
                <path
                  fill="#2e3744"
                  d="M1158.2,852.6V870c0,9.6,74,17.4,165.4,17.4S1489,879.6,1489,870v-17.4H1158.2z"
                ></path>
                <rect
                  width="225.9"
                  height="26"
                  x="1210.6"
                  y="1116.8"
                  fill="#2e3744"
                ></rect>
                <ellipse
                  cx="1323.6"
                  cy="852.6"
                  fill="#006ad3"
                  rx="165.4"
                  ry="17.4"
                ></ellipse>
                <path
                  fill="#ffc000"
                  d="M1274.1,747.1l9,105.5c0,3.6,18.1,6.5,40.5,6.5s40.5-2.9,40.5-6.5l9-105.5H1274.1z"
                ></path>
                <ellipse
                  cx="1323.6"
                  cy="747.1"
                  fill="#ff4f4b"
                  rx="49.5"
                  ry="10.1"
                ></ellipse>
                <ellipse
                  cx="1323.6"
                  cy="750.3"
                  fill="#2e3744"
                  rx="46.9"
                  ry="6.9"
                ></ellipse>
                <path
                  fill="none"
                  stroke="#002d7d"
                  strokeMiterlimit="10"
                  strokeWidth="2.074"
                  d="M1240.5,587.5c39.3,27,76.2,66.7,83.1,169.6"
                ></path>
                <g>
                  <path
                    fill="#006b27"
                    d="M1347.5,662.3c-7.1,8.7-6.2,22.6-3,35.3c10.4-7.8,38.1-6.8,40.5-9.4c2.4-2.5-7.2-28.2-7.2-28.2
				S1355.4,649.5,1347.5,662.3z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#002d7d"
                    strokeMiterlimit="10"
                    strokeWidth="2.074"
                    d="M1327.6,750.3c0,0,14.7-72.2,41-86.8"
                  ></path>
                  <path
                    fill="#00a146"
                    d="M1347.5,662.3c10.3-7.3,6,13.5,20.5,28.7c17.5,18.3,51.3,9.1,58.9,0c-8.2-0.9-21.3-0.2-26.1-13.2
				C1392.9,656.3,1363.3,641.5,1347.5,662.3z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#006b27"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2.071"
                    d="M1368.6,654.3c11.1,5,9.3,23.9,18.6,33.7c7.9,8.3,24.7,9.6,39.7,3"
                  ></path>
                </g>
                <g>
                  <path
                    fill="none"
                    stroke="#ff7f72"
                    strokeMiterlimit="10"
                    strokeWidth="2.115"
                    d="M133,1009c0,0,2.7-67.9,44.4-67.9s54.2,67.9,54.2,67.9"
                  ></path>
                  <polygon
                    fill="#ff4b85"
                    points="336.8 1348.3 27.9 1348.3 67.1 993.1 297.7 993.1"
                  ></polygon>
                  <polygon
                    fill="#ff1f70"
                    points="267.5 993.1 228.4 1348.3 336.8 1348.3 297.7 993.1"
                  ></polygon>
                  <path
                    fill="none"
                    stroke="#ff7f72"
                    strokeMiterlimit="10"
                    strokeWidth="2.115"
                    d="M216.6,1009c0,0-2.7-67.9-44.4-67.9s-54.2,67.9-54.2,67.9"
                  ></path>
                </g>
                <g>
                  <polygon
                    fill="#006ad3"
                    points="1214.3 1348.8 1199.7 1348.8 1153.8 1210.5 1184.3 1210.5"
                  ></polygon>
                  <polygon
                    fill="#006ad3"
                    points="887.5 1348.8 902.2 1348.8 948 1210.5 917.5 1210.5"
                  ></polygon>
                  <path
                    fill="#2e3744"
                    d="M880.2,882.1H421.5l-55.4-236.5c-9.2-39.4,20.7-77.1,61.2-77.1h347.2c18.9,0,35.3,13,39.6,31.4L880.2,882.1z
				"
                  ></path>
                  <path
                    fill="#006ad3"
                    d="M900.1,882.1H469.8l-61.7-263.7c-6-25.6,13.4-50,39.6-50h346.7c18.9,0,35.3,13,39.6,31.4L900.1,882.1z"
                  ></path>
                  <path
                    fill="#2e3744"
                    d="M651.8,1225h401.3c17.4,0,30.5-15.9,27.1-33l-38-192.6c-3.4-17-18.3-29.3-35.7-29.3H651.8V1225z"
                  ></path>
                  <path
                    fill="#006ad3"
                    d="M1181.3,1225.7H907.9c-16.3,0-30.4-11.4-33.8-27.4l-69.9-329.6c-3.2-15.2,8.4-29.5,23.9-29.5h185.7
				c71.5,0,133.2,50,148.1,119.9l48.8,230.3C1214.6,1208.1,1200.4,1225.7,1181.3,1225.7z"
                  ></path>
                  <path
                    fill="#2e3744"
                    d="M931.3,839.2H828.1c-15.5,0-27.1,14.3-23.9,29.5l69.9,329.6c3.4,15.9,17.5,27.4,33.8,27.4h205.6
				c19.1,0,33.3-17.6,29.4-36.2L1094,959.1C1079.2,889.2,1002.8,839.2,931.3,839.2z"
                  ></path>
                  <path
                    fill="#ff7f72"
                    d="M989,1171.5L972,1338h152.5c-11.7-23.9-57.4-37.5-80.8-43c-7.6-1.8-12.1-9.6-9.9-17.1l32.1-106.4
				L989,1171.5L989,1171.5z"
                  ></path>
                  <path
                    fill="#ff4f4b"
                    d="M973.6,1315.9h63c1-5.9,1.5-10.8,1.5-10.8l-55.3-79.4L973.6,1315.9z"
                  ></path>
                  <rect
                    width="157.7"
                    height="10.9"
                    x="972"
                    y="1338"
                    fill="#d87817"
                  ></rect>
                  <path
                    fill="#d87817"
                    d="M1045.3,1293.1C1045.3,1293.1,1045.3,1293.1,1045.3,1293.1c-2.9-0.7-6-0.6-8.6,0.8
				c-10.8,5.7-26.6,18.3-29.2,44.1h122.3C1117.5,1313,1069.9,1298.8,1045.3,1293.1z"
                  ></path>
                  <path
                    fill="#ffd357"
                    d="M1079.9,778.3v78.5c0,4.3,12.9,7.7,28.9,7.7c15.9,0,28.9-3.4,28.9-7.7v-78.5H1079.9z"
                  ></path>
                  <path
                    fill="#ffc000"
                    d="M1137.7,778.3c0,4.3-12.9,7.7-28.9,7.7s-28.9-3.4-28.9-7.7s12.9-7.7,28.9-7.7S1137.7,774.1,1137.7,778.3z"
                  ></path>
                  <path
                    fill="#ff7f72"
                    d="M1083.9 782.2c5 2.3 14.2 3.9 24.9 3.9s19.9-1.6 24.9-3.9c-5-2.3-14.2-3.9-24.9-3.9S1089 779.9 1083.9 782.2zM1123.8 792.3c6.4 1.3 20.7 4.5 23.2 8.7 2.5 4.1-4.5 10.1-4.5 10.1s5.8 6.1-.2 11.8c4 3.5 1.8 10.1-1 12.8 3.1 4.5 2.7 9.1-7 13.3-9.6 4.1-16.3 4.8-17.6 1.8-1.3-3 15.4-12.3 15.4-12.3s-21.3 4.5-23.8 0c-2.5-4.5-1.8-18.8 0-20.9 1.8-2.2 25.1-9.3 25.1-9.3s-23.8-7.4-24.6-12.6C1108.2 791 1114.8 790.4 1123.8 792.3zM1105.7 802.7c.5 1.8-8.1 2.8-15.4 3.4-5.6.5-10 5.1-10 10.8v28.1l-18.3-4.7H861.6c-29.3 0-56.1-16.6-69-42.9l-12.3-26.9 135.5 14.5.6.1 144 17c3.2.4 6.5-.4 8.9-2.4.4-.3.8-.6 1.2-.9 2.7-1.9 6.9-3.6 12.5-3.4 10.6.3 20 3.6 22.2 6.5C1105.5 802.1 1105.6 802.4 1105.7 802.7zM950.6 1180.7l30.1 98.1 58.3 46.5c0 0 57.9 14.9 57.9 36.7h-142c-15.8 0-28-13.8-26.1-29.5 1.2-9.9 2.2-19.3 1.8-22.9-.8-8.6-59.7-132.5-59.7-132.5L950.6 1180.7z"
                  ></path>
                  <path
                    fill="#f39800"
                    d="M1040.1,1322.1l-17-13.6c-4.3-3.5-10.2-4.4-15.4-2.4c-34.5,13-41.7,56-41.7,56h130.9
				C1096.8,1340.2,1040.1,1322.1,1040.1,1322.1z"
                  ></path>
                  <path
                    fill="#006b27"
                    d="M1111.4,915.6c0,35.8-29,64.8-64.8,64.8H589.7l1.7-129.6h455.2C1082.4,850.8,1111.4,879.8,1111.4,915.6z"
                  ></path>
                  <polygon
                    fill="#ff7f72"
                    points="911.6 784.9 791.6 791.3 760.5 727.1 883.5 717.4"
                  ></polygon>
                  <polygon
                    fill="#ff4f4b"
                    points="883.5 714.5 760.6 724.2 783.2 773.9 892.8 740.4"
                  ></polygon>
                  <path
                    fill="#ffc000"
                    d="M691.5,587.5h53c26,0,50.7,12,66.6,32.6c5.1,6.6,9.7,12.4,12.5,15.4c8.8,9.7,20.7,18.7,30.1,24.2
				c9.4,5.6,11.9,14,19.5,33.2c4.4,11.1,26.7,22.9,29,40.5l-122.8,1l4.5,17.7c0,0,36.7,55.5,52,98.5H591.4l-10-102.6H444.2
				c0,0,5.1-6.5,4.3-23.6c-0.8-17.2,0.8-28.5,6.3-41.8c5.5-13.3-3.1-59,12.5-74.7c15.7-15.7,26.2-20.5,55.5-20.5
				c29.3,0,80.3,0,80.3,0s42.4,11.5,58.1,12.7C676.9,601.4,691.5,587.5,691.5,587.5z"
                  ></path>
                  <line
                    x1="558"
                    x2="581.5"
                    y1="683.9"
                    y2="748.2"
                    fill="none"
                    stroke="#f39800"
                    strokeMiterlimit="10"
                    strokeWidth="1.533"
                  ></line>
                  <line
                    x1="520.5"
                    x2="473.6"
                    y1="655.4"
                    y2="695.3"
                    fill="none"
                    stroke="#f39800"
                    strokeMiterlimit="10"
                    strokeWidth="1.533"
                  ></line>
                  <line
                    x1="777.9"
                    x2="762"
                    y1="728.6"
                    y2="639.2"
                    fill="none"
                    stroke="#f39800"
                    strokeMiterlimit="10"
                    strokeWidth="1.533"
                  ></line>
                  <path
                    fill="#006b27"
                    d="M1112.5,918.4c0.1-1.3,0.1-2.7,0.1-4c0-34.7-28.1-62.7-62.7-62.7c-3.9,0-7.8,0.4-11.5,1.1
				c-2.6,0.5-5.1,1.1-7.5,1.9c-25.3,8-43.7,31.8-43.7,59.8l0,0l0,0l1.3,66.1l-7.8,208.3h116.3c4.1-21.1-8.8-26.5,0-86.9
				c2.7-18.2,12.3-28.7,8.2-69.8c-1.8-17.8-2.9-28.7,5.8-88.5c1-6.5,1.2-12.6,0.7-18.5c0.4-2.1,0.6-4.1,0.7-6.3v0l0.2-0.4H1112.5z"
                  ></path>
                  <line
                    x1="816.8"
                    x2="785.9"
                    y1="663.2"
                    y2="710.5"
                    fill="none"
                    stroke="#f39800"
                    strokeMiterlimit="10"
                    strokeWidth="1.533"
                  ></line>
                  <line
                    x1="988.4"
                    x2="992.3"
                    y1="980.4"
                    y2="922.4"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                    strokeWidth="1.734"
                  ></line>
                  <path
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                    strokeWidth="1.734"
                    d="M979.5,970.1c0,0-19.9-28.9-21.9-47.7"
                  ></path>
                  <path
                    fill="#00a146"
                    d="M707.8,850.8c0,0,73.7,21.9,113.8,40.7c40.2,18.8,69.9,69.6,83.9,116.5c14.1,46.9,62.9,197,62.9,197H838.1
				c0,0-0.2-22.7,0-46.1c0.2-23.4-33.4-33.6-41.2-64.9C789,1062.8,732,980.5,732,980.5H614.7V850.9L707.8,850.8L707.8,850.8z"
                  ></path>
                  <path
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit="10"
                    strokeWidth="1.734"
                    d="M782,903c0,0-44,20.5-36.9,69.8"
                  ></path>
                  <g>
                    <path
                      fill="#2e3744"
                      d="M670.4,512.3c0,0,15.8,6.5,22.5-6c6.6-12.5-2.5-22.5-12.3-24.6c2.2-12.7-20.1-29.9-31.8-16.4
					c-13.5-19.5-41.6-18-45.6,7.4c-20.5-3.5-28.8,17.5-15.3,31.6c-8.7,16.6,2.1,38.8,31.3,45.5L670.4,512.3z"
                    ></path>
                    <path
                      fill="#ff7f72"
                      d="M691.5,587.5h-12.1l-6.8-26.3c18.5-10.4,11.4-34.1,1.5-37.6l-2.1-22.9c0,0-15.9,4.5-22.3-10.6
					c0,0-8,20.1-32.8,24.1c0,0,1,4.5,1.7,11.2c-1.3-0.4-2.8-0.7-4.3-0.7c-6.3,0-11.3,3.9-11.3,8.7s5.1,8.7,11.3,8.7
					c1.9,0,3.6-0.4,5.1-1c0,2.8-0.2,5.6-0.5,8.4l7.7,37.9h-23.8c0,0,24,49.2,66.3,49.2C711.6,636.8,691.5,587.5,691.5,587.5z"
                    ></path>
                    <path
                      fill="none"
                      stroke="#ff4f4b"
                      strokeMiterlimit="10"
                      strokeWidth="1.533"
                      d="M672.7,561.2c-13.6,8.9-32.7-0.6-37.4-5.3"
                    ></path>
                    <line
                      x1="626.6"
                      x2="654"
                      y1="595.2"
                      y2="610"
                      fill="none"
                      stroke="#ff4f4b"
                      strokeMiterlimit="10"
                      strokeWidth="1.533"
                    ></line>
                  </g>
                  <rect
                    width="167.7"
                    height="13.7"
                    x="929.1"
                    y="1362.1"
                    fill="#f39800"
                  ></rect>
                  <g>
                    <polygon
                      fill="#006ad3"
                      points="804.8 1348.8 790.2 1348.8 744.3 1210.5 774.8 1210.5"
                    ></polygon>
                    <polygon
                      fill="#006ad3"
                      points="478 1348.8 492.7 1348.8 538.5 1210.5 508 1210.5"
                    ></polygon>
                  </g>
                  <g>
                    <path
                      fill="#2e3744"
                      d="M781.8,1225.7H508.4c-16.3,0-30.4-11.4-33.8-27.4l-69.9-329.6c-3.2-15.2,8.4-29.5,23.9-29.5h185.7
				c71.5,0,133.2,50,148.1,119.9l48.8,230.3C815.2,1208.1,800.9,1225.7,781.8,1225.7z"
                    ></path>
                    <path
                      fill="#006ad3"
                      d="M531.8,839.2H428.7c-15.5,0-27.1,14.3-23.9,29.5l69.9,329.6c3.4,15.9,17.5,27.4,33.8,27.4H714
				c19.1,0,33.3-17.6,29.4-36.2l-48.8-230.3C679.8,889.2,603.3,839.2,531.8,839.2z"
                    ></path>
                  </g>
                  <path
                    d="M501.5,748.2h-51.7l-5.5,9.9h14.5c0,0,4.8,13.7,19.4,56c14.7,42.2,58.2,55.4,58.2,55.4L501.5,748.2z"
                    enableBackground="new"
                    opacity=".43"
                  ></path>
                  <g>
                    <path
                      fill="#2e3744"
                      d="M718.9,676.6h-39.8c-2.4,0-4.2-1.9-4.1-4.3l3.9-76.7c0.1-2.4,2.1-4.3,4.5-4.3h39.8c2.4,0,4.2,1.9,4.1,4.3
					l-3.9,76.7C723.3,674.7,721.3,676.6,718.9,676.6z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M690.9 599c-.1 2.2-1.9 3.9-4.1 3.9-2.2 0-3.8-1.7-3.7-3.9.1-2.2 1.9-3.9 4.1-3.9C689.4 595.1 691 596.9 690.9 599zM706.9 600.5h-10.3c-.8 0-1.4-.7-1.4-1.4l0 0c0-.8.7-1.4 1.5-1.4H707c.8 0 1.4.7 1.4 1.4l0 0C708.4 599.8 707.7 600.5 706.9 600.5z"
                    ></path>
                    <path
                      fill="#ff7f72"
                      d="M606.6,871.9c-0.6,0.4-1.3,0.9-1.9,1.3l0,0c-15.1,9.8-33.3,12.3-55.6,3.4c-50.8-20.3-78.2-128.4-78.2-128.4
				h110.7l13.3,28.6C594.8,776.8,638.5,848.4,606.6,871.9z"
                    ></path>
                    <path
                      fill="#ff7f72"
                      d="M696.3,663.6l-10.1,7.4c0,0-16.3,86.8-36.5,136.8c-10.7,26.6-24.1,50.2-42,63.3l-0.2,0.1l-9.1,5.6
				c0,0-26.8,10.6-40.4-13.4c-13.6-24.1,36.8-86.6,36.8-86.6s53.5-87.3,70.8-115.4c-0.7-17,12.1-39.7,12.1-39.7l-0.9,18.2l25.7-16.9
				c0,0,6.8-19.1,10.4-16.4c2.5,2-0.9,10.4-3.6,17.1c-1.2,2.8-2.9,5.3-5,7.3l-7.9,7.5l12.9-4.9c0.3-0.1,0.5-0.3,0.7-0.6
				c1.4-2.2,8.2-13,9.9-11.3c1.9,1.9,2.8,12.3-0.3,18.1c-3.1,5.8-14.6,14.9-14.6,14.9s4.1-1,8.2-1.8c3.1-2.2,7.1-6,8.8-5.3
				C724.6,648.8,722.6,655.1,696.3,663.6z"
                    ></path>
                    <path
                      fill="#ff4f4b"
                      d="M470.9,748.2c0,0,2.5,9.9,7.5,24.4l103.2-24.4H470.9z"
                    ></path>
                  </g>
                  <line
                    x1="788"
                    x2="809.8"
                    y1="1079.9"
                    y2="1182.9"
                    fill="none"
                    stroke="#0059e2"
                    strokeMiterlimit="10"
                    strokeWidth="4.141"
                  ></line>
                </g>
                <g>
                  <path
                    fill="none"
                    stroke="#ffc000"
                    strokeMiterlimit="10"
                    strokeWidth="4.141"
                    d="M424.6 1157.4c0 0-44.9-58-75-48.6-30 9.4-9.4 53.4 70.1 50.4M431.8 1157.4c0 0 44.9-58 75-48.6 30 9.4 9.4 53.4-70.1 50.4"
                  ></path>
                  <line
                    x1="389.7"
                    x2="426.1"
                    y1="1097.5"
                    y2="1156.9"
                    fill="none"
                    stroke="#ffc000"
                    strokeMiterlimit="10"
                    strokeWidth="4.141"
                  ></line>
                  <line
                    x1="466.6"
                    x2="430.2"
                    y1="1097.5"
                    y2="1156.9"
                    fill="none"
                    stroke="#ffc000"
                    strokeMiterlimit="10"
                    strokeWidth="4.141"
                  ></line>
                  <rect
                    width="278.3"
                    height="194.3"
                    x="289"
                    y="1154.6"
                    fill="#ffc000"
                  ></rect>
                  <rect
                    width="292.7"
                    height="56.6"
                    x="281.8"
                    y="1154.6"
                    fill="#ffc000"
                  ></rect>
                  <rect
                    width="40.6"
                    height="194.3"
                    x="407.9"
                    y="1154.6"
                    fill="#fff"
                  ></rect>
                  <polygon
                    points="567.4 1246.7 289 1222.3 289 1211.1 567.4 1211.1"
                    enableBackground="new"
                    opacity=".26"
                  ></polygon>
                </g>
              </g>
              <g>
                <path
                  fill="none"
                  stroke="#ffc000"
                  strokeMiterlimit="10"
                  strokeWidth="3.106"
                  d="M1238.2,274.3H782.6c-32.1,0-58.1-26-58.1-58.1l0,0c0-32.1,26-58.1,58.1-58.1h455.6c32.1,0,58.1,26,58.1,58.1
		l0,0C1296.4,248.3,1270.4,274.3,1238.2,274.3z"
                ></path>
                <polygon
                  fill="#ffc000"
                  points="826.5 183.6 837 205 860.6 208.5 843.6 225.1 847.6 248.6 826.5 237.5 805.4 248.6 809.4 225.1 792.3 208.5 815.9 205"
                ></polygon>
                <polygon
                  fill="#ffc000"
                  points="917.1 183.6 927.7 205 951.3 208.5 934.2 225.1 938.2 248.6 917.1 237.5 896 248.6 900 225.1 882.9 208.5 906.5 205"
                ></polygon>
                <polygon
                  fill="#ffc000"
                  points="1007.7 183.6 1018.2 205 1041.8 208.5 1024.8 225.1 1028.8 248.6 1007.7 237.5 986.5 248.6 990.6 225.1 973.5 208.5 997.1 205"
                ></polygon>
                <polygon
                  fill="#ffc000"
                  points="1098.3 183.6 1108.8 205 1132.4 208.5 1115.4 225.1 1119.4 248.6 1098.3 237.5 1077.2 248.6 1081.2 225.1 1064.1 208.5 1087.7 205"
                ></polygon>
                <polygon
                  fill="#ffe6a6"
                  points="1188.9 183.6 1199.4 205 1223 208.5 1205.9 225.1 1210 248.6 1188.9 237.5 1167.8 248.6 1171.8 225.1 1154.7 208.5 1178.3 205"
                ></polygon>
              </g>
              <g>
                <path
                  fill="#ff1f70"
                  d="M825.2,364.6h-94.5c-5.6,0-10.1,4.6-10.1,10.1v83.2c0,5.6,4.6,10.1,10.1,10.1H762c4.3,0,8.3,2.6,10.1,6.5
		l5.8,13.1l5.8-13.1c1.8-4,5.7-6.5,10.1-6.5h31.3c5.6,0,10.1-4.6,10.1-10.1v-83.2C835.3,369.2,830.8,364.6,825.2,364.6z"
                ></path>
                <path
                  fill="#fff"
                  d="M756.8,390.5c13.3-4.5,21.1,8.6,21.1,8.6s7.8-13.1,21.1-8.6c11.7,4,12.7,20.2,7.5,28.7
		c-8.9,14.7-28.6,25.3-28.6,25.3s-19.7-10.6-28.6-25.3C744.1,410.6,745.1,394.4,756.8,390.5z"
                ></path>
              </g>
            </svg>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
