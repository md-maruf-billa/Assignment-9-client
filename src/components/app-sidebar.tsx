"use client"

import * as React from "react"
import {
  IconDashboard,
  IconHelp,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
  IconLibraryPlus, IconDeviceDesktopCog
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {GoCodeReview} from "react-icons/go";
import Link from "next/link";
import {toast} from "sonner";
import {log_out_user_action} from "@/services/AuthService";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  admin: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    }
  ],
  company: [
    {
      title: "Create Product",
      url: "/dashboard/company/createProduct",
      icon: IconLibraryPlus ,
    },
    {
      title: "Manage Products",
      url: "/dashboard/company/manageProducts",
      icon: IconDeviceDesktopCog ,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/company/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user,setIsLoading } = useUser()
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
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
            >
              <Link href={"/"} className="flex items-center space-x-2">
                <GoCodeReview className={"!text-3xl"} />
                <span className="font-bold text-xl ">ReviewHub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role == "ADMIN" ? data.admin : user?.role == "COMPANY" ? data.company : []} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/*<NavUser user={data.user} />*/}
        <Button onClick={handle_logout}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
