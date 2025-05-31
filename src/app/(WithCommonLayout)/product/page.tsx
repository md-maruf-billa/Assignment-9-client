"use client"

import ProductComponent from "@/components/ProductPageComponent/index.2";
import {get_all_products_action} from "@/services/product";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {allCategory} from "@/services/category";
import {ICategory, Product} from "@/types/product";
import Loading from "@/components/shared/loading";

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);

    // Fetch categories on load
    useEffect(() => {
        const fetchCategories = async () => {
            const {data} = await allCategory();
            setCategories(data || []);
        };
        fetchCategories();
    }, []);

    // Fetch products on search/category change
    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            const {data} = await get_all_products_action({
                searchTerm,
                selectedCategory,
            });
            setProducts(data || []);
            setLoading(false);
        };
        fetchProducts();
    }, [searchTerm, selectedCategory]);

    return (
        <div className="container mx-auto px-3 grid grid-cols-7">
            {/* Sidebar */}
            <div className="p-4 mt-10 space-y-5">
                <div className="space-y-2">
                    <h1 className="text-amber-500 font-bold">Search</h1>
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="space-y-3">
                    <h1 className="text-amber-500 font-bold">Category</h1>
                    <RadioGroup
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="all" id="c1"/>
                            <Label htmlFor="c1">All</Label>
                        </div>
                        {categories?.map((category: ICategory, idx: number) => (
                            <div key={category.id} className="flex items-center gap-3">
                                <RadioGroupItem
                                    value={category.id}
                                    id={`c${idx + 2}`}
                                />
                                <Label htmlFor={`c${idx + 2}`}>{category.name}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>

            {/* Product List */}
            <div className="col-span-6">
                {
                    loading ? <Loading /> :

                        <ProductComponent products={products}/>
                }
            </div>
        </div>
    );
};

export default Page;
