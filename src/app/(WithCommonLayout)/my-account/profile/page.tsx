"use client"
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import React from 'react';
import ProfileUpdateForm from "@/components/customs/UpdateProfile/ProfileUpdateForm";
import UpdatePasswordForm from "@/components/customs/UpdateProfile/UpdatePasswordForm";


const ProfilePage = () => {
    const dateForater = (date:string) => new Date(date)?.toLocaleString();
    const { user,setIsLoading } = useUser()
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">

                {/* Left Card */}
                <div className="relative w-full md:w-[350px] lg:w-[420px] h-[480px] bg-black text-white rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={user?.user?.profileImage || "https://th.bing.com/th/id/OIP.Gl6B6jDrC6gWIrv57WlLdQHaHT?cb=iwc1&rs=1&pid=ImgDetMain"}
                        alt="Profile"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute bottom-6 left-6">
                        <h2 className="text-2xl font-bold">{user?.user?.name}</h2>
                    </div>
                </div>

                {/* Right Card */}
                <div className="bg-white w-full md:w-[350px] lg:w-[420px] h-[480px] rounded-xl p-6 text-gray-700 shadow-lg relative flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <Image
                            src={user?.user?.profileImage || "https://th.bing.com/th/id/OIP.Gl6B6jDrC6gWIrv57WlLdQHaHT?cb=iwc1&rs=1&pid=ImgDetMain"}
                            alt="Avatar"
                            width={120}
                            height={120}
                            className="rounded-full mb-4 size-[120px]"
                        />
                        <h2 className="text-xl font-semibold text-blue-600">{user?.user?.name}</h2>
                        {/*<p className="text-sm">User Id - {user?.id}</p>*/}
                        <p className="text-xs text-center mt-2 text-gray-500">
                            {user?.user?.bio}
                        </p>
                        <p className="text-xs text-center mt-2 mb-8 text-gray-500">Last Update :{dateForater(user?.user?.updatedAt as string)}</p>
                        <div className={"flex justify-between w-full gap-5"}>
                            <ProfileUpdateForm user={user} setIsLoading={setIsLoading} />
                            <UpdatePasswordForm/>
                        </div>


                    </div>

                    <div className="absolute top-4 right-4 text-xl text-gray-400">♂️</div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;