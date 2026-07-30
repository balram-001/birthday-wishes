import FormSection from '@/components/FormSection';

export default function HomePage() {
  return (
    <main className="celebration-page min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden text-slate-900">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />
      <div className="relative text-center max-w-2xl mb-9 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-bold tracking-[0.18em] uppercase text-fuchsia-700 shadow-sm backdrop-blur">
          <span>✦</span> Made for happy moments
        </div>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-500">
          Birthday Bloom
        </h1>
        <p className="text-slate-600 text-base sm:text-lg font-medium max-w-xl mx-auto">
          Create a beautiful, personal birthday surprise they&apos;ll remember all day.
        </p>
      </div>
      <FormSection />
      <p className="relative mt-7 text-sm text-slate-500">A little link. A very big smile. 🎈</p>
    </main>
  );
}
