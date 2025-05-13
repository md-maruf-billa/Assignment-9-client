"use server"
// get all company
import {cookies} from "next/headers";

export const get_all_company = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company`,{
        cache: "no-store",
    })
     return  await res.json()

}

// get company by id
export const get_company_by_id = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/${id}`,{
        method: "GET"
    })
   return await res.json()

}

export const update_company_action = async (payload:any) => {
    const accessToken = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company`,{
        method: 'PATCH',
        headers: {
            "Authorization": accessToken!,
        },
        body:payload,
    })
    return  await res.json()

}