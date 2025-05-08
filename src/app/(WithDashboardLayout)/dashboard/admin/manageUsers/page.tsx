"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { FaImage, FaSearch, FaSort } from "react-icons/fa";

import { toast } from "sonner";

export interface IUser {
  id: string;
  name: string;
  accountId: string;
  profileImage: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  account: {
    id: string;
    email: string;
    role: "USER" | string;
    isDeleted: boolean;
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    isCompleteProfile: boolean;
  };
}

const ManageUsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      id: "11d964f5-09f5-486a-ac0f-4d6607b5b1a3",
      name: "rongila",
      accountId: "11cf94c8-8e9c-4324-b7bf-e393f9c5db47",
      profileImage: null,
      bio: null,
      createdAt: "2025-05-08T04:25:57.826Z",
      updatedAt: "2025-05-08T04:25:57.826Z",
      isDeleted: false,
      account: {
        id: "11cf94c8-8e9c-4324-b7bf-e393f9c5db47",
        email: "rongila@gmail.com",
        role: "USER",
        isDeleted: false,
        status: "ACTIVE",
        isCompleteProfile: false,
      },
    },
    {
      id: "7a6b8f45-69b0-442f-be38-9830bd7f316a",
      name: "Idola Mccormick",
      accountId: "a4d28613-d9b3-4a72-b1fa-70fc41a82384",
      profileImage: null,
      bio: null,
      createdAt: "2025-05-07T19:33:48.497Z",
      updatedAt: "2025-05-07T19:33:48.497Z",
      isDeleted: false,
      account: {
        id: "a4d28613-d9b3-4a72-b1fa-70fc41a82384",
        email: "mywo@mailinator.com",
        role: "USER",
        isDeleted: false,
        status: "ACTIVE",
        isCompleteProfile: false,
      },
    },
    {
      id: "8f4512c0-03bb-4d85-a57b-5bfd2973a2c6",
      name: "Md Abu Mahid Islam",
      accountId: "3f3f30f1-084a-4389-9593-d4575351f9e5",
      profileImage: null,
      bio: null,
      createdAt: "2025-05-07T16:35:35.242Z",
      updatedAt: "2025-05-07T16:35:35.242Z",
      isDeleted: false,
      account: {
        id: "3f3f30f1-084a-4389-9593-d4575351f9e5",
        email: "eng.marufbilla@gmail.com",
        role: "USER",
        isDeleted: false,
        status: "ACTIVE",
        isCompleteProfile: false,
      },
    },
    {
      id: "5a7b78d6-e28f-441f-9ded-b0064e664481",
      name: "Admin",
      accountId: "03bdb9ed-6825-4f19-a269-edd608759f53",
      profileImage:
        "https://res.cloudinary.com/dza9jdqt6/image/upload/v1746635540/jbv9dicsa5k3gr8qgdrf.png",
      bio: "lfjdkljsfjdfjkdkfd",
      createdAt: "2025-05-07T16:31:42.726Z",
      updatedAt: "2025-05-07T16:32:19.858Z",
      isDeleted: false,
      account: {
        id: "03bdb9ed-6825-4f19-a269-edd608759f53",
        email: "mdmarufbilla2@gmail.com",
        role: "USER",
        isDeleted: false,
        status: "ACTIVE",
        isCompleteProfile: true,
      },
    },
    {
      id: "19072864-4745-4624-983b-a958696008d4",
      name: "Sakhawat",
      accountId: "fed3c5e1-877c-47d8-aa74-51c8ba4bb333",
      profileImage: null,
      bio: null,
      createdAt: "2025-05-07T12:36:58.615Z",
      updatedAt: "2025-05-07T12:36:58.615Z",
      isDeleted: false,
      account: {
        id: "fed3c5e1-877c-47d8-aa74-51c8ba4bb333",
        email: "user@mail.com",
        role: "USER",
        isDeleted: false,
        status: "ACTIVE",
        isCompleteProfile: false,
      },
    },
    {
      id: "11bef8f7-9c57-479d-a68d-f09a912ac566",
      name: "Walton",
      accountId: "ec5f97e1-1599-468d-880b-b48c99ab1570",
      profileImage: null,
      bio: null,
      createdAt: "2025-05-07T06:12:38.519Z",
      updatedAt: "2025-05-07T06:12:38.519Z",
      isDeleted: false,
      account: {
        id: "ec5f97e1-1599-468d-880b-b48c99ab1570",
        email: "walton@gmail.com",
        role: "USER",
        isDeleted: false,
        status: "ACTIVE",
        isCompleteProfile: false,
      },
    },
    {
      id: "fb3c5ab8-a175-426f-af9d-f0e12c6c8f9d",
      name: "Maruf Hossain",
      accountId: "1531f6c9-b593-4db4-afa0-f0d80edc5508",
      profileImage: null,
      bio: null,
      createdAt: "2025-05-07T00:15:47.107Z",
      updatedAt: "2025-05-07T00:15:47.107Z",
      isDeleted: false,
      account: {
        id: "1531f6c9-b593-4db4-afa0-f0d80edc5508",
        email: "marufhossain55@gmail.com",
        role: "USER",
        isDeleted: false,
        status: "ACTIVE",
        isCompleteProfile: false,
      },
    },
  ]);

  // State for search, filter, and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  // State for modal and selected product

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle product update submission
  const handleUpdate = async (id: string) => {
    setIsLoading(true);

    try {
      // Update the product in the local state
      // const updatedCompany = user.map((product) => {
      //   if (product.id === selectedProduct.id) {
      //     return {
      //       ...product,
      //       ...data,
      //       imageUrl: imagePreview || product.companyImage,
      //       updatedAt: new Date().toISOString(),
      //     };
      //   }
      //   return product;
      // });

      // setUsers(updatedCompany);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle product deletion
  const handleDelete = async (id: string) => {
    if (!id) return;

    setIsLoading(true);

    try {
      // Remove the product from the local state
      const updatedCompany = users.filter((user) => user.id !== id);
      setUsers(updatedCompany);

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply sorting, filtering, and searching to products
  const filteredAndSorteUsers = React.useMemo(() => {
    let filteredUsers = [...users];

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.account.email.toLowerCase().includes(searchLower) ||
          user.bio?.toLowerCase().includes(searchLower)
      );
    }

    return filteredUsers;
  }, [users, searchTerm]);

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

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
              <h1 className="text-2xl font-bold text-white">Manage Users</h1>
              <p className="text-gray-300 mt-1">
                View, edit, or delete Users in your account.
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
                placeholder="Search users..."
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
                {filteredAndSorteUsers.length}
              </span>{" "}
              of <span className="font-medium">{users.length}</span> companies
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
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          {filteredAndSorteUsers.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      Name
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bio
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                  {filteredAndSorteUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
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
                            {user.profileImage ? (
                              <Image
                                src={user.profileImage}
                                alt={user.name}
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
                        </div>
                      </td>
                      <td>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td>
                        <div className="text-sm font-medium text-gray-900">
                          {user.account.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-amber-600">
                          {" "}
                          {user.bio}
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {
                          <div className="text-sm font-medium text-amber-600">
                            <a href={c.website?.toLocaleLowerCase()}>
                              {" "}
                              {c.account?.email}
                            </a>
                          </div>
                        }
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
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
            Managing Your Users
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">
                Viewing User Details
              </h3>
              <p className="text-sm text-blue-700">
                Access essential user information including name, email, status,
                and role to monitor activity and maintain user records
                effectively.
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h3 className="font-medium text-amber-800 mb-2">
                Managing User Status
              </h3>
              <p className="text-sm text-amber-700">
                Activate or deactivate users as needed to control access and
                ensure only verified users are engaged on the platform.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">
                Profile Completion
              </h3>
              <p className="text-sm text-green-700">
                Encourage users to complete their profiles for a more
                personalized and trustworthy experience across the platform.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsersPage;
