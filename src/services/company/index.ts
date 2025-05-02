"use server"
// get all company
export const get_all_company = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company`)
    const result = await res.json()
    return result;
}


