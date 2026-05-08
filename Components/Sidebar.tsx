"use client";

import { useState } from "react";
import Link from "next/link";

import {
    Menu,
    LayoutDashboard,
    NotebookPen,
    Settings
} from "lucide-react";

export default function Sidebar() {
    const [collapsed, setCollapsed] =
      useState(false);

    return (
        <aside
          className={`
            bg-gray-900
            border-r
            border-gray-800
            p-4
            transition-all
            duration-300
            flex
            flex-col
            ${
                collapsed
                ? "w-20"
                : "w-64"
            }  
          `}
        >
            <button
              onClick={() =>
                setCollapsed(!collapsed)
              }
              className="
                text-white
                mb-8
                hover:bg-gray-800
                p-2
                rounded-lg
                transition
                self-start
                "
            >
                <Menu />
            </button>

            <nav className="space-y-2">
                <Link href="/dashboard">
                    <SidebarItem
                      icon={<LayoutDashboard size={20} />}
                      label="Dashboard"
                      collapsed={collapsed}
                    />
                </Link>

                <Link href="/notes">
                    <SidebarItem
                      icon={<NotebookPen size={20} />}
                      label="Notes"
                      collapsed={collapsed}
                    />
                </Link>
                <Link href="/settings">
                    <SidebarItem
                      icon={<Settings size={20} />}
                      label="Settings"
                      collapsed={collapsed}
                    />
                </Link>
            </nav>    
        </aside>  
    );
}

type SidebarItemProps = {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
};

function SidebarItem({
    icon,
    label,
    collapsed,
}: SidebarItemProps) {
    return (
        <button
          className="
            w-full
            flex
            items-center
            gap-3
            text-gray-300
            hover:bg-gray-800
            hover:text-white
            px-3
            py-3
            rounded-lg
            transition
            "
        >
            {icon}
            {!collapsed && (
                <span>
                    {label}
                </span>
            )}
        </button>
    ); 
}