import FormSection from '@/components/FormSection';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-950 text-white">
      <div className="text-center max-w-2xl mb-8 space-y-3">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
          Bday Wish 🎂
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Create a beautiful personalized birthday wish link for your friends! ✨
        </p>
      </div>

      <FormSection />
    </main>
  );
}