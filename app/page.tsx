import Link from 'next/link';
import { Camera, List, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Sécurisez vos photos avec{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            QR Code
          </span>
        </h1>
        <p className="max-w-2xl text-xl text-gray-500 mx-auto">
          Téléchargez vos images, générez des QR codes de vérification uniques et partagez la preuve d'authenticité en un clic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link
          href="/add"
          className="group relative flex flex-col items-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Plus className="w-24 h-24 text-blue-600 -rotate-12" />
          </div>
          <div className="bg-blue-100 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <Camera className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Ajouter une Photo</h2>
          <p className="text-gray-500 text-center">
            Téléchargez une image et obtenez instantanément son QR code de vérification.
          </p>
        </Link>

        <Link
          href="/photos"
          className="group relative flex flex-col items-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <List className="w-24 h-24 text-indigo-600 rotate-12" />
          </div>
          <div className="bg-indigo-100 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <List className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Toutes les Photos</h2>
          <p className="text-gray-500 text-center">
            Consultez votre galerie, téléchargez les QR codes et gérez vos entrées.
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl pt-10">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-green-100 p-2 rounded-full">
            <ShieldCheck className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg">Authenticité Garantie</h3>
          <p className="text-sm text-gray-500 italic">Chaque QR code est unique et lié à une image spécifique.</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-orange-100 p-2 rounded-full">
            <Zap className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className="font-semibold text-lg">Instantané</h3>
          <p className="text-sm text-gray-500 italic">Génération ultra-rapide et accès direct à la vérification.</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-purple-100 p-2 rounded-full">
            <ShieldCheck className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg">Usage Local</h3>
          <p className="text-sm text-gray-500 italic">Solution parfaite pour une installation locale sécurisée.</p>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
