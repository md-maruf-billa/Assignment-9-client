"use client"

import React from 'react';
import CompanyDashboard from "@/components/CompanyDashboard/CompanyDashboard";
import {CompanyResponse} from "@/types/company";
import {get_company_by_id} from "@/services/company";
import Loading from "@/components/shared/loading";
import {FaBuilding} from "react-icons/fa";
import Link from "next/link";
import {FaArrowLeftLong} from "react-icons/fa6";
import {useUser} from "@/context/UserContext";

function CompanyHomePage() {


    const [company, setCompany] = React.useState<CompanyResponse>({
        data: undefined,
        message: "",
        meta: undefined,
        success: false
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const {user} = useUser();


    const  id = user?.company?.id;

    React.useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const result = await get_company_by_id(id as string);
                setCompany(result);
            } catch (error: any) {
                setError(error);
                console.error('Failed to load company:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [id]);


    if (isLoading) return <Loading />

    if (error || !company) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
                <FaBuilding className="text-gray-400 text-5xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h2>
                <Link href="/company" className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-md">
                    <FaArrowLeftLong className="mr-2" />
                    Back to Companies
                </Link>
            </div>
        );
    }



    return (
        <>
            <CompanyDashboard companyData={company} isLoading={isLoading} />
        </>
    );
}

export default CompanyHomePage;