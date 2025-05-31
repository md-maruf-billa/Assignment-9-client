import ProductComponent from "@/components/ProductPageComponent/index.2";
import {get_all_products_action} from "@/services/product";
import React from "react";
import {Input} from "@/components/ui/input"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label"
import {allCategory} from "@/services/category";
import {ICategory} from "@/types/product";

const page = async () => {
    const {data: productData} = await get_all_products_action();
    const {data: categories} = await allCategory()
    return (
        <div className="container mx-auto px-3 grid grid-cols-7">
            <div className=" p-4 mt-10">
                <div className="space-y-2">
                    <h1 className="text-amber-500 font-bold">Search</h1>
                    <Input type="email" placeholder="Email"/>
                </div>
                <div className="space-y-3 mt-5">
                    <h1 className="text-amber-500 font-bold">Category</h1>
                    <RadioGroup defaultValue="all">
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="all" id="c1"/>
                            <Label htmlFor="c1">All</Label>
                        </div>
                        {
                            categories?.map((category: ICategory, idx: number) =>
                                <div key={category.id} className="flex items-center gap-3">
                                    <RadioGroupItem value={category.id} id={`c+${idx + 2}`}/>
                                    <Label htmlFor={`c+${idx + 2}`}>{category.name}</Label>
                                </div>)
                        }

                    </RadioGroup>
                </div>
                <div className="space-y-3 mt-5">
                    <h1 className="text-amber-500 font-bold">Ratings</h1>
                    <RadioGroup defaultValue="all">
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="all" id="r1"/>
                            <Label htmlFor="r1">All</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="1" id="r2"/>
                            <Label htmlFor="r2">1</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="2" id="r3"/>
                            <Label htmlFor="r3">2</Label>
                        </div>


                    </RadioGroup>
                </div>
            </div>
            <div className="col-span-6">
                <ProductComponent products={productData}/>
            </div>
        </div>
    );
};

export default page;
