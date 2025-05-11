"use client"
import ProductDetails, {ProductResponse} from "@/components/ProductDetails/ProductDetails";
import {get_product_by_id_action} from "@/services/product";
import {useParams} from "next/navigation";
import {useEffect,useState} from "react";

const ProductDetailsPage =  () => {
    const [isLoading, setIsLoading] = useState(true);
    const [refatch,setRefatch] = useState(true);
    const [product,setProduct] = useState<ProductResponse>();
    const {id} =  useParams();
    useEffect(()=>{
        const fetchData =async ()=>{
            const res = await get_product_by_id_action(id as string);
            setProduct(res);
            setRefatch(false);
            setIsLoading(false);
        }
        fetchData();
    },[id, isLoading,refatch])

   


    return (
        <>
            <ProductDetails productData={product!} isLoading={isLoading} setRefatch={setRefatch} />
        </>
    );
};

export default ProductDetailsPage;