"use server"

import {cookies} from "next/headers";

export const create_review_action = async (palyad:Record<string, string|number|boolean>)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/review/create-review`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token!,
        },
        body: JSON.stringify(palyad),
    })

    return await res.json();
}

export const create_voter_action = async ({reviewId,type}:{reviewId:string,type:string})=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/review/vote?reviewId=${reviewId}&type=${type}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token!,
        }
    })

    return await res.json();
}

