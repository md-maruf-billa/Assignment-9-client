"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { FaImage, FaSearch, FaSort } from "react-icons/fa";
import { toast } from "sonner";
import { get_all_user_action } from "@/services/user";
import Loading from "@/app/loading";
import {change_profile_status_action} from "@/services/AuthService";

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
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reFetch, setReFetch] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get_all_user_action();
        setUsers(res.data || []);
      } catch (error) {
        toast.error("Failed to load users.");
      } finally {
        setIsLoading(false);
        setReFetch(false);
      }
    };

    fetchData();
  }, [reFetch]);

  const filteredUsers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return users.filter((user) =>
        [user.name, user.account.email, user.bio]
            .filter(Boolean)
            .some((field) => field?.toLowerCase().includes(lowerSearch))
    );
  }, [users, searchTerm]);

  const formatDate = (dateString: string) =>
      new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

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
  // handle user status change
  const change_profile_status = async (email: string,status:string) => {
    const res = await change_profile_status_action({ email, status });
    if(res.success) {
      toast.success(res.message);
      setReFetch(true)
    }else{
      toast.error(res.message);
    }
  }


  if (isLoading) {
    return <Loading/>
  }

  return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
          <div className="bg-gray-900 p-6">
            <h1 className="text-2xl font-bold text-white">Manage Users</h1>
            <p className="text-gray-300 mt-1">
              View, edit, or delete users in your account.
            </p>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="relative w-full md:w-1/2">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filteredUsers.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    {["User", "Name", "Email", "Bio", "Created","Account Status", "Actions"].map((head) => (
                        <th
                            key={head}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center">
                            {head}
                            {["Name", "Created"].includes(head) && (
                                <FaSort className="ml-1" />
                            )}
                          </div>
                        </th>
                    ))}
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredUsers.map((user, index) => (
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
                            {user.profileImage ? (
                                <Image
                                    src={user.profileImage}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
                                  <FaImage className="text-gray-400" />
                                </div>
                            )}
                          </td>
                          <td className="text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="text-sm text-gray-700">
                            {user.account.email}
                          </td>
                          <td className="text-sm text-amber-600">{user.bio || "-"}</td>
                          <td className="text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td
                              className={`text-sm text-gray-100 text-center px-2 py-1 rounded ${
                                  user?.account?.status === "SUSPENDED"
                                      ? "text-red-700"
                                      : user?.account?.status === "INACTIVE"
                                          ? "text-yellow-500"
                                          : user?.account?.status === "ACTIVE"
                                              ? "text-green-600"
                                              : ""
                              }`}
                          >
                            {user?.account?.status}
                          </td>

                          <td className="text-sm text-center">
                            <select
                                onChange={(e) => change_profile_status(user?.account?.email, e.target.value)}
                                className="border rounded p-1"
                            >
                              <option value="">Select Status</option>
                              <option value="ACTIVE">Active</option>
                              <option value="INACTIVE">Inactive</option>
                              <option value="SUSPENDED">Suspended</option>
                            </select>

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
                    No users found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm
                        ? "Try adjusting your search."
                        : "No users have been added yet."}
                  </p>
                </div>
            )}
          </div>
        </motion.div>
      </div>
  );
};

export default ManageUsersPage;
