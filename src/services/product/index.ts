
"use server"

// create new product
import {cookies} from "next/headers";


export const create_new_product_action = async (payload:any)=>{
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/create-product`, {
        method: "POST",
        headers: {
            "Authorization": accessToken!,
        },
        body: payload
    })
    return await result.json();
}

export const get_all_products_action = async ()=>{
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/`,{
        cache:"no-store",
    })
    return await result.json();
}


export const update_product_action = async (id:string,payload:any)=>{
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/update-product/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": accessToken!,
        },
        body: payload
    })
    return await result.json();
}
export const delete_product_action = async (id:string)=>{
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/delete-product/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": accessToken!,
        }
    })
    return await result.json();
}

// get product by id
export const get_product_by_id_action = async (id:string)=> {
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`)
    return await result.json();
}

export const get_product_by_category_id_action = async (id:string)=> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/category/${id}`)
    return await res.json();
}