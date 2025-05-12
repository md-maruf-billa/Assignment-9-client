import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FaBuilding,
    FaGlobe,
    FaEnvelope,
    FaCalendarAlt,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaShoppingCart
} from 'react-icons/fa';
import { FaArrowRightLong,FaArrowLeftLong} from 'react-icons/fa6';
import {CompanyDetailsProps, Product} from "@/types/company";
import {useRouter} from "next/navigation";


const CompanyDetails: React.FC<CompanyDetailsProps> = ({ companyData, isLoading = false }) => {

 
    const [activeTab, setActiveTab] = useState<'products' | 'about'>('products');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const router = useRouter();


    // Default placeholder images
    const defaultCompanyImage = "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop";
    const defaultProductImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop";

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Animation variants
    // const fadeIn = {
    //     hidden: { opacity: 0, y: 20 },
    //     visible: {
    //         opacity: 1,
    //         y: 0,
    //         transition: { duration: 0.6 }
    //     }
    // };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.3 }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Company Details</h2>
                <p className="text-gray-600 text-center">Please wait while we fetch the company information...</p>
            </div>
        );
    }

    // If data is not available or loading failed
    if (!companyData?.success || !companyData?.data) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
                <FaBuilding className="text-gray-400 text-5xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h2>
                <p className="text-gray-600 text-center max-w-md mb-6">
                    {companyData?.message || "The company information you're looking for is not available."}
                </p>
                <Link
                    href="/company"
                    className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                >
                    <FaArrowLeftLong className="mr-2" />
                    Back to Companies
                </Link>
            </div>
        );
    }

    // Function to render star ratings
    const renderStarRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-amber-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-amber-400" />);
            }
        }

        return (
            <div className="flex items-center">
                {stars}
                <span className="ml-1 text-gray-600">({rating.toFixed(1)})</span>
            </div>
        );
    };

    // If data is not available or loading failed
    if (!companyData.success || !companyData.data) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
                <FaBuilding className="text-gray-400 text-5xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h2>
                <p className="text-gray-600 text-center max-w-md mb-6">
                    {companyData.message || "The company information you're looking for is not available."}
                </p>
                <Link
                    href="/company"
                    className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                >
                    <FaArrowLeftLong className="mr-2" />
                    Back to Companies
                </Link>
            </div>
        );
    }

    const company = companyData.data;

    return (
        <div className="bg-[#FAF8F5] min-h-screen pb-20">
            {/* Hero Section with Company Banner */}
            <div className="relative w-full h-[30vh] md:h-[40vh] bg-gray-900">
                {company.companyImage ? (
                    <Image
                        src={company.companyImage}
                        alt={company.name}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                ) : (
                    <Image
                        src={defaultCompanyImage}
                        alt={company.name}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
                    <motion.div
                        className="pb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center mb-4">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white mr-4">
                                <Image
                                    src={company.companyImage ? company.companyImage : defaultCompanyImage}
                                    alt={company.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                            </div>
                            <div>
                                <h1 className="relative text-3xl md:text-4xl font-bold text-white">{company.name}</h1>
                                <div className=" relative flex items-center mt-2">
                                    {company.account.status === "ACTIVE" ? (
                                        <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            Inactive
                                        </span>
                                    )}
                                    <span className="text-gray-300 text-sm ml-4">
                                        <FaCalendarAlt className="inline mr-1" />
                                        Joined {formatDate(company.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Company Info and Tabs */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-6">
                        <div className="flex flex-wrap gap-6 mb-6">
                            {company.website && (
                                <a
                                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-amber-600 hover:text-amber-800 transition-colors duration-200"
                                >
                                    <FaGlobe className="mr-2" />
                                    Visit Website
                                </a>
                            )}
                            <a
                                href={`mailto:${company.account.email}`}
                                className="flex items-center text-amber-600 hover:text-amber-800 transition-colors duration-200"
                            >
                                <FaEnvelope className="mr-2" />
                                {company.account.email}
                            </a>
                            <div className="flex items-center text-gray-600">
                                <FaBuilding className="mr-2" />
                                {company.products.length} Products
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <p className="text-gray-700">
                                {company.description || `${company.name} is a trusted partner on our platform providing quality products with verified customer reviews.`}
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className={`${
                                        activeTab === 'products'
                                            ? 'border-amber-500 text-amber-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Products ({company.products.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('about')}
                                    className={`${
                                        activeTab === 'about'
                                            ? 'border-amber-500 text-amber-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    About Company
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'products' ? (
                    <>
                        {/* Products Grid */}
                        {company.products.length > 0 ? (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {company.products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        variants={cardVariants}
                                        whileHover="hover"
                                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        <div className="relative h-48 w-full bg-gray-100">
                                            <Image
                                                src={product.imageUrl || defaultProductImage}
                                                fill
                                                alt={product.name}
                                                className="object-cover"
                                            />
                                            <div className="absolute top-4 right-4 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                                ${product.price.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                            <div className="mb-3">
                                                {renderStarRating(4.5)} {/* Placeholder rating */}
                                            </div>
                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // redirect to the product page
                                                        router.push(`/product/${product.id}`);
                                                    }}
                                                >
                                                    <FaShoppingCart className="mr-2" />
                                                    View Product
                                                </motion.button>
                                                <span className="text-sm text-gray-500">
                                                    Added: {new Date(product.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="text-center py-16 bg-white rounded-lg shadow-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20 12H4"
                                    />
                                </svg>
                                <h3 className="mt-2 text-xl font-semibold text-gray-900">No products available</h3>
                                <p className="mt-1 text-gray-500">This company hasn&apos;t added any products yet.</p>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <motion.div
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">About {company.name}</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Company Name</h4>
                                            <p className="mt-1 text-gray-900">{company.name}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                                            <p className="mt-1 text-gray-900">{company.account.email}</p>
                                        </div>
                                        {company.website && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Website</h4>
                                                <p className="mt-1 text-gray-900">
                                                    <a
                                                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
                                                    >
                                                        {company.website}
                                                    </a>
                                                </p>
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Member Since</h4>
                                            <p className="mt-1 text-gray-900">{formatDate(company.createdAt)}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Status</h4>
                                            <p className="mt-1">
                                                {company.account.status === "ACTIVE" ? (
                                                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                                        Inactive
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Description</h3>
                                    <p className="text-gray-700 mb-6">
                                        {company.description || `${company.name} is a trusted partner on our platform providing quality products with verified customer reviews. They joined our platform on ${formatDate(company.createdAt)} and have been offering exceptional products and services to our customers.`}
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Stats</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-amber-600">{company.products.length}</div>
                                            <div className="text-sm text-gray-500">Total Products</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-amber-600">4.8</div>
                                            <div className="text-sm text-gray-500">Average Rating</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-amber-600">
                                                {Math.floor((new Date().getTime() - new Date(company.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))}
                                            </div>
                                            <div className="text-sm text-gray-500">Months Active</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-amber-600">24/7</div>
                                            <div className="text-sm text-gray-500">Customer Support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact {company.name}</h3>
                                <p className="text-gray-700 mb-4">
                                    Have questions about {company.name} or their products? You can contact them directly using the information below.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href={`mailto:${company.account.email}`}
                                        className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                                    >
                                        <FaEnvelope className="mr-2" />
                                        Send Email
                                    </a>
                                    {company.website && (
                                        <a
                                            href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                                        >
                                            <FaGlobe className="mr-2" />
                                            Visit Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center p-4">

                <motion.div
                        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative">
                            <button
                                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10"
                                onClick={() => setSelectedProduct(null)}
                            >
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="grid md:grid-cols-2">
                                <div className="relative h-64 md:h-full bg-gray-100">
                                    <Image
                                        src={selectedProduct.imageUrl || defaultProductImage}
                                        alt={selectedProduct.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-2xl font-bold text-amber-600">${selectedProduct.price.toFixed(2)}</div>
                                        <div>{renderStarRating(4.5)}</div> {/* Placeholder rating */}
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                                        <p className="text-gray-700">{selectedProduct.description}</p>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Product Details</h3>
                                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                            <li>Added on {formatDate(selectedProduct.createdAt)}</li>
                                            <li>Product ID: {selectedProduct.id.substring(0, 8)}</li>
                                            <li>Sold by: {company.name}</li>
                                            <li>In stock and ready to ship</li>
                                        </ul>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href={`/product/${selectedProduct?.id}`} className={"flex-1 w-full"}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                                            >
                                                <FaShoppingCart className="mr-2" />
                                                Write Review
                                            </motion.button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Back to Companies Button */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <motion.div
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <Link
                        href="/company"
                        className="inline-flex items-center text-gray-700 hover:text-amber-600 transition-colors duration-200"
                    >
                        <FaArrowLeftLong className="mr-2" />
                        Back to Companies
                    </Link>
                </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
                className="bg-gray-900 text-white py-16 mt-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-extrabold mb-4">Ready to showcase your products?</h2>
                        <p className="text-lg mb-8 max-w-3xl mx-auto">
                            Join thousands of businesses that use ReviewHub to collect, manage, and leverage customer reviews to grow their business.
                        </p>
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 transition duration-300 shadow-lg">
                                    Register Your Company
                                    <FaArrowRightLong className="ml-2" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition duration-300">
                                    Contact Us
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default CompanyDetails;

