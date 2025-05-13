"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaReceipt, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { format } from 'date-fns';

// Define types for the API response
interface Account {
    id: string;
    email: string;
    role: string;
    isPremium: boolean;
}

interface PaymentGatewayData {
    tran_id: string;
    [key: string]: any;
}

interface Payment {
    id: string;
    accountId: string;
    transactionId: string;
    amount: number;
    status: string;
    paymentGatewayData: PaymentGatewayData;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    account: Account;
}

interface BillingHistoryResponse {
    success: boolean;
    message: string;
    data: Payment[];
    meta: any;
}

interface BillingHistoryProps {
    billingHistory: BillingHistoryResponse;
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ billingHistory }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortField, setSortField] = React.useState<'createdAt' | 'amount' | 'status'>('createdAt');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

    // Filter and sort payments
    const filteredPayments = React.useMemo(() => {
        if (!billingHistory?.success || !billingHistory?.data) return [];

        return [...billingHistory.data]
            .filter(payment =>
                payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.amount.toString().includes(searchTerm)
            )
            .sort((a, b) => {
                if (sortField === 'createdAt') {
                    return sortDirection === 'asc'
                        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                } else if (sortField === 'amount') {
                    return sortDirection === 'asc'
                        ? a.amount - b.amount
                        : b.amount - a.amount;
                } else {
                    return sortDirection === 'asc'
                        ? a.status.localeCompare(b.status)
                        : b.status.localeCompare(a.status);
                }
            });
    }, [billingHistory, searchTerm, sortField, sortDirection]);

    // Handle sort toggle
    const handleSort = (field: 'createdAt' | 'amount' | 'status') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy • h:mm a');
        } catch (error) {
            return 'Invalid date';
        }
    };

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PAID':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" />
            Paid
          </span>
                );
            case 'PENDING':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaInfoCircle className="mr-1" />
            Pending
          </span>
                );
            case 'FAILED':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaExclamationCircle className="mr-1" />
            Failed
          </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
                );
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    // Render sort icon
    const renderSortIcon = (field: 'createdAt' | 'amount' | 'status') => {
        if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
        return sortDirection === 'asc' ? <FaSortUp className="ml-1 text-amber-500" /> : <FaSortDown className="ml-1 text-amber-500" />;
    };

    return (
        <div className="bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">Billing History</h2>
                            <div className="w-full md:w-64">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search transactions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                                    />
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    {billingHistory.success && billingHistory.data && billingHistory.data.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="overflow-x-auto"
                        >
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('createdAt')}
                                    >
                                        <div className="flex items-center">
                                            Date
                                            {renderSortIcon('createdAt')}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('amount')}
                                    >
                                        <div className="flex items-center">
                                            Amount
                                            {renderSortIcon('amount')}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center">
                                            Status
                                            {renderSortIcon('status')}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPayments.map((payment) => (
                                    <motion.tr
                                        key={payment.id}
                                        variants={itemVariants}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                                            <div className="text-xs text-gray-500">{payment.id.substring(0, 8)}...</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDate(payment.createdAt)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-amber-600">${payment.amount.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(payment.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                className="text-amber-600 hover:text-amber-900 mr-3"
                                                title="Download Receipt"
                                            >
                                                <FaDownload />
                                            </button>
                                            <button
                                                className="text-gray-600 hover:text-gray-900"
                                                title="View Details"
                                            >
                                                <FaReceipt />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        </motion.div>
                    ) : (
                        <div className="text-center py-16">
                            <FaReceipt className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No payment history</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {billingHistory.success
                                    ? "You haven't made any payments yet."
                                    : billingHistory.message || "Failed to load billing history."}
                            </p>
                        </div>
                    )}

                    {/* Pagination or Summary */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{filteredPayments.length}</span> transactions
                            </div>
                            {billingHistory.success && billingHistory.data && billingHistory.data.length > 0 && (
                                <div className="text-sm text-gray-700">
                                    Total amount: <span className="font-medium text-amber-600">
                    ${billingHistory.data.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}
                  </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <motion.div
                    className="mt-8 bg-white rounded-lg shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Methods</h4>
                            <p className="text-sm text-gray-700">
                                We accept various payment methods including credit cards, debit cards, and digital wallets.
                                All transactions are secure and encrypted.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Need Help?</h4>
                            <p className="text-sm text-gray-700">
                                If you have any questions about your billing or need assistance with a payment,
                                please contact our support team at <a href="mailto:support@reviewhub.com" className="text-amber-600 hover:underline">support@reviewhub.com</a>.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BillingHistory;
