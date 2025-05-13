"use server"

import { cookies } from "next/headers";


// post - initiate payment - /payment/initiate-payment
export const create_new_payment_intent = async ()=>{
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/initiate-payment`, {
        method: "POST",
        headers: {
            "Authorization": accessToken!,
        }
    })
    console.log(result)
    return await result.json();
}



export const get_user_payments = async ()=>{
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment`, {
        method: "GET",
        headers: {
            "Authorization": accessToken!,
        }
    })
    return await result.json();
}
export const get_my_payments = async ()=>{
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/my-payment`, {
        method: "GET",
        headers: {
            "Authorization": accessToken!,
        }
    })
    return await result.json();
}



export const validate_payment_action = async (transactionId: string) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/validate-payment?tran_id=${transactionId}`, {
            method: 'GET',
            headers: {
                "Authorization": accessToken || '',
                "Content-Type": "application/json"
            }
        });

        return await res.json();
    } catch (error) {
        console.error("Payment validation error:", error);
        return {
            success: false,
            message: "Failed to validate payment",
            data: null
        };
    }
};
