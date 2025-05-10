import { get_all_company } from "@/services/company";
import Companies from "@/components/Companies/Companies";

const Company = async () => {
    const result = await get_all_company()
    console.log(result);

    return (
        <>
            <Companies companiesData={result} />
        </>)
}


export default Company;