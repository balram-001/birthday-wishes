'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CakeSlice, Gift, Heart, PartyPopper, RefreshCw, Sparkles, Stars } from 'lucide-react';
import { getRandomBirthdayWish } from '@/lib/birthdayWishes';

type Props = { senderName: string; friendName: string; message: string | null; photoData: string | null };

const PARTICLES = Array.from({ length: 18 }, (_, index) => index);

export default function BirthdayWishViewer({ senderName, friendName, message, photoData }: Props) {
  const [isOpening, setIsOpening] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [wish, setWish] = useState(message || '');

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpening(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const fireConfetti = (particleCount: number, originX: number) => {
    confetti({
      particleCount,
      spread: 85,
      startVelocity: 42,
      origin: { x: originX, y: 0.64 },
      colors: ['#ec4899', '#f97316', '#facc15', '#a855f7', '#22c55e'],
    });
  };

  const celebrate = () => {
    setWish(message || getRandomBirthdayWish());
    setIsOpened(true);
    fireConfetti(130, 0.5);
    window.setTimeout(() => fireConfetti(75, 0.16), 180);
    window.setTimeout(() => fireConfetti(75, 0.84), 320);
  };

  const nextWish = () => {
    setWish(getRandomBirthdayWish());
    fireConfetti(90, 0.5);
  };

  if (isOpening) {
    return (
      <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center">
        <motion.div animate={{ y: [0, -16, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-7xl">🎈</motion.div>
        <p className="mt-6 text-lg font-extrabold text-fuchsia-700">Setting up your birthday surprise...</p>
      </div>
    );
  }

  return (
    <section className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/90 bg-white/80 p-6 text-center shadow-[0_32px_100px_rgba(139,92,246,0.3)] backdrop-blur-xl sm:p-10">
      <div className="wish-confetti" aria-hidden="true">
        {PARTICLES.map((particle) => <span key={particle} className={`confetti-piece confetti-piece-${particle % 5}`} style={{ left: `${(particle * 17) % 100}%`, animationDelay: `${-(particle % 7)}s`, animationDuration: `${5 + (particle % 4)}s` }} />)}
      </div>
      <div className="balloon balloon-pink" aria-hidden="true" />
      <div className="balloon balloon-purple" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400" />
      <div className="absolute -right-9 top-12 h-28 w-28 rounded-full bg-amber-200/60 blur-3xl" />
      <div className="absolute -left-10 bottom-4 h-32 w-32 rounded-full bg-fuchsia-200/60 blur-3xl" />

      <div className="relative">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-extrabold tracking-wide text-rose-600 shadow-sm">
          <Heart className="h-3.5 w-3.5 fill-rose-500" /> A birthday surprise from {senderName}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-7 text-sm font-black uppercase tracking-[0.28em] text-fuchsia-600">It&apos;s your day</motion.p>
        <motion.h1 initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 180 }} className="mt-2 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Happy Birthday,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-500">{friendName}!</span>
        </motion.h1>

        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div key="gift" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="mt-8">
              <motion.button onClick={celebrate} whileHover={{ scale: 1.08, rotate: -4 }} whileTap={{ scale: 0.94 }} animate={{ y: [0, -11, 0] }} transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }} className="birthday-gift group mx-auto flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 text-white shadow-[0_20px_40px_rgba(236,72,153,0.45)]">
                <Gift className="h-20 w-20 transition-transform duration-300 group-hover:rotate-12" />
              </motion.button>
              <div className="mt-7 flex items-center justify-center gap-2 text-fuchsia-600"><Stars className="h-5 w-5" /><span className="text-sm font-black uppercase tracking-[0.16em]">Tap the gift</span><Stars className="h-5 w-5" /></div>
              <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">{senderName} has packed a little birthday magic just for you.</p>
              <button onClick={celebrate} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-extrabold text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.98]"><PartyPopper className="h-5 w-5" /> Open your surprise</button>
            </motion.div>
          ) : (
            <motion.div key={wish} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, type: 'spring', bounce: 0.35 }} className="mt-8">
              <div className="overflow-hidden rounded-[2rem] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50 shadow-inner">
                {photoData && <motion.div initial={{ scale: 1.18, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}><Image src={photoData} alt={`A birthday memory for ${friendName}`} width={720} height={512} unoptimized className="h-56 w-full object-cover sm:h-64" /></motion.div>}
                <div className="p-6 sm:p-8">
                  <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ delay: 0.4, duration: 0.8 }}><CakeSlice className="mx-auto h-10 w-10 text-rose-500" /></motion.div>
                  <p className="mt-4 text-xl font-bold leading-relaxed text-slate-800 sm:text-2xl">“{wish}”</p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-fuchsia-700"><Sparkles className="h-4 w-4" /> With lots of love, {senderName}</div>
                </div>
              </div>
              {!message && <button onClick={nextWish} className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-fuchsia-200 bg-white px-5 py-3.5 font-extrabold text-fuchsia-700 transition hover:bg-fuchsia-50 active:scale-[0.98]"><RefreshCw className="h-4 w-4" /> One more wish</button>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
