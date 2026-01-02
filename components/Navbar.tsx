import Link from 'next/link';
import { Camera, Image as ImageIcon, PlusCircle, ShieldCheck } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <ShieldCheck className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                PhotoVerify
                            </span>
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            href="/add"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Ajouter</span>
                        </Link>
                        <Link
                            href="/photos"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all"
                        >
                            <ImageIcon className="h-4 w-4" />
                            <span>Galerie</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
