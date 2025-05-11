import React, {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {change_password_action} from "@/services/AuthService";
import {toast} from "sonner";


const UpdatePasswordForm = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleUpdatePassword =async (e:any)=>{
        const id = toast.loading("Updating password ..");
        e.preventDefault();
        const passwordData  = {
            oldPassword: "",
            newPassword: "",
        }
        passwordData.oldPassword = e.target.oldPassword.value;
        passwordData.newPassword = e.target.newPassword.value;

        const res = await change_password_action(passwordData)
        if(res.success){
            toast.success(res.message,{id})
            setModalOpen(false);
        }else {
            toast.error(res.message,{id})
        }
    }
    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                    <DialogTitle className="text-center">Update Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e)=>handleUpdatePassword(e)} className="grid gap-4 py-4">
                    <div className="space-y-3">
                        <Label htmlFor="oldpassword" className="text-right">
                            Old Password
                        </Label>
                        <Input required={true} name="oldPassword" id="oldpassword"/>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="newPassword" className="text-right">
                            New Password
                        </Label>
                        <Input required={true} name="newPassword" id="newPassword" />
                    </div>

                    <Button type="submit">Update Now</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdatePasswordForm;