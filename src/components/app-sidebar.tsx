'use client';

import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { log_out_user_action } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
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
import {
  Building2,
  LayoutGrid,
  MessageSquareCode,
  Users,
  LucideIcon,
  Settings,
  HelpCircle,
  Library,
  MonitorCheck,
} from 'lucide-react';
import { GoCodeReview } from 'react-icons/go';
import {NavMain} from "@/components/nav-main";
import {NavSecondary} from "@/components/nav-secondary";



// Sidebar data
const data = {
  admin: [
    { title: 'Overview', url: '/dashboard/admin', icon: LayoutGrid },
    { title: 'Manage Users', url: '/dashboard/admin/manageUsers', icon: Users },
    { title: 'Manage Companies', url: '/dashboard/admin/manageCompanies', icon: Building2 },
    { title: 'Manage Reviews', url: '/dashboard/admin/manageReviews', icon: MessageSquareCode },
  ],
  company: [
    { title: 'Overview', url: '/dashboard/company', icon: LayoutGrid },
    { title: 'Create Product', url: '/dashboard/company/createProduct', icon: Library },
    { title: 'Manage Products', url: '/dashboard/company/manageProducts', icon: MonitorCheck },
    { title: 'Manage Reviews', url: '/dashboard/company/manageReviews', icon: MessageSquareCode },
  ],
  navSecondaryAdmin: [
    { title: 'Settings', url: '/dashboard/admin/settings', icon: Settings },
    { title: 'Get Help', url: '/dashboard/admin/get-help', icon: HelpCircle },
  ],
  navSecondaryCompany: [
    { title: 'Settings', url: '/dashboard/company/settings', icon: Settings },
    { title: 'Get Help', url: '#', icon: HelpCircle },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user, setIsLoading } = useUser();

  const handle_logout = async () => {
    const id = toast.loading('Logging out...');
    const res = await log_out_user_action();
    if (res) {
      toast.success('Logout successful.', { id });
      setIsLoading(true);
      window.location.replace('/');
    } else {
      toast.error('Logout failed!', { id });
    }
  };

  const mainNav = user?.role === 'ADMIN' ? data.admin : user?.role === 'COMPANY' ? data.company : [];
  const secondaryNav =
      user?.role === 'ADMIN'
          ? data.navSecondaryAdmin
          : user?.role === 'COMPANY'
              ? data.navSecondaryCompany
              : [];

  return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/" className="flex items-center space-x-2">
                  <GoCodeReview className="!text-3xl" />
                  <span className="font-bold text-xl">ReviewHub</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={mainNav} />
          <NavSecondary items={secondaryNav} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <Button onClick={handle_logout}>Logout</Button>
        </SidebarFooter>
      </Sidebar>
  );
}
