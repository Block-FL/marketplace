"use client";
import { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import User from './User'; 
import Client from './Client'; 
import Settings from './Settings'; 

const SideBar: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('User'); 

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

  
    const renderContent = () => {
        switch (activeContent) {
            case 'User':
                return <User />;
            case 'Client':
                return <Client />;
            case 'Settings':
                return <Settings />;
            default:
                return null;
        }
    };

    
    const isActiveTab = (tabName: string) => activeContent === tabName;

    return (
        <main className="flex">
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-blue-600 dark:border-blue-600">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                onClick={toggleSidebar}
                            >
                                {/* <span className="sr-only">Open sidebar</span> */}
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <a href="/" className="flex ms-2 md:me-24">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">BlockFl</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            {/* <WalletMultiButton /> */}
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-56 h-screen pt-20 transition-transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button
                                className={`flex items-center p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                                    isActiveTab('User') ? 'border-l-4 border-blue-500' : ''
                                }`}
                                onClick={() => setActiveContent('User')}
                            >
                                <span className="ms-3">User</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`flex items-center p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                                    isActiveTab('Client') ? 'border-l-4 border-blue-500' : ''
                                }`}
                                onClick={() => setActiveContent('Client')}
                            >
                                <span className="ms-3">Client</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`flex items-center p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                                    isActiveTab('Settings') ? 'border-l-4 border-blue-500' : ''
                                }`}
                                onClick={() => setActiveContent('Settings')}
                            >
                                <span className="ms-3">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

           
            <div className="flex-1 p-8 ml-56">{renderContent()}</div>
        </main>
    );
};

export default SideBar;
