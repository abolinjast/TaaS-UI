import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutGrid,
    CheckSquare,
    FileText,
    CreditCard,
    Users,
    Settings,
    ChevronDown,
    LogOut
} from 'lucide-react';

export const Layout: React.FC = () => {
    const navItems = [
        { icon: CheckSquare, label: 'Tasks', count: 12, to: '/tasks' },
        { icon: LayoutGrid, label: 'Projects', count: 3, to: '/projects' },
        { icon: FileText, label: 'Time Tracker', count: null, to: '/' }, // Active
        { icon: FileText, label: 'Proposals', count: 5, to: '/proposals' },
        { icon: CreditCard, label: 'Payments', count: null, to: '/payments' },
        { icon: Users, label: 'Team', count: 10, to: '/team' },
    ];

    return (
        <div className="flex min-h-screen bg-[#0B0B0F] text-slate-300 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 flex flex-col justify-between p-4 bg-[#111116]">
                <div>
                    {/* Logo Area */}
                    <div className="flex items-center gap-3 px-4 mb-8 pt-2">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center transform rotate-3">
                            <div className="w-4 h-4 border-2 border-black rounded-sm" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-wide">TaaS</span>

                        {/* User Profile Dropdown */}
                        <div className="ml-auto flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-full">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500" />
                            <ChevronDown className="w-3 h-3 text-slate-500" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                className={({ isActive }) => `
                  flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive
                                        ? 'bg-[#1A1A23] text-white'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5 opacity-80" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                                {item.count && (
                                    <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-400">
                                        {item.count}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/5">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-colors">
                        <Settings className="w-5 h-5" />
                        <span className="text-sm font-medium">Settings</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};
