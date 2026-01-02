'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Info, QrCode, Trash2, ExternalLink, Search, RefreshCw, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Photo {
    id: string;
    filename: string;
    originalName: string;
    title: string | null;
    description: string | null;
    date: string;
    createdAt: string;
    qrCodeData: string | null;
}

export default function PhotosPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/photos');
            if (response.ok) {
                const data = await response.json();
                setPhotos(data);
            }
        } catch (error) {
            console.error('Failed to fetch photos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deletePhoto = async (id: string) => {
        if (!confirm('Voulez-vous vraiment supprimer cette photo ?')) return;

        try {
            const response = await fetch(`/api/photos/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setPhotos(photos.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete photo:', error);
        }
    };

    const filteredPhotos = photos.filter(photo =>
        photo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Ma Galerie</h1>
                    <p className="text-gray-500">Gérez vos photos et leurs QR codes de vérification.</p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher par titre ou ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-3 w-full md:w-80 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Chargement de la galerie...</p>
                </div>
            ) : filteredPhotos.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center space-y-6">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                        <QrCode className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Aucune photo trouvée</h2>
                        <p className="text-gray-500 max-w-xs mx-auto">
                            {searchTerm ? 'Aucun résultat ne correspond à votre recherche.' : "Commencez par ajouter votre première photo pour générer un QR code."}
                        </p>
                    </div>
                    {!searchTerm && (
                        <Link
                            href="/add"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                            Ajouter une photo
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300"
                        >
                            {/* Photo Preview */}
                            <div className="relative aspect-video overflow-hidden bg-slate-100">
                                <Image
                                    src={`/uploads/${photo.filename}`}
                                    alt={photo.title || photo.originalName}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    <Link
                                        href={`/verify/${photo.id}`}
                                        className="p-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full text-blue-600 shadow-lg"
                                        title="Voir la page de vérification"
                                    >
                                        <ExternalLink className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={() => deletePhoto(photo.id)}
                                        className="p-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full text-red-500 shadow-lg"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Info & QR */}
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-gray-900 text-lg truncate">
                                        {photo.title || photo.originalName}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="h-4 w-4 mr-2 shrink-0" />
                                        <span>{format(new Date(photo.date), 'dd MMMM yyyy', { locale: fr })}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Verification ID</p>
                                        <p className="text-xs font-mono text-gray-500 truncate max-w-[120px]">{photo.id}</p>
                                    </div>
                                    {photo.qrCodeData && (
                                        <div className="relative h-16 w-16 bg-white p-1 rounded-lg border shadow-sm group-hover:shadow-md transition-shadow">
                                            <Image
                                                src={photo.qrCodeData}
                                                alt="QR Code Small"
                                                fill
                                                className="p-1"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
