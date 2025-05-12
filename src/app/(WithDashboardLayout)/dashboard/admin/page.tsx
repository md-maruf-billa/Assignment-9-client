"use client";

import React, { useEffect } from "react";
import CompanyDashboard from "@/components/CompanyDashboard/CompanyDashboard";
import { AdminResponse, CompanyResponse } from "@/types/company";
import { useParams } from "next/navigation";
import { get_company_by_id } from "@/services/company";
import Loading from "@/components/shared/loading";
import { FaBuilding } from "react-icons/fa";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useUser } from "@/context/UserContext";
import AdminDashboard from "@/components/AdminDashboard";
import { getMe } from "@/services/AdminServices/GetMe";
import { getAllPremiumReview } from "@/services/AdminServices/PremiumServices";
import { IReview } from "./manageReviews/page";

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [premiumReviews, setPremiumReviews] = React.useState<IReview[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();

  // if(!user || user.role !== "ADMIN" ) {
  //     return (
  //         <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
  //             <FaBuilding className="text-gray-400 text-5xl mb-4" />
  //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Unauthorized Access</h2>
  //             <Link href="/" className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-md">
  //                 <FaArrowLeftLong className="mr-2" />
  //                 Back to Home
  //             </Link>
  //         </div>
  //     );
  // }

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await getMe();
        setAdminData(result);
      } catch (error: any) {
        setError(error);
        console.error("Failed to load company:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getAllPremiumReview();
      const reviews = res?.data?.filter((review: IReview) => review.isPremium);
      setPremiumReviews(reviews || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (isLoading) return <Loading />;

  if (error || !admin) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <FaBuilding className="text-gray-400 text-5xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Company Not Found
        </h2>
        <Link
          href="/company"
          className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-md"
        >
          <FaArrowLeftLong className="mr-2" />
          Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <>
      <AdminDashboard
        adminData={admin}
        isLoading={isLoading}
        premiumReviews={premiumReviews}
      />
    </>
  );
}

export default AdminHomePage;
