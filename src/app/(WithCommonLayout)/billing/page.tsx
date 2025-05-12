import React from 'react';
import BillingHistory from "@/components/billingHistory/billingHistory";

const BillingHistoryPage = () => {

    // get payment history
    // get - /payment/my-payment


    const billingHistory = {
        "success": true,
        "message": "My Payments fetched successfully!",
        "data": [
            {
                "id": "5506f8d7-bcef-4aad-b87f-006a731681b7",
                "accountId": "3baa921e-674b-4a3a-a74a-1392628736ca",
                "transactionId": "premium-1747058407010",
                "amount": 29,
                "status": "PAID",
                "paymentGatewayData": {
                    "tran_id": "premium-1747058407010"
                },
                "createdAt": "2025-05-12T14:00:07.012Z",
                "updatedAt": "2025-05-12T14:02:24.323Z",
                "isDeleted": false,
                "account": {
                    "id": "3baa921e-674b-4a3a-a74a-1392628736ca",
                    "email": "user@gmail.com",
                    "role": "USER",
                    "isPremium": true
                }
            }
        ],
        "meta": null
    }


    return (
        <>
         <BillingHistory billingHistory={billingHistory} />
            
        </>
    );
};

export default BillingHistoryPage;