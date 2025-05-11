"use client";
import React, {useState, useRef, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
    FaTag,
    FaDollarSign,
    FaAlignLeft,
    FaImage,
    FaCheck,
    FaTimes,
    FaArrowRight
} from 'react-icons/fa';
import Image from "next/image";
import { useWatch } from 'react-hook-form';
import {create_new_product_action} from "@/services/product";
import {allCategory} from "@/services/category";

type FormValues = {
    name: string;
    price: number;
    description: string;
    categoryId?: string;
    tags?: string;
};


const CreateProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // fetch category
    useEffect(() => {
        const fetchCategory = async ()=>{
            const res = await allCategory();
            setCategories(res?.data);
        }
        fetchCategory();
    },[])


    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            price: 0,
            description: '',
            categoryId: '',
            tags: ''
        }
    });

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            validateAndSetImage(file);
        }
    };

    const validateAndSetImage = (file: File) => {
        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
            return;
        }

        // Check file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image size should be less than 10MB');
            return;
        }

        setSelectedImage(file);
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetImage(e.dataTransfer.files[0]);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (data: FormValues) => {
        const id = toast.loading('Verifying product data ...');
        if (!selectedImage) {
            toast.error('Please select a product image');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            data.price = Number(data.price);
            formData.append('data', JSON.stringify(data));
            formData.append('image', selectedImage);
           const res = await create_new_product_action(formData);
           if(res.success) {
               toast.success(res?.message,{id});
               reset();
               setSelectedImage(null);
               setImagePreview(null);
           }else{
               toast.error(res.message,{id})
           }


        } catch (error) {
            toast.error('Failed to create product',{id});
        } finally {
            setIsLoading(false);
        }
    };

    const watchedValues = useWatch({
        control,
        // Optional: specify which fields to watch
        // name: ['name', 'price', 'description', 'category']
    });

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="bg-gray-900 p-6">
                    <h1 className="text-2xl font-bold text-white">Create New Product</h1>
                    <p className="text-gray-300 mt-1">Add a new product to your company&apos;s catalog</p>
                </div>

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8"
                    variants={staggerContainer}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div variants={fadeIn} className="space-y-6">
                            {/* Product Name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaTag className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register('name', { required: 'Product name is required' })}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Enter product name"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Product Price */}
                            <div className="space-y-2">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaDollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        {...register('price', {
                                            required: 'Price is required',
                                            min: { value: 0.01, message: 'Price must be greater than 0' }
                                        })}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                                )}
                            </div>

                            {/* Product Category */}
                            <div className="space-y-2">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <select
                                        id="category"
                                        {...register('categoryId')}
                                        className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                    >
                                        <option value="">Select a category</option>
                                        {categories?.map((category:any) => (
                                            <option key={category?.id} value={category?.id}>{category?.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Product Tags */}
                            <div className="space-y-2">
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Tags (comma separated)
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="tags"
                                        type="text"
                                        {...register('tags')}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="premium, bestseller, new"
                                    />
                                </div>
                            </div>

                            {/* Product Description */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                        <FaAlignLeft className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        id="description"
                                        rows={6}
                                        {...register('description', { required: 'Description is required' })}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Enter product description"
                                    />
                                </div>
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                )}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeIn} className="space-y-6">
                            {/* Product Image Upload */}
                            <div className="space-y-2">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Product Image
                                </label>
                                <div className="mt-1 flex flex-col items-center">
                                    {imagePreview ? (
                                        <div className="mb-4 relative">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="relative"
                                            >
                                                <Image
                                                    src={imagePreview}
                                                    alt="Product preview"
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-64 object-contain rounded-md border border-gray-300"
                                                />
                                                <motion.button
                                                    type="button"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => {
                                                        setSelectedImage(null);
                                                        setImagePreview(null);
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                                >
                                                    <FaTimes className="h-4 w-4" />
                                                </motion.button>
                                            </motion.div>
                                            <div className="mt-2 text-center text-sm text-gray-600">
                                                <FaCheck className="inline-block mr-1 text-green-500" />
                                                Image selected: {selectedImage?.name}
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className={`flex justify-center px-6 pt-5 pb-6 border-2 ${dragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300 border-dashed'} rounded-md w-full h-64 transition-colors duration-200`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            onClick={triggerFileInput}
                                        >
                                            <div className="space-y-1 text-center flex flex-col items-center justify-center">
                                                <motion.div
                                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                                                </motion.div>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="image-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            ref={fileInputRef}
                                                            id="image-upload"
                                                            name="image-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="sr-only"
                                                            onChange={handleImageChange}
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 10MB</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product Preview Card */}
                            <div className="space-y-2 mt-6">
                                <h3 className="block text-sm font-medium text-gray-700">Product Preview</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                                            {imagePreview ? (
                                                <Image height={100} width={100} src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <FaImage className="text-gray-400 h-8 w-8" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">
                                                {watchedValues.name || 'Product Name'}
                                            </h4>
                                            <div className="flex items-center mt-1">
          <span className="text-amber-600 font-medium">
            ${watchedValues.price ? Number(watchedValues.price).toFixed(2) : '0.00'}
          </span>
                                                {watchedValues.categoryId && (
                                                    <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              {watchedValues.categoryId}
            </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                {watchedValues.description || 'Product description will appear here'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Section */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
                                <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for Great Product Listings</h3>
                                <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
                                    <li>Use high-quality, well-lit images that showcase your product clearly</li>
                                    <li>Write detailed descriptions that highlight key features and benefits</li>
                                    <li>Include accurate dimensions, materials, and other specifications</li>
                                    <li>Set competitive prices based on market research</li>
                                    <li>Use relevant tags to improve discoverability</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Submit Button */}
                    <motion.div
                        className="mt-8 flex justify-end"
                        variants={fadeIn}
                    >
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Product...
                                </>
                            ) : (
                                <>
                                    Create Product
                                    <FaArrowRight className="ml-2" />
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                </motion.form>
            </motion.div>

            {/* Additional Information Section */}
            <motion.div
                className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Product Management</h2>
                    <p className="text-gray-600 mb-4">
                        After creating your product, you can manage it from your dashboard. You&apos;ll be able to:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-gray-900 mb-2">Edit Products</h3>
                            <p className="text-sm text-gray-600">
                                Update product details, pricing, and images at any time
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-gray-900 mb-2">Track Performance</h3>
                            <p className="text-sm text-gray-600">
                                Monitor views, sales, and customer feedback
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-gray-900 mb-2">Manage Inventory</h3>
                            <p className="text-sm text-gray-600">
                                Update stock levels and availability status
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-900">How long does it take for a product to appear in search results?</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                New products typically appear in search results within 24 hours after approval by our team.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Can I offer discounts on my products?</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Yes, you can create special offers and discounts through the Promotions section in your dashboard.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">How do I respond to customer reviews?</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                You can respond to customer reviews through the Reviews section in your dashboard. Engaging with customer feedback helps build trust.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateProductPage;

