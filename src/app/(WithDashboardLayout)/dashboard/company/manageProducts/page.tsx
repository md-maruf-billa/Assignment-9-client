"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Image from 'next/image';
import {
    FaTrashAlt,
    FaSearch,
    FaSort,
    FaPlus,
    FaTag,
    FaDollarSign,
    FaAlignLeft,
    FaImage,
    FaCheck,
    FaTimes,
    FaArrowRight,
    FaFilter,
} from 'react-icons/fa';
import Link from 'next/link';
import { FiTrash2} from "react-icons/fi";
import {RiEditLine} from "react-icons/ri";
import {delete_product_action, get_all_products_action, update_product_action} from "@/services/product";
import {allCategory} from "@/services/category";
import {Product} from "@/types/company";
import {ICategory} from "@/types/product";


// Form values type for the update modal
type FormValues = {
    name: string;
    price: number;
    description: string;
    categoryId?: string;
};



const ManageProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortConfig, setSortConfig] = useState<{key: string, direction: 'ascending' | 'descending'} | null>(null);

    // State for modal and selected product
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // State for image upload in the update modal
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    useEffect(() => {
        const fetchProduct = async ()=>{
            const res = await get_all_products_action()
            setProducts(res.data)
        }

        const fetchCategory = async ()=>{
            const res = await allCategory();
            setCategories(res?.data);
        }
        fetchCategory();
        fetchProduct()
    }, [isLoading]);
    // State for search, filter, and sorting


    // Form setup for the update modal
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            price: 0,
            description: '',
            categoryId: '',
        }
    });

    // Effect to set form values when a product is selected for update
    useEffect(() => {
        if (selectedProduct) {
            setValue('name', selectedProduct.name);
            setValue('price', selectedProduct.price);
            setValue('description', selectedProduct.description);
            setValue('categoryId', selectedProduct.categoryId || '')


            if (selectedProduct.imageUrl) {
                setImagePreview(selectedProduct.imageUrl);
            }
        }
    }, [selectedProduct, setValue]);

    // Function to open the update modal with a selected product
    const handleOpenUpdateModal = (product: Product) => {
        setSelectedProduct(product);
        setIsUpdateModalOpen(true);
    };

    // Function to open the delete confirmation modal
    const handleOpenDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    // Function to close modals and reset state
    const handleCloseModals = () => {
        setIsUpdateModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        setSelectedImage(null);
        setImagePreview(null);
        reset();
    };

    // Function to handle image change in the update modal
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            validateAndSetImage(file);
        }
    };

    // Function to validate and set the selected image
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

    // Functions for drag and drop image upload
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

    // Function to handle product update submission
    const handleUpdateProduct = async (data: FormValues) => {
        if (!selectedProduct) return;
        setIsLoading(true);
        try {
            data.price = Number(data?.price);
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            if (selectedImage) {
              formData.append('image', selectedImage);
            }
            const res = await update_product_action(selectedProduct?.id,formData);
            if(res.success) {
                toast.success(res.message);
                setIsLoading(true);
            }
            else{
                toast.error(res.message);
            }
            handleCloseModals();
        } catch (error) {
            toast.error('Failed to update product');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle product deletion
    const handleDeleteProduct = async () => {
        if (!selectedProduct) return;
        setIsLoading(true);

        try {
            const res = await delete_product_action(selectedProduct.id);
            if(res.success) {
                toast.success(res.message);
                setIsLoading(true);
            }
            else{
                toast.error(res.message);
            }
            handleCloseModals();
        } catch (error) {
            toast.error(JSON.stringify(error));
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle sorting
    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Apply sorting, filtering, and searching to products
    const filteredAndSortedProducts = React.useMemo(() => {
        let filteredProducts = [...products];

        // Apply category filter
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product =>
                product.categoryId === selectedCategory
            );
        }

        // Apply search
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        if (sortConfig) {
            filteredProducts.sort((a, b) => {

                if (a[sortConfig.key as keyof Product] < b[sortConfig.key as keyof Product]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }

                if (a[sortConfig.key as keyof Product] > b[sortConfig.key as keyof Product]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredProducts;
    }, [products, selectedCategory, searchTerm, sortConfig]);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    const tableRowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        }),
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="bg-gray-900 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Manage Products</h1>
                            <p className="text-gray-300 mt-1">View, edit, and delete your company&apos;s products</p>
                        </div>
                        <Link
                            href="/dashboard/company/createProduct"
                            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                        >
                            <FaPlus className="mr-2" />
                            Add New Product
                        </Link>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="w-full md:w-64">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaFilter className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category:ICategory) => (
                                        <option key={category?.id} value={category?.id}>{category?.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Stats and Filters Summary */}
                    <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-gray-600">
                        <div>
                            Showing <span className="font-medium">{filteredAndSortedProducts.length}</span> of <span className="font-medium">{products.length}</span> products
                            {selectedCategory && (
                                <span className="ml-2">
                  in <span className="font-medium">{categories?.find((ct:ICategory)=>ct.id == selectedCategory)?.name}</span>
                  <button
                      className="ml-1 text-amber-600 hover:text-amber-800"
                      onClick={() => setSelectedCategory('')}
                  >
                    ×
                  </button>
                </span>
                            )}
                            {searchTerm && (
                                <span className="ml-2">
                  matching &quot;<span className="font-medium">{searchTerm}</span>&quot;
                  <button
                      className="ml-1 text-amber-600 hover:text-amber-800"
                      onClick={() => setSearchTerm('')}
                  >
                    ×
                  </button>
                </span>
                            )}
                        </div>

                        <div className="mt-2 md:mt-0">
                            <button
                                className="text-amber-600 hover:text-amber-800"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('');
                                    setSortConfig(null);
                                }}
                            >
                                Clear all filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                    {filteredAndSortedProducts.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => requestSort('price')}
                                >
                                    <div className="flex items-center">
                                        Price
                                        <FaSort className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => requestSort('createdAt')}
                                >
                                    <div className="flex items-center">
                                        Created
                                        <FaSort className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            <AnimatePresence>
                                {filteredAndSortedProducts.map((product, index) => (
                                    <motion.tr
                                        key={product.id}
                                        custom={index}
                                        variants={tableRowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 overflow-hidden">
                                                    {product.imageUrl ? (
                                                        <Image
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            width={40}
                                                            height={40}
                                                            className="h-10 w-10 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 flex items-center justify-center bg-gray-100">
                                                            <FaImage className="text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-1">{product.description?.slice(0,30)} ..</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-amber-600">${product.price.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {product.categoryId ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {categories?.find((category:any) => category?.id == product?.categoryId)?.name}

                          </span>
                                            ) : (
                                                <span className="text-sm text-gray-500">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(product.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-gray-600 hover:text-gray-900"
                                                    onClick={() => handleOpenUpdateModal(product)}
                                                >
                                                    <RiEditLine   className="h-5 w-5" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleOpenDeleteModal(product)}
                                                >
                                                    <FiTrash2  className="h-5 w-5" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-16">
                            <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm || selectedCategory ?
                                    'Try adjusting your search or filter criteria.' :
                                    'Get started by creating a new product.'}
                            </p>
                            <div className="mt-6">
                                <Link
                                    href="/dashboard/company/createProduct"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                >
                                    <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                                    New Product
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Update Product Modal */}
            <AnimatePresence>
                {isUpdateModalOpen && selectedProduct && (
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-gray-900 p-6 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">Update Product</h2>
                                <button
                                    onClick={handleCloseModals}
                                    className="text-gray-300 hover:text-white"
                                >
                                    <FaTimes className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(handleUpdateProduct)} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
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
                                                    {categories?.map((category:ICategory) => (
                                                        <option key={category?.id} value={category?.id}>{category?.name}</option>
                                                    ))}
                                                </select>
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
                                                    rows={4}
                                                    {...register('description', { required: 'Description is required' })}
                                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                                    placeholder="Enter product description"
                                                />
                                            </div>
                                            {errors.description && (
                                                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
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
                                                                height={1000}
                                                                width={1000}
                                                                src={imagePreview}
                                                                alt="Product preview"
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
                                                            {selectedImage ? `Image selected: ${selectedImage.name}` : 'Current image'}
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

                                        {/* Current Product Info */}
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Product Information</h3>
                                            <div className="text-sm text-gray-600">
                                                <p><span className="font-medium">ID:</span> {selectedProduct.id}</p>
                                                <p><span className="font-medium">Created:</span> {formatDate(selectedProduct.createdAt)}</p>
                                                <p><span className="font-medium">Last Updated:</span> {formatDate(selectedProduct.updatedAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModals}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                Update Product
                                                <FaArrowRight className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && selectedProduct && (
                    <div className="fixed inset-0 bg-black/10  backdrop-blur-sm  z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="bg-white rounded-lg shadow-xl max-w-md w-full"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                                    <FaTrashAlt className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Delete Product</h3>
                                <p className="text-sm text-gray-500 text-center mb-6">
                                    Are you sure you want to delete <span className="font-medium">{selectedProduct.name}</span>? This action cannot be undone.
                                </p>
                                <div className="flex justify-center space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModals}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDeleteProduct}
                                        disabled={isLoading}
                                        className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Deleting...
                                            </>
                                        ) : (
                                            'Delete Product'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Tips and Help Section */}
            <motion.div
                className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Managing Your Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <h3 className="font-medium text-blue-800 mb-2">Updating Products</h3>
                            <p className="text-sm text-blue-700">
                                Keep your product information up-to-date to ensure customers have accurate details about what you offer.
                            </p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <h3 className="font-medium text-amber-800 mb-2">Product Images</h3>
                            <p className="text-sm text-amber-700">
                                High-quality images can significantly increase customer interest. Use clear, well-lit photos that showcase your products.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ManageProductsPage;


