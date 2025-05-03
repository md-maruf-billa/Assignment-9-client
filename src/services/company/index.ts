"use server"
// get all company
export const get_all_company = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company`)
    const result = await res.json()
    return result;
}

// get company by id
export const get_company_by_id = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/${id}`)
    const result = await res.json()
    return result;
}


