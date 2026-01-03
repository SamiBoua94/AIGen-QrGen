'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Loader2, QrCode, Copy, Download, CheckCircle2, ShieldCheck, Globe, Lock } from 'lucide-react';
import Image from 'next/image';

export default function AddPhotoPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isPublic, setIsPublic] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState<{ id: string; qrCodeData: string; verifyUrl: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', new Date(date).toISOString());
        formData.append('isPublic', isPublic ? '1' : '0');

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
            } else {
                alert('Erreur lors de l\'upload');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Erreur réseau');
        } finally {
            setIsUploading(false);
        }
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result.verifyUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const downloadQR = () => {
        if (result) {
            const link = document.createElement('a');
            link.href = result.qrCodeData;
            link.download = `qrcode-${result.id}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (result) {
        return (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="bg-green-100 p-4 rounded-full">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Certificat émis avec succès !</h1>

                    <div className="flex flex-col items-center space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <Image
                            src={result.qrCodeData}
                            alt="QR Code"
                            width={200}
                            height={200}
                            className="rounded-lg shadow-sm border bg-white p-2"
                        />
                        <div className="space-y-2 w-full">
                            <button
                                onClick={downloadQR}
                                className="flex items-center justify-center space-x-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-semibold"
                            >
                                <Download className="h-5 w-5" />
                                <span>Télécharger le QR Code</span>
                            </button>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={result.verifyUrl}
                                    className="flex-1 px-4 py-3 bg-white border rounded-xl text-sm text-gray-600 outline-none"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className={`p-3 rounded-xl border transition-all ${copied ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white hover:bg-gray-50 text-gray-600'
                                        }`}
                                >
                                    {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={() => setResult(null)}
                            className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-semibold"
                        >
                            Nouveau Certificat
                        </button>
                        <button
                            onClick={() => router.push('/photos')}
                            className="flex-1 py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors font-semibold"
                        >
                            Voir le Registre
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-gray-900 italic">Émettre un Certificat</h1>
                <p className="text-gray-500">Générez une preuve d'authenticité infalsifiable pour vos documents.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
                {/* Upload Zone */}
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Image
                    </label>
                    {!preview ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <div className="flex flex-col items-center space-y-4">
                                <div className="bg-gray-100 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
                                    <Upload className="h-8 w-8 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">Importer le document à certifier</p>
                                    <p className="text-sm text-gray-500">ou glissez-déposez le fichier ici</p>
                                </div>
                                <p className="text-xs text-gray-400">PNG, JPG, JPEG jusqu'à 10MB</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-3xl overflow-hidden aspect-video bg-slate-100 border border-gray-200 group">
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-contain"
                            />
                            <button
                                type="button"
                                onClick={clearFile}
                                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full text-red-500 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Info Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Titre / ID Unique
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Facture #12345"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="date" className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Date
                        </label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ajoutez des détails complémentaires..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Privacy Toggle */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="space-y-0.5">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                            Statut de Visibilité
                        </label>
                        <p className="text-xs text-gray-400 italic">
                            {isPublic ? "Visible par tous dans le Registre Public." : "Visible uniquement dans vos certifications personnelles."}
                        </p>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setIsPublic(true)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isPublic ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Globe className="h-4 w-4 inline mr-2" />
                            Public
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsPublic(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!isPublic ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Lock className="h-4 w-4 inline mr-2" />
                            Privé
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!file || isUploading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isUploading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Génération en cours...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center space-y-1">
                            <ShieldCheck className="h-6 w-6 mr-2" />
                            <span>Certifier le Document</span>
                        </div>
                    )}
                </button>
            </form>
        </div>
    );
}
