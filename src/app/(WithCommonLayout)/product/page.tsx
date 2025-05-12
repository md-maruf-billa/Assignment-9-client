import ProductPageComponent from "@/components/ProductPageComponent";
import ProductComponent from "@/components/ProductPageComponent/index.2";
import { get_all_products_action } from "@/services/product";
import React from "react";

const page = async () => {
      const { data: productData } = await get_all_products_action();
  return (
    <div className="container mx-auto px-3">
        <ProductComponent products= {productData} />
        
      <ProductPageComponent />
    </div>
  );
};

export default page;
