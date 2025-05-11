"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Image from 'next/image';
import {
    FaUser,
    FaBuilding,
    FaEnvelope,
    FaEdit,
    FaCheck,
    FaTimes,
    FaImage,
    FaInfoCircle,
    FaSave,
} from 'react-icons/fa';
import {useUser} from "@/context/UserContext";
import {update_user_profile_action} from "@/services/user";
import {IUser} from "@/types/user";


// Define the types for the API response
interface Company {
    id: string;
    name: string;
    accountId: string;
    website: string | null;
    companyImage: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

interface Account {
    id: string;
    status: string;
    email: string;
    role: string;
    isCompleteProfile: boolean;
    user: null;
    admin: null;
    company: Company;
    createdAt: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: Account;
    meta: null;
}

// Form values type for the update modal
type FormValues = {
    name: string;
    bio: string;
};

const SettingsPage = () => {
    // State for user profile data
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // State for image upload
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            bio: '',
        }
    });


    // Set form values when opening the update modal
    useEffect(() => {
        if (isUpdateModalOpen && user) {
            setValue('name', user?.admin?.name || '');
            setValue('bio', user?.admin?.bio || '');
        }
        if (user?.admin?.profileImage) {
            setImagePreview(user?.admin?.profileImage);
        }
    }, [isUpdateModalOpen, user, setValue]);

    // Function to open the update modal
    const handleOpenUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    // Function to close the update modal
    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedImage(null);
        // Keep the current image preview
        if (user?.admin?.profileImage) {
            setImagePreview(user?.admin?.profileImage);
        } else {
            setImagePreview(null);
        }
        reset();
    };

    // Function to handle image change
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

    // Function to handle profile update submission
    const handleUpdateProfile = async (data: FormValues) => {
        setIsUpdating(true);

        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            if (selectedImage) {
              formData.append('image', selectedImage);
            }
            const response = await update_user_profile_action(formData);
            if(response.success) {
                toast.success('Profile updated successfully!');
                window.location.reload();
                handleCloseUpdateModal();
            }
            else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsUpdating(false);
        }
    };

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
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.3
            }
        })
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            ) : user ? (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-8"
                >
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-gray-900 p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
                                    <p className="text-gray-300 mt-1">View and update your admin profile information</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleOpenUpdateModal}
                                    className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                                >
                                    <FaEdit className="mr-2" />
                                    Update Profile
                                </motion.button>
                            </div>
                        </div>

                        {/* Company Profile Card */}
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Company Image */}
                                <motion.div
                                    custom={0}
                                    variants={cardVariants}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                                        {user?.admin?.profileImage ? (
                                            <Image
                                                src={user?.admin?.profileImage}
                                                alt={user?.admin?.name}
                                                width={192}
                                                height={192}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <FaBuilding className="text-gray-400 h-20 w-20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user?.admin?.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user?.admin?.status}
                    </span>
                                    </div>
                                </motion.div>

                                {/* Company Details */}
                                <motion.div
                                    custom={1}
                                    variants={cardVariants}
                                    className="flex-1 space-y-4"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{user?.admin?.name || 'Company Name Not Set'}</h2>
                                        <p className="text-gray-500 flex items-center mt-1">
                                            <FaEnvelope className="mr-2" />
                                            {user?.email}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Bio</h3>
                                        <p className="text-gray-700 mt-2">
                                            {user?.admin?.bio || 'No Bio provided.'}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Admin ID</p>
                                                <p className="font-medium text-gray-900">{user?.admin?.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Account ID</p>
                                                <p className="font-medium text-gray-900">{user?.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Role</p>
                                                <p className="font-medium text-gray-900">{user?.role}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Joined</p>
                                                <p className="font-medium text-gray-900">{formatDate(user?.createdAt)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Last Updated</p>
                                                <p className="font-medium text-gray-900">{formatDate(user?.admin?.updatedAt || user?.createdAt)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Profile Status</p>
                                                <p className="font-medium text-gray-900 flex items-center">
                                                    {user?.isCompleteProfile ? (
                                                        <>
                                                            <FaCheck className="text-green-500 mr-1" />
                                                            Complete
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaInfoCircle className="text-amber-500 mr-1" />
                                                            Incomplete
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Account Security Section */}
                    <motion.div
                        custom={2}
                        variants={cardVariants}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Account Security</h2>
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Email Address</h3>
                                        <p className="text-gray-600">{user?.email}</p>
                                    </div>
                                    <button className="mt-2 md:mt-0 inline-flex items-center px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200">
                                        Change Email
                                    </button>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Password</h3>
                                        <p className="text-gray-600">Last changed: Not available</p>
                                    </div>
                                    <button className="mt-2 md:mt-0 inline-flex items-center px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200">
                                        Change Password
                                    </button>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                                        <p className="text-gray-600">Enhance your account security</p>
                                    </div>
                                    <button className="mt-2 md:mt-0 inline-flex items-center px-3 py-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors duration-200">
                                        Enable 2FA
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Account Preferences Section */}
                    <motion.div
                        custom={3}
                        variants={cardVariants}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Account Preferences</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                                        <p className="text-gray-600">Receive updates about your account and products</p>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                                        <input
                                            type="checkbox"
                                            id="toggle-email"
                                            className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-amber-500 checked:translate-x-6"
                                            defaultChecked
                                        />
                                        <label
                                            htmlFor="toggle-email"
                                            className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-amber-300"
                                        ></label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Marketing Communications</h3>
                                        <p className="text-gray-600">Receive marketing emails and promotions</p>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                                        <input
                                            type="checkbox"
                                            id="toggle-marketing"
                                            className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-amber-500 checked:translate-x-6"
                                        />
                                        <label
                                            htmlFor="toggle-marketing"
                                            className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-amber-300"
                                        ></label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Public Profile</h3>
                                        <p className="text-gray-600">Make your company profile visible to other users</p>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                                        <input
                                            type="checkbox"
                                            id="toggle-public"
                                            className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-amber-500 checked:translate-x-6"
                                            defaultChecked
                                        />
                                        <label
                                            htmlFor="toggle-public"
                                            className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-amber-300"
                                        ></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tips and Help Section */}
                    <motion.div
                        custom={4}
                        variants={cardVariants}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Your Company Profile</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <h3 className="font-medium text-blue-800 mb-2">Complete Your Profile</h3>
                                    <p className="text-sm text-blue-700">
                                        A complete profile helps customers trust your business and find your products more easily.
                                    </p>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                    <h3 className="font-medium text-amber-800 mb-2">Add a Company Logo</h3>
                                    <p className="text-sm text-amber-700">
                                        A professional logo helps your brand stand out and increases recognition among customers.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                    <h3 className="font-medium text-green-800 mb-2">Detailed Description</h3>
                                    <p className="text-sm text-green-700">
                                        Provide a clear, concise description of your company to help customers understand what you offer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                    <FaUser className="mx-auto text-gray-400 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        We couldn&apos;t find your profile information. Please try refreshing the page or contact support.
                    </p>
                </div>
            )}

            {/* Update Profile Modal */}
            <AnimatePresence>
                {isUpdateModalOpen && user && (
                    <div className="fixed inset-0 bg-black/10  backdrop-blur-md  z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-gray-900 p-6 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">Update admin Profile</h2>
                                <button
                                    onClick={handleCloseUpdateModal}
                                    className="text-gray-300 hover:text-white"
                                >
                                    <FaTimes className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(handleUpdateProfile)} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        {/* Company Name */}
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Company Name
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaBuilding className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    {...register('name')}
                                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                                    placeholder="Enter company name"
                                                />
                                            </div>
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                            )}
                                        </div>



                                        {/* Bio */}
                                        <div className="space-y-2">
                                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                id="bio"
                                                rows={6}
                                                {...register('bio')}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                                placeholder="Describe your company..."
                                            />
                                        </div>

                                        {/* Account Information */}
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">Account Information</h3>
                                            <div className="text-sm text-gray-600">
                                                <p><span className="font-medium">Email:</span> {user?.email}</p>
                                                <p><span className="font-medium">Role:</span> {user?.role}</p>
                                                <p><span className="font-medium">Status:</span> {user?.admin?.status}</p>
                                                <p><span className="font-medium">Joined:</span> {formatDate(user?.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Company Logo Upload */}
                                        <div className="space-y-2">
                                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                                Company Logo
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
                                                                height={100}
                                                                width={100}
                                                                alt="Company logo preview"
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
                                                            {selectedImage ? `Image selected: ${selectedImage.name}` : 'Current logo'}
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

                                        {/* Profile Completion Tips */}
                                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                            <h3 className="font-medium text-amber-800 mb-2">Profile Completion Tips</h3>
                                            <ul className="text-sm text-amber-700 space-y-2">
                                                <li className="flex items-start">
                                                    <FaCheck className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                                                    <span>Add a professional company logo to increase brand recognition</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <FaCheck className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                                                    <span>Include your website to drive traffic to your online presence</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <FaCheck className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                                                    <span>Write a detailed description that clearly explains what your company offers</span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Profile Visibility Info */}
                                        {/*<div className="bg-blue-50 p-4 rounded-lg border border-blue-100">*/}
                                        {/*    <h3 className="font-medium text-blue-800 mb-2">Profile Visibility</h3>*/}
                                        {/*    <p className="text-sm text-blue-700">*/}
                                        {/*        Your company profile information will be visible to users browsing the platform. This helps build trust and credibility with potential customers.*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseUpdateModal}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isUpdating ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <FaSave className="mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SettingsPage;
