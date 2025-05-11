"use server"

import {cookies} from "next/headers";

export const update_user_profile_action = async (payload:any)=>{
    const accessToken = (await cookies()).get("accessToken")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
        method: 'PATCH',
        headers: {
            "Authorization": accessToken!
        },
        body: payload,
    })
    return await res.json()
}

// get all user

export const get_all_user_action = async ()=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
        headers: {
            "Authorization": token!
        }
    })
    return await res.json()
}