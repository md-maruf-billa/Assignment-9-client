'use client';

import * as React from 'react';

import {
  IconDashboard,
  IconHelp,
  IconSettings,
  IconLibraryPlus,
  IconDeviceDesktopCog,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { GoCodeReview } from 'react-icons/go';
import Link from 'next/link';
import { toast } from 'sonner';
import { log_out_user_action } from '@/services/AuthService';
import { Building2, MessageSquareCode, Users } from 'lucide-react';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  admin: [
    {
      title: 'Overview',
      url: '#',
      icon: IconDashboard,
    },
    {
      title: 'Manage Users',
      url: '/dashboard/admin/manage-users',
      icon: Users,
    },
    {
      title: 'Manage Companies',
      url: '/dashboard/admin/manage-companies',
      icon: Building2,
    },
    {
      title: 'Manage Reviews',
      url: '/dashboard/admin/manage-reviews',
      icon: MessageSquareCode,
    },
  ],
  company: [
    {
      title: 'Create Product',
      url: '/dashboard/company/createProduct',
      icon: IconLibraryPlus,
    },
    {
      title: 'Manage Products',
      url: '/dashboard/company/manageProducts',
      icon: IconDeviceDesktopCog,
    },
    {
      title: 'Manage Reviews',
      url: '/dashboard/company/manageReviews',
      title: "Overview",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Manage Users",
      url: "/dashboard/admin/manageUsers",
      icon: Users,
    },
    {
      title: "Manage Companies",
      url: "/dashboard/admin/manageCompanies",
      icon: Building2,
    },
    {
      title: "Manage Reviews",
      url: "/dashboard/admin/manage-reviews",
      icon: MessageSquareCode,
    }, 
  ],
  navSecondaryAdmin: [
    {
      title: "Settings",
      url: "/dashboard/admin/settings",
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '/dashboard/admin/get-help',
      icon: IconHelp,
    }
  ],
  navSecondaryCompany:[
    {
      title: "Settings",
      url: "/dashboard/company/settings",
      icon: IconSettings,
    },
  ],
  navSecondaryCompany: [
    {
      title: 'Settings',
      url: '/dashboard/company/settings',
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setIsLoading } = useUser();
  const handle_logout = async () => {
    const id = toast.loading('Log outing ...');
    const res = await log_out_user_action();
    if (res) {
      toast.success('Logout successful .', { id });
      setIsLoading(true);
      window.location.replace('/');
    } else {
      toast.error('Logout Failed !', { id })
    }
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>

              <Link href={'/'} className="flex items-center space-x-2">
                <GoCodeReview className={'!text-3xl'} />
                <span className="font-bold text-xl ">ReviewHub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role == "ADMIN" ? data.admin : user?.role == "COMPANY" ? data.company : []} />
        <NavSecondary items={user?.role == "ADMIN" ? data.navSecondaryAdmin : user?.role == "COMPANY" ? data.navSecondaryCompany : []} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/*<NavUser user={data.user} />*/}
        <Button onClick={handle_logout}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
