import { get_all_company } from "@/services/company";

const Company = async () => {
    const result = await get_all_company()
    console.log(result)
    return <>
    </>
}


export default Company;