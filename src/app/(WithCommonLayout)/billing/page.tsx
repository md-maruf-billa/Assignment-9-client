import React from 'react';
import BillingHistory from "@/components/billingHistory/billingHistory";
import {get_my_payments} from "@/services/payment";

const BillingHistoryPage = async () => {

    const res = await get_my_payments()


    return (
        <>
         <BillingHistory billingHistory={res} />
            
        </>
    );
};

export default BillingHistoryPage;