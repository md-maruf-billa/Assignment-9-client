"use client";

import React, {use, useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaSpinner, FaExclamationTriangle, FaHome, FaUserCircle } from 'react-icons/fa';
import { validate_payment_action } from '@/services/payment';
import {toast} from "sonner";


interface PaymentSuccessPageProps {
    params: {
        transId: string;
    };
}

interface Props {
    params: Promise<{ transId: string }>;
}


const PaymentSuccessPage = ({ params }: Props) => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transactionDetails, setTransactionDetails] = useState<any>(null);
    //const router = useRouter();

    //const { transId } = params;

    const { transId } = use(params);

    // Get transaction ID from URL params
    //const transId = searchParams.get('tran_id');
    console.log(transId);

    useEffect(() => {
        const verifyPayment = async () => {
            if (!transId) {
                setError("Transaction ID not found");
                setIsLoading(false);
                return;
            }

            try {
                // Use the server action to validate payment
                const response = await validate_payment_action(transId);
                console.log(response);

                if (response.success) {
                    setIsVerified(true);
                    setTransactionDetails(response.data);
                    toast.success(response.message);
                } else {
                    setError(response.message);
                }
            } catch (err: any) {
                setError("An error occurred while verifying your payment");
                console.error("Payment verification error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        verifyPayment();
    }, [transId]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-[#FAF8F5] min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {isLoading ? (
                        <div className="p-10 text-center">
                            <FaSpinner className="animate-spin text-amber-500 text-4xl mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Verifying Your Payment</h2>
                            <p className="text-gray-500">Please wait while we confirm your transaction...</p>
                        </div>
                    ) : error ? (
                        <div className="p-10 text-center">
                            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Payment Verification Failed</h2>
                            <p className="text-gray-500 mb-6">{error}</p>
                            <div className="flex justify-center space-x-4">
                                <Link href="/public" className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md flex items-center transition-colors duration-200">
                                    <FaHome className="mr-2" />
                                    Go Home
                                </Link>
                                <Link href="/plans" className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md flex items-center transition-colors duration-200">
                                    Try Again
                                    <FaArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Header */}
                            <div className="bg-gray-900 p-6 text-center">
                                <motion.div variants={itemVariants}>
                                    <FaCheckCircle className="text-green-400 text-5xl mx-auto mb-4" />
                                    <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
                                    <p className="text-gray-300 mt-2">Your premium subscription has been activated</p>
                                </motion.div>
                            </div>

                            {/* Transaction Details */}
                            <div className="p-8">
                                <motion.div
                                    variants={itemVariants}
                                    className="mb-8 text-center"
                                >
                                    <p className="text-gray-600">
                                        Thank you for your payment. Your transaction has been completed successfully, and your premium subscription is now active.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-amber-50 rounded-lg p-6 mb-8"
                                >
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaction Details</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between border-b border-amber-100 pb-2">
                                            <span className="text-gray-600">Transaction ID:</span>
                                            <span className="font-medium text-gray-800">{transId}</span>
                                        </div>
                                        {transactionDetails && (
                                            <>
                                                {/*<div className="flex justify-between border-b border-amber-100 pb-2">*/}
                                                {/*    <span className="text-gray-600">Amount:</span>*/}
                                                {/*    <span className="font-medium text-gray-800">${transactionDetails.amount}</span>*/}
                                                {/*</div>*/}
                                                {/*<div className="flex justify-between border-b border-amber-100 pb-2">*/}
                                                {/*    <span className="text-gray-600">Date:</span>*/}
                                                {/*    <span className="font-medium text-gray-800">{formatDate(transactionDetails.createdAt)}</span>*/}
                                                {/*</div>*/}
                                                <div className="flex justify-between border-b border-amber-100 pb-2">
                                                    <span className="text-gray-600">Status:</span>
                                                    <span className="font-medium text-green-600">Completed</span>
                                                </div>
                                                <div className="flex justify-between pb-2">
                                                    <span className="text-gray-600">Subscription:</span>
                                                    <span className="font-medium text-gray-800">{transactionDetails.planName || "Premium"}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-green-50 rounded-lg p-6 mb-8"
                                >
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">What's Next?</h2>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start">
                                            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>Your premium features are now unlocked and ready to use</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>You can now access premium reviews and insights</span>
                                        </li>
                                        <li className="flex items-start">
                                            <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>A receipt has been sent to your email address</span>
                                        </li>
                                    </ul>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
                                >
                                    <Link href="/" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md flex items-center justify-center transition-colors duration-200">
                                        <FaHome className="mr-2" />
                                        Return to Home
                                    </Link>
                                    <Link href="/billing" className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md flex items-center justify-center transition-colors duration-200">
                                        <FaUserCircle className="mr-2" />
                                        Go to Billing
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Support Information */}
                <motion.div
                    className="mt-8 text-center text-gray-600 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <p>If you have any questions about your payment or subscription, please contact our support team.</p>
                    <p className="mt-2">
                        <a href="mailto:support@reviewhub.com" className="text-amber-600 hover:underline">support@reviewhub.com</a> | <a href="tel:+1234567890" className="text-amber-600 hover:underline">+1 (234) 567-890</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
