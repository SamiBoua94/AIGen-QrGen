import Link from 'next/link';
import { Camera, Image as ImageIcon, PlusCircle, ShieldCheck, User, Globe, FileText } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <ShieldCheck className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                TruStation
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-3">
                        <Link
                            href="/add"
                            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                        >
                            <PlusCircle className="h-4 w-4 text-blue-400 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Nouveau</span>
                        </Link>
                        <Link
                            href="/photos"
                            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                        >
                            <Globe className="h-4 w-4" />
                            <span>Registre</span>
                        </Link>
                        <Link
                            href="/my-certifications"
                            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                        >
                            <FileText className="h-4 w-4" />
                            <span>Mes Certifications</span>
                        </Link>
                        <Link
                            href="/account"
                            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                        >
                            <User className="h-4 w-4" />
                            <span>Compte</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
