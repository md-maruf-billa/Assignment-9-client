"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage, FaSearch, FaSort } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import { toast } from "sonner";

// Define the Product type
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: string;
  tags?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  companyId: string;
}

// Form values type for the update modal
type FormValues = {
  name: string;
  price: number;
  description: string;
  category?: string;
  tags?: string;
};

export interface ICompany {
  id: string;
  name: string;
  accountId: string;
  website: string | null;
  companyImage: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  account: {
    id: string;
    email: string;
    password: string;
    role: "COMPANY" | string;
    createdAt: string;
    updatedAt: string;
    status: "ACTIVE" | "INACTIVE" | string;
    isDeleted: boolean;
    isCompleteProfile: boolean;
  };
  products: Product[]; // Replace 'any' with a proper product interface if available
}

const ManageCompanyPage = () => {
  // Sample products data - in a real app, this would come from an API
  // const [products, setProducts] = useState<Product[]>([
  //   {
  //     id: "5411afea-4ff8-4bff-af4f-b5247ec98d90",
  //     name: "Wireless Mouse",
  //     price: 1299.99,
  //     description: "A high-precision wireless mouse with ergonomic design.",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1767&auto=format&fit=crop",
  //     category: "Electronics",
  //     tags: "computer,wireless,accessories",
  //     isDeleted: false,
  //     createdAt: "2025-05-02T20:41:50.241Z",
  //     updatedAt: "2025-05-02T20:41:50.241Z",
  //     companyId: "67af48aa-b898-4966-8ece-ee3de510a7eb",
  //   },
  //   {
  //     id: "6522bfeb-5ff9-5cgg-bf5g-c6358fd99e91",
  //     name: "Mechanical Keyboard",
  //     price: 2499.99,
  //     description:
  //       "Premium mechanical keyboard with RGB lighting and customizable keys.",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1780&auto=format&fit=crop",
  //     category: "Electronics",
  //     tags: "computer,gaming,accessories",
  //     isDeleted: false,
  //     createdAt: "2025-05-03T10:30:20.241Z",
  //     updatedAt: "2025-05-03T10:30:20.241Z",
  //     companyId: "67af48aa-b898-4966-8ece-ee3de510a7eb",
  //   },
  //   {
  //     id: "7633cgfc-6gg0-6dhh-cg6h-d7469ge00f02",
  //     name: "Bluetooth Headphones",
  //     price: 1899.99,
  //     description:
  //       "Noise-cancelling Bluetooth headphones with 30-hour battery life.",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1770&auto=format&fit=crop",
  //     category: "Electronics",
  //     tags: "audio,wireless,music",
  //     isDeleted: false,
  //     createdAt: "2025-05-04T15:22:10.241Z",
  //     updatedAt: "2025-05-04T15:22:10.241Z",
  //     companyId: "67af48aa-b898-4966-8ece-ee3de510a7eb",
  //   },
  // ]);

  const [company, setCompany] = useState<ICompany[]>([
    {
      id: "f4ab5282-4144-40b0-b0da-96ef84760b15",
      name: "Md Masum billa",
      accountId: "fd0f0322-2dc5-4986-a18d-28ce9169de10",
      website: null,
      companyImage: null,
      description: null,
      createdAt: "2025-05-07T16:45:17.443Z",
      updatedAt: "2025-05-07T16:45:17.443Z",
      isDeleted: false,
      account: {
        id: "fd0f0322-2dc5-4986-a18d-28ce9169de10",
        email: "masum@gmail.com",
        password:
          "$2b$10$Fya1wB/WsAPt34b9BE1AmefiN4AxY6pOs36VgL9c9kV5uNhzoyB.C",
        role: "COMPANY",
        createdAt: "2025-05-07T16:45:16.400Z",
        updatedAt: "2025-05-07T16:45:16.400Z",
        status: "ACTIVE",
        isDeleted: false,
        isCompleteProfile: false,
      },
      products: [],
    },
    {
      id: "44c9b1cc-61d7-41b0-ba9f-fd2562e6e1ff",
      name: "Walton",
      accountId: "04b63e24-4a91-410e-b01c-88abbde3210c",
      website: null,
      companyImage: null,
      description: null,
      createdAt: "2025-05-07T06:13:13.949Z",
      updatedAt: "2025-05-07T06:13:13.949Z",
      isDeleted: false,
      account: {
        id: "04b63e24-4a91-410e-b01c-88abbde3210c",
        email: "waltonCompany@gmail.com",
        password:
          "$2b$10$r9krnz1ZB6RHxE8cepf4TeTy5mgBWTSYU4HBpvKSzw9.QVAPQ0aFC",
        role: "COMPANY",
        createdAt: "2025-05-07T06:13:13.710Z",
        updatedAt: "2025-05-07T06:13:13.710Z",
        status: "ACTIVE",
        isDeleted: false,
        isCompleteProfile: false,
      },
      products: [],
    },
  ]);

  // State for search, filter, and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  // State for modal and selected product
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for image upload in the update modal
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form setup for the update modal
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      tags: "",
    },
  });

  // Effect to set form values when a product is selected for update
  useEffect(() => {
    if (selectedProduct) {
      setValue("name", selectedProduct.name);
      setValue("price", selectedProduct.price);
      setValue("description", selectedProduct.description);
      setValue("category", selectedProduct.category || "");
      setValue("tags", selectedProduct.tags || "");

      if (selectedProduct.imageUrl) {
        setImagePreview(selectedProduct.imageUrl);
      }
    }
  }, [selectedProduct, setValue]);

  // Function to open the update modal with a selected product
  const handleOpenUpdateModal = (company: ICompany) => {
    setSelectedCompany(company.id);
    setIsUpdateModalOpen(true);
  };

  // Function to open the delete confirmation modal
  const handleOpenDeleteModal = (c: ICompany) => {
    setSelectedCompany(c.id);
    setIsDeleteModalOpen(true);
  };

  // Function to close modals and reset state
  const handleCloseModals = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);

    setImagePreview(null);
    reset();
  };

  // Function to handle product update submission
  const handleUpdateProduct = async (data: FormValues) => {
    if (!selectedProduct) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the product in the local state
      const updatedCompany = company.map((product) => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            ...data,
            imageUrl: imagePreview || product.companyImage,
            updatedAt: new Date().toISOString(),
          };
        }
        return product;
      });

      setCompany(updatedCompany);
      toast.success("Product updated successfully!");
      handleCloseModals();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle product deletion
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Remove the product from the local state
      const updatedCompany = company.filter(
        (product) => product.id !== selectedProduct.id
      );
      setCompany(updatedCompany);

      toast.success("Product deleted successfully!");
      handleCloseModals();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle sorting
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Apply sorting, filtering, and searching to products
  const filteredAndSorteCompany = React.useMemo(() => {
    let filteredCompany = [...company];

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredCompany = filteredCompany.filter((company) =>
        company.name.toLowerCase().includes(searchLower)
      );
    }

    return filteredCompany;
  }, [company, searchTerm]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
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
              <h1 className="text-2xl font-bold text-white">Manage Company</h1>
              <p className="text-gray-300 mt-1">
                View, edit, or delete companies
              </p>
            </div>
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
                placeholder="Search companies..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Stats and Filters Summary */}
          <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-gray-600">
            <div>
              Showing{" "}
              <span className="font-medium">
                {filteredAndSorteCompany.length}
              </span>{" "}
              of <span className="font-medium">{company.length}</span> companies
              {selectedCompany && (
                <span className="ml-2">
                  in <span className="font-medium">{selectedCompany}</span>
                  <button
                    className="ml-1 text-amber-600 hover:text-amber-800"
                    onClick={() => setSelectedCompany("")}
                  >
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="ml-2">
                  matching &quot;
                  <span className="font-medium">{searchTerm}</span>&quot;
                  <button
                    className="ml-1 text-amber-600 hover:text-amber-800"
                    onClick={() => setSearchTerm("")}
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
                  setSearchTerm("");
                  setSelectedCompany("");
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
          {filteredAndSorteCompany.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("price")}
                  >
                    <div className="flex items-center">
                      Website
                      <FaSort className="ml-1" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Created
                      <FaSort className="ml-1" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredAndSorteCompany.map((c, index) => (
                    <motion.tr
                      key={c.id}
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
                            {c.companyImage ? (
                              <Image
                                src={c.companyImage}
                                alt={c.name}
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
                            <div className="text-sm font-medium text-gray-900">
                              {c.name}
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {c.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-amber-600">
                          <a href={c.website?.toLocaleLowerCase()}>
                            {" "}
                            {c.website}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {
                          <div className="text-sm font-medium text-amber-600">
                            <a href={c.website?.toLocaleLowerCase()}>
                              {" "}
                              {c.account?.email}
                            </a>
                          </div>
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button>
                            <div className="space-y-2">
                              <label
                                htmlFor="status"
                                className="  text-sm font-medium text-gray-700"
                              ></label>
                              <select name="" id="">
                                <option value="Select Status">
                                  Select Status
                                </option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                              </select>
                            </div>
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleOpenDeleteModal(c)}
                          >
                            <FiTrash2 className="h-5 w-5" />
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No company found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCompany
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating a new company."}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tips and Help Section */}
      <motion.div
        className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Managing Your Companies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">
                Updating Company Info
              </h3>
              <p className="text-sm text-blue-700">
                Keep your company details accurate and current to ensure
                stakeholders and users have the right information about your
                organization.
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h3 className="font-medium text-amber-800 mb-2">
                Company Branding
              </h3>
              <p className="text-sm text-amber-700">
                Upload a logo, cover image, and description to enhance your
                company&apos;s visibility and trust among users.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">
                Organizing Listings
              </h3>
              <p className="text-sm text-green-700">
                Use categories, tags, and structured data to manage and showcase
                your companies more effectively within the platform.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageCompanyPage;
