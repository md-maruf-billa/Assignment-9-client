"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaImage, FaSearch, FaSort } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import { get_all_company } from "@/services/company";

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
  products: Product[];
}

type FormValues = {
  name: string;
  price: number;
  description: string;
  category?: string;
  tags?: string;
};

const ManageCompanyPage = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null);

  const {
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

  const fetchCompanies = async () => {
    try {
      const res = await get_all_company();
      setCompanies(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch companies");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

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

  const filteredCompanies = useMemo(() => {
    const list = [...(companies || [])];

    if (searchTerm.trim()) {
      return list.filter((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return list;
  }, [companies, searchTerm]);

  const requestSort = (key: string) => {
    const direction =
        sortConfig?.key === key && sortConfig.direction === "ascending"
            ? "descending"
            : "ascending";
    setSortConfig({ key, direction });
  };

  const handleOpenDeleteModal = (companyId: string) => {
    setSelectedCompanyId(companyId);
    // show delete modal logic
  };

  const handleUpdateProduct = async (data: FormValues) => {
    if (!selectedProduct) return;
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));

      const updated = companies.map((comp) => {
        if (comp.id === selectedProduct.id) {
          return {
            ...comp,
            ...data,
            imageUrl: imagePreview || comp.companyImage,
            updatedAt: new Date().toISOString(),
          };
        }
        return comp;
      });

      setCompanies(updated);
      toast.success("Product updated!");
      reset();
    } catch {
      toast.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
      new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <motion.div
            className="bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
          <header className="bg-gray-900 p-6">
            <h1 className="text-2xl font-bold text-white">Manage Company</h1>
            <p className="text-gray-300 mt-1">View, edit, or delete companies</p>
          </header>

          <section className="p-6 border-b bg-gray-50">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search companies..."
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-amber-500 focus:border-amber-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </section>

          <div className="overflow-x-auto">
            {filteredCompanies.length > 0 ? (
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Website</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y">
                  <AnimatePresence>
                    {filteredCompanies.map((c, index) => (
                        <motion.tr
                            key={c.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {c.companyImage ? (
                                  <Image
                                      src={c.companyImage}
                                      alt={c.name}
                                      width={40}
                                      height={40}
                                      className="rounded-md"
                                  />
                              ) : (
                                  <FaImage className="w-10 h-10 text-gray-300" />
                              )}
                              <div className="ml-4">
                                <div className="text-sm font-medium">{c.name}</div>
                                <div className="text-sm text-gray-500">{c.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <a href={c.website || "#"} className="text-amber-600 text-sm">
                              {c.website || "—"}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{c.account.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{formatDate(c.createdAt)}</td>
                          <td className="px-6 py-4 text-right">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-red-600 hover:text-red-800"
                                onClick={() => handleOpenDeleteModal(c.id)}
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </motion.button>
                          </td>
                        </motion.tr>
                    ))}
                  </AnimatePresence>
                  </tbody>
                </table>
            ) : (
                <div className="text-center py-12 text-gray-500">No companies found</div>
            )}
          </div>
        </motion.div>
      </div>
  );
};

export default ManageCompanyPage;
