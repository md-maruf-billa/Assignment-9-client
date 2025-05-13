"user client"
import React, { Dispatch, SetStateAction } from 'react'
import Link from "next/link";
import { IUser } from '@/types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CalendarIcon } from "lucide-react";
import { dateFt } from '@/lib/dateFt';
import { log_out_user_action } from '@/services/AuthService';
import { toast } from 'sonner';

export default function UserMenu({ setIsLoading, user }: { setIsLoading: Dispatch<SetStateAction<boolean>>, user: IUser }) {
  const handle_logout = async () => {
    const id = toast.loading("Log outing ...")
    const res = await log_out_user_action();
    if (res) {
      toast.success("Logout successful .", { id })
      setIsLoading(true)
      window.location.replace("/")
    } else {
      toast.error("Logout Failed !", { id })
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="cursor-pointer border-2 border-[var(--BSecondary)] size-12">
                <AvatarImage src={user?.user?.profileImage as string} />
                <AvatarFallback className="text-red-500">{user?.user?.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.user?.profileImage as string} />
                  <AvatarFallback className="text-red-500">{user?.user?.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{user?.user?.name} <span className="bg-green-500 px-2 py-1 rounded-sm text-xs font-normal text-white">{user?.role}</span></h4>
                  <p className="text-sm">{user?.email}</p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">
                      Joined : {dateFt(user?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Link href={"/my-account/profile"}>Profile</Link></DropdownMenuItem>
        <DropdownMenuItem><Link href={"/billing"}>Billing</Link></DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handle_logout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
