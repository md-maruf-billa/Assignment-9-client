"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {toast} from "sonner";
import {update_user_profile_action} from "@/services/user";
import {IUser} from "@/types/user";
import Image from "next/image"
type UpdateProfileFormProps = {
    name:string | undefined;
    bio:string | undefined;
}
const ProfileUpdateForm = ({user,setIsLoading}:{user:IUser | null,setIsLoading:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const handleFileChange = (e:any) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };
    const handleUpdateProfile = async (e:any) => {
        e.preventDefault();
        const formData = new FormData();
        const id = toast.loading("Updating Profile ...");
        const profileData:UpdateProfileFormProps ={
            name:user?.user?.name,
            bio:user?.user?.bio as string,
        }
        if(e.target.name.value.length > 0){
            profileData.name=e.target.name.value;
        }
        if(e.target.bio.value.length > 0){
            profileData.bio=e.target.bio.value;
        }
        formData.append("data", JSON.stringify(profileData));
        if(selectedFile){
            formData.append("image",selectedFile)
        }
        const res = await update_user_profile_action(formData);
        if(res.success){
            toast.success("Profile updated successfully.",{id});
            setIsLoading(true)
            setModalOpen(false);
        }else {
            toast.error(res.message,{id})
        }
    }

    return (
        <div>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Edit profile</DialogTitle>
                        <DialogDescription className="text-center">
                            Make changes to your profile here. Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e)=>handleUpdateProfile(e)} className="grid gap-4 py-4">
                        {!previewUrl ? (
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8 text-gray-500 dark:text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>

                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                                    Upload Image
                                </h2>

                                <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                                    Upload your file SVG, PNG, JPG or GIF.
                                </p>

                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".svg,.png,.jpg,.jpeg,.gif"
                                />
                            </label>
                        ) : (
                            <div className="flex flex-col items-center space-y-2">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    width={32}
                                    height={32}
                                    className="w-32 h-32 object-cover rounded-full"
                                />
                                <Button variant="destructive" size="sm" onClick={handleRemoveImage}>
                                    Remove
                                </Button>
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input name="name" id="name" placeholder={user?.user?.name} />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="bio" className="text-right">
                                Bio
                            </Label>
                            <Textarea name="bio" id="bio" placeholder={user?.user?.bio as string} />
                        </div>

                        <Button type="submit">Save changes</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProfileUpdateForm;
