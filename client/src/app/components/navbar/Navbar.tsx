'use client';

import { useState } from 'react';
import Link from 'next/link';
import API from '../../utils/API';
import './Navbar.css';

type NavbarProps = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

};

export default function Navbar({ loading, setLoading }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true)
            await API.logout();
            window.location.href = '/login';
        } catch (error) {
            setLoading(false)
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="bg-neutral-100 dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <h1 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
                            Next Mongo Passport Template
                        </h1>

                    </div>

                    {/* Hamburger Menu (Mobile) */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="hamburger inline-flex items-center justify-center p-2 rounded-md"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-6">
                        <Link href="/" className="navbar-item text-gray-700 dark:text-gray-200">
                            Home
                        </Link>
                        <div className="relative">
                            <Link
                                href="#"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="navbar-item text-gray-700 dark:text-gray-200 focus:outline-none"
                            >
                                Menu ▾
                            </Link>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10">
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Item 1
                                    </Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Item 2
                                    </Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Item 3
                                    </Link>
                                </div>
                            )}
                        </div>
                        <button className={"button-rose"} onClick={() => handleLogout()}>Logout</button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden px-4 pb-4 dark:bg-gray-900 space-y-2">
                    <Link href="#" className="navbar-item ml-2 mb-3 block text-gray-700 dark:text-gray-200">
                        Home
                    </Link>
                    <Link href="#" className="navbar-item ml-2 mb-3 block text-gray-600 dark:text-gray-300">
                        Item 1
                    </Link>
                    <Link href="#" className="navbar-item ml-2 mb-3 block text-gray-600 dark:text-gray-300">
                        Item 2
                    </Link>
                    <Link href="#" className="navbar-item ml-2 mb-3 block text-gray-600 dark:text-gray-300">
                        Item 3
                    </Link>
                    <button className="button-rose" onClick={() => { handleLogout() }}>Logout</button>
                </div>
            )}
        </nav>
    );
}