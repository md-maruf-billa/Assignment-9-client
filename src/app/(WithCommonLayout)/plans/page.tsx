"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { FaCheck, FaStar, FaTimes} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {create_new_payment_intent} from "@/services/payment";
import {useRouter} from "next/navigation";
import {useUser} from "@/context/UserContext";
import {toast} from "sonner";

const Page = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
    const router = useRouter();
    const {user} = useUser()

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.3 }
        }
    };

    const plans = [
        {
            name: "Standard",
            price: "19",
            description: "Perfect for individuals and small businesses just getting started with review management.",
            features: [
                { text: "Up to 10 reviews per month", included: true },
                { text: "Basic analytics dashboard", included: true },
                { text: "Email support", included: true },
                { text: "Single user account", included: true },
                { text: "Review response templates", included: false },
                { text: "Review widgets for website", included: false },
                { text: "Custom branding", included: false },
                { text: "Priority support", included: false }
            ],
            cta: "Start 14-Day Trial",
            popular: false,
            color: "gray-700"
        },
        {
            name: "Basic",
            price: "29",
            description: "Ideal for growing businesses looking to enhance their online reputation.",
            features: [
                { text: "Up to 100 reviews per month", included: true },
                { text: "Advanced analytics dashboard", included: true },
                { text: "Email and chat support", included: true },
                { text: "Up to 5 user accounts", included: true },
                { text: "Review response templates", included: true },
                { text: "Review widgets for website", included: true },
                { text: "Custom branding", included: false },
                { text: "Priority support", included: false }
            ],
            cta: "Start 14-Day Trial",
            popular: true,
            color: "amber-500"
        },
        {
            name: "Premium",
            price: "79",
            description: "For established businesses seeking comprehensive review management solutions.",
            features: [
                { text: "Unlimited reviews", included: true },
                { text: "Enterprise analytics suite", included: true },
                { text: "24/7 priority support", included: true },
                { text: "Unlimited user accounts", included: true },
                { text: "AI-powered response suggestions", included: true },
                { text: "Advanced review widgets", included: true },
                { text: "Custom branding", included: true },
                { text: "Dedicated account manager", included: true }
            ],
            cta: "Start 14-Day Trial",
            popular: false,
            color: "gray-900"
        }
    ];

    const faqs = [
        {
            question: "How does the 14-day trial work?",
            answer: "Our 14-day trial gives you full access to all features of your selected plan with no commitment. You won't be charged until the trial period ends, and you can cancel anytime before then with no obligation."
        },
        {
            question: "Can I upgrade or downgrade my plan later?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be applied immediately. If you downgrade, the new pricing will take effect at the start of your next billing cycle."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal. For annual enterprise plans, we can also accommodate bank transfers and invoicing."
        },
        {
            question: "Is there a discount for annual billing?",
            answer: "Yes, we offer a 20% discount when you choose annual billing instead of monthly billing for any of our paid plans."
        },
        {
            question: "Do you offer custom enterprise plans?",
            answer: "Absolutely! For larger organizations with specific needs, we offer custom enterprise plans. Please contact our sales team to discuss your requirements and get a tailored solution."
        }
    ];



    // create_new_payment_intent
    const handlePlanClick = async () => {
        if(user?.isPremium){
            return toast.error("You are already premium!");
        }
        const res = await create_new_payment_intent();
        if (res.success) {
            toast.success(res.message || "Payment initialized successfully.");
            router.push(res.data.paymentUrl);
        }
    };



    const toggleFaq = (index: number) => {
        if (activeFaq === index) {
            setActiveFaq(null);
        } else {
            setActiveFaq(index);
        }
    };

    return (
        <div className="bg-[#FAF8F5] min-h-screen overflow-hidden">
            {/* Hero Section */}
            <div className="relative px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-28">
                <motion.div
                    className="absolute inset-0 -z-10 opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 1.5 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-100 transform -skew-y-6"></div>
                </motion.div>

                <motion.div
                    className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-gray-900">
                            ReviewHub Plans
                        </p>
                    </motion.div>
                    <motion.h1
                        className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <span className="relative inline-block">
                            <svg viewBox="0 0 52 24" fill="currentColor"
                                 className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-amber-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                                <defs>
                                    <pattern id="fdca20a0-aeb4-4caf-ba1b-4351eee42363" x="0" y="0" width=".135"
                                             height=".30">
                                        <circle cx="1" cy="1" r=".7"></circle>
                                    </pattern>
                                </defs>
                                <rect fill="url(#fdca20a0-aeb4-4caf-ba1b-4351eee42363)" width="52" height="24"></rect>
                            </svg>
                            <span className="relative">Choose</span>
                        </span>{" "}
                        the perfect plan for your business
                    </motion.h1>
                    <motion.p
                        className="text-base text-gray-700 md:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Select from our range of flexible plans designed to meet your review management needs,
                        from startups to enterprise businesses.
                    </motion.p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto mt-16"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded-lg shadow-sm ${plan.popular ? 'border-amber-400 z-10' : 'border-gray-200'}`}
                            variants={cardVariants}
                            whileHover="hover"
                            onHoverStart={() => setHoveredPlan(index)}
                            onHoverEnd={() => setHoveredPlan(null)}
                        >
                            {plan.popular && (
                                <motion.div
                                    className="absolute inset-x-0 top-0 flex justify-center -mt-3"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-amber-500">
                                        Most Popular
                                    </div>
                                </motion.div>
                            )}
                            <div>
                                <div className="mb-5">
                                    <h3 className="text-2xl font-bold leading-5 text-gray-900">{plan.name}</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="mr-1 text-4xl font-extrabold text-gray-900">${plan.price}</span>
                                        <span className="text-gray-600">/month</span>
                                    </div>
                                    <p className="mt-3 mb-5 text-sm text-gray-600">{plan.description}</p>
                                </div>
                                <ul className="mb-8 space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-center"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{
                                                opacity: hoveredPlan === index ? 1 : 0.8,
                                                x: 0,
                                                transition: { delay: i * 0.1 }
                                            }}
                                        >
                                            <motion.span
                                                className={`mr-2 ${feature.included ? 'text-green-500' : 'text-red-500'}`}
                                                animate={{
                                                    scale: hoveredPlan === index ? [1, 1.2, 1] : 1,
                                                    transition: { duration: 0.3 }
                                                }}
                                            >
                                                {feature.included ? <FaCheck /> : <FaTimes />}
                                            </motion.span>
                                            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                                                {feature.text}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button
                                    onClick={() => handlePlanClick()}
                                    className={`inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md ${plan.popular ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-800 hover:bg-gray-900'} focus:shadow-outline focus:outline-none`}
                                >
                                    {plan.cta}
                                    <FaArrowRightLong  className="ml-2" />
                                </button>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Features Comparison */}
            <motion.div
                className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        Compare Plan Features
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        See which plan is right for your business needs
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Feature
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Free
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-amber-600 uppercase tracking-wider bg-amber-50">
                                Basic
                            </th                                >
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Premium
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Reviews per month
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                Up to 10
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center bg-amber-50">
                                Up to 100
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                Unlimited
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Analytics
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                Basic
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center bg-amber-50">
                                Advanced
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                Enterprise
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                User accounts
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                1
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center bg-amber-50">
                                Up to 5
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                Unlimited
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Support
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                Email
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center bg-amber-50">
                                Email & Chat
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                24/7 Priority
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Response templates
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <FaTimes className="mx-auto text-red-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center bg-amber-50">
                                <FaCheck className="mx-auto text-green-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <FaCheck className="mx-auto text-green-500" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Website widgets
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <FaTimes className="mx-auto text-red-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center bg-amber-50">
                                <FaCheck className="mx-auto text-green-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <FaCheck className="mx-auto text-green-500" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Custom branding
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <FaTimes className="mx-auto text-red-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center bg-amber-50">
                                <FaTimes className="mx-auto text-red-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <FaCheck className="mx-auto text-green-500" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Dedicated account manager
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <FaTimes className="mx-auto text-red-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center bg-amber-50">
                                <FaTimes className="mx-auto text-red-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                <FaCheck className="mx-auto text-green-500" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        Find answers to common questions about our plans and pricing
                    </p>
                </div>
                <div className="max-w-screen-lg sm:mx-auto">
                    <motion.div
                        className="grid gap-8 lg:grid-cols-2"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className="border-b border-gray-300 pb-4"
                                variants={fadeIn}
                            >
                                <button
                                    className="flex items-center justify-between w-full mb-4 text-left"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                                    <motion.div
                                        animate={{ rotate: activeFaq === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg
                                            className="w-5 h-5 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </motion.div>
                                </button>
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: activeFaq === index ? "auto" : 0,
                                        opacity: activeFaq === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-gray-600 mb-4">{faq.answer}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                className="bg-gray-900 text-white py-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col items-center mb-8">
                            <IoMdCheckmarkCircleOutline className="text-amber-400 text-6xl mb-4" />
                            <h2 className="text-3xl font-extrabold mb-4">Ready to get started?</h2>
                            <p className="text-lg mb-8 max-w-3xl mx-auto">
                                Join thousands of businesses that use ReviewHub to collect, manage, and leverage customer reviews to grow their business.
                            </p>
                        </div>
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 transition duration-300 shadow-lg">
                                    Get Started Now
                                    <FaArrowRightLong className="ml-2" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition duration-300">
                                    Contact Sales
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div
                className="bg-white py-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <motion.div
                        className="bg-amber-50 p-8 rounded-xl relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-amber-100 rounded-full opacity-50"></div>
                        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-amber-100 rounded-full opacity-50"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-2xl">
                                    JD
                                </div>
                                <div className="flex-1">
                                    <div className="text-amber-400 flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="mr-1" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 text-lg italic">
                                        &apos;ReviewHub&apos;s pricing plans offered exactly what we needed at each stage of our business growth. We started with the Free plan to test the waters, upgraded to Basic as we expanded, and now the Premium plan provides all the advanced features we need to manage our reputation at scale.&quot;
                                    </p>
                                    <div>
                                        <p className="font-semibold text-gray-900">John Doe</p>
                                        <p className="text-gray-600 text-sm">CEO, TechInnovate Solutions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Money-Back Guarantee */}
            <motion.div
                className="bg-[#FAF8F5] py-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <motion.div
                        className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">30-Day Money Back Guarantee</h3>
                            <p className="text-gray-600">
                                Not satisfied with our service? We offer a 30-day money-back guarantee for all paid plans. No questions asked.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Additional Questions */}
            <motion.div
                className="bg-white py-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
                    <motion.h3
                        className="text-2xl font-bold text-gray-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Have more questions?
                    </motion.h3>
                    <motion.p
                        className="text-gray-600 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Our team is here to help you find the perfect plan for your business needs.
                    </motion.p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition duration-300">
                            Contact Support
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Page;

