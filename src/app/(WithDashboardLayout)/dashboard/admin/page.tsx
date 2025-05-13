"use client";

import React, { useEffect, useState } from "react";
import { AdminResponse } from "@/types/company";
import { useUser } from "@/context/UserContext";
import Loading from "@/components/shared/loading";
import { getMe } from "@/services/AdminServices/GetMe";
import { get_user_payments } from "@/services/payment";
import { getAllPremiumReview } from "@/services/AdminServices/PremiumServices";
import { IReview } from "./manageReviews/page";
import {AnimatePresence, motion } from "framer-motion";
import {FaChartBar, FaComments, FaMoneyBillWave, FaStar, FaStarHalfAlt, FaRegStar, FaPlus} from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import {createCategory} from "@/services/category";

function AdminHomePage() {
  const [admin, setAdminData] = React.useState<AdminResponse>({
    data: {
      id: "",
      status: "",
      email: "",
      role: "",
      createdAt: "",
      updatedAt: "",
      isDeleted: false,
      isCompleteProfile: false,
      admin: {
        id: "",
        name: "",
        email: "",
        accountId: "",
        profileImage: "",
        bio: "",
        createdAt: "",
        updatedAt: "",
        isDeleted: false,
      },
    },
    message: "",
    meta: null,
    success: false,
  });

  const [premiumReviews, setPremiumReviews] = React.useState<IReview[]>([]);
  const [payments, setPayments] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [adminRes, reviewsRes, paymentsRes] = await Promise.all([
          getMe(),
          getAllPremiumReview(),
          get_user_payments()
        ]);

        if (adminRes.success) {
          setAdminData(adminRes);
        }
        if (reviewsRes.success) {
          setPremiumReviews(reviewsRes.data || []);
        }
        if (paymentsRes.success) {
          // Filter paid payments only
          const paidPayments = paymentsRes.data.filter((payment: { status: string }) => payment.status === 'PAID');
          setPayments(paidPayments);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate payment analytics
  const [isOpen, setIsOpen] = useState(false);
  const totalRevenue = payments.reduce((sum, payment: { amount: number }) => sum + payment.amount, 0);
  const successfulPayments = payments.length; // All payments are PAID now
  const pendingPayments = 0; // No pending payments
  const failedPayments = 0; // No failed payments

  // Calculate review analytics
  const totalReviews = premiumReviews.length;
  const pendingReviews = premiumReviews.filter(r => r.status === 'PENDING').length;
  const approvedReviews = premiumReviews.filter(r => r.status === 'APPROVED').length;
  const rejectedReviews = premiumReviews.filter(r => r.status === 'REJECTED').length;
  const averageRating = premiumReviews.length > 0 
    ? premiumReviews.reduce((sum, review) => sum + review.rating, 0) / premiumReviews.length 
    : 0;
const [image,setImage] = useState<File | null>(null)

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const categoryName = (form.elements.namedItem("category_name") as HTMLInputElement)?.value;

    if (!image || !categoryName) return toast.error("Please select a image and name!!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify({ name: categoryName }));

    try {
      const id = toast.loading("Category creating....")
      const res = await createCategory(formData);
      if (res?.success) {
        toast.success("Category created successfully",{id});
        setImage(null);
        toggleModal();
      } else {
        toast.error(res?.message || "Failed to create category",{id});
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the category");
    }
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {admin.data.admin.name}</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Payment Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">${totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <p className="text-gray-500">Success</p>
                <p className="font-medium text-green-600">{successfulPayments}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Pending</p>
                <p className="font-medium text-yellow-600">{pendingPayments}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Failed</p>
                <p className="font-medium text-red-600">{failedPayments}</p>
              </div>
            </div>
          </motion.div>

          {/* Review Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalReviews}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaComments className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <p className="text-gray-500">Pending</p>
                <p className="font-medium text-yellow-600">{pendingReviews}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Approved</p>
                <p className="font-medium text-green-600">{approvedReviews}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Rejected</p>
                <p className="font-medium text-red-600">{rejectedReviews}</p>
              </div>
            </div>
          </motion.div>

          {/* Rating Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Rating</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{averageRating.toFixed(1)}</h3>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FaChartBar className="text-amber-600 text-xl" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">
                    {i < Math.floor(averageRating) ? (
                      <FaStar />
                    ) : i < Math.ceil(averageRating) ? (
                      <FaStarHalfAlt />
                    ) : (
                      <FaRegStar />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Quick Actions</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">Manage Content</h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaChartBar className="text-purple-600 text-xl" />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard/admin/payments"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <FaMoneyBillWave className="mr-2" />
                Payments
              </Link>
              <Link
                href="/dashboard/admin/manageReviews"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <FaComments className="mr-2" />
                Reviews
              </Link>
              <>
                <button
                    onClick={toggleModal}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-sm text-white rounded-md flex items-center gap-2 transition-colors duration-200"
                >
                  <FaPlus />
                  Create Category
                </button>

                <AnimatePresence>
                  {isOpen && (
                      <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0  bg-opacity-40 z-40"
                            onClick={toggleModal}
                        />

                        {/* Modal */}
                        <motion.div
                            key="modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-50 flex items-center justify-center"
                        >
                          <div className="bg-white rounded-md p-6 w-full max-w-md relative z-50 shadow-xl">
                            <button
                                onClick={toggleModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                            >
                              ×
                            </button>

                            <h2 className="text-xl font-semibold mb-4 text-center">
                              Create New Category
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                              <input
                                  type="text"
                                  placeholder="Category Name"
                                  className="border p-2 rounded-md"
                                  name="category_name"
                                  required
                              />

                              <input
                                  type="file"
                                  accept="image/*"
                                  className="border p-2 rounded-md"
                                  onChange={(e) => {
                                    if (e.target.files) setImage(e.target.files[0]);
                                  }}
                                  required
                              />

                              <button
                                  type="submit"
                                  className="bg-yellow-400 text-white py-2 rounded-md hover:bg-yellow-500 ease-linear duration-300 transition"
                              >
                                 Create Category
                              </button>
                            </form>
                          </div>
                        </motion.div>
                      </>
                  )}
                </AnimatePresence>
              </>
            </div>
          </motion.div>
        </div>

        {/* Payment Data Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Payments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.slice(0, 5).map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'PAID' 
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {payments.length > 5 && (
            <div className="mt-4 text-right">
              <Link 
                href="/dashboard/admin/payments" 
                className="text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                View All Payments →
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Reviews</h3>
              <Link
                href="/dashboard/admin/manageReviews"
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {premiumReviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{review.title}</p>
                      <p className="text-sm text-gray-500">{review.reviewerName}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        review.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : review.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {review.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Payments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Payments</h3>
              <Link
                href="/dashboard/admin/payments"
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {payments.slice(0, 5).map((payment) => (
                <div key={payment.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">${payment.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{payment.transactionId}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        payment.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
