"use server"

export const get_all_team_members_action = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/team`)
    return await res.json()
}