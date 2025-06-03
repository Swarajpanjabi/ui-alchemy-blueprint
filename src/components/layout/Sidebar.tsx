
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  FileText, 
  BarChart3, 
  Settings,
  Eye,
  Shield
} from 'lucide-react';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/',
  },
  {
    title: 'Upload & Detection',
    icon: Upload,
    href: '/upload',
  },
  {
    title: 'Detection Logs',
    icon: FileText,
    href: '/logs',
  },
  {
    title: 'Performance Metrics',
    icon: BarChart3,
    href: '/metrics',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <SidebarRoot>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <Eye className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Iris Guard</h2>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.href}
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
}
