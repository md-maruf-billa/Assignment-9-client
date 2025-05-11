"use client"

import { type Icon } from "@tabler/icons-react"


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {LucideIcon} from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon | LucideIcon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
           <Link key={item.title} href={item.url}>
             <SidebarMenuItem >
               <SidebarMenuButton tooltip={item.title}>
                 {item.icon && <item.icon />}
                 <span>{item.title}</span>
               </SidebarMenuButton>
             </SidebarMenuItem>
           </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
