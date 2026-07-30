'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ImagePlus, Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createBirthdayWishLink } from '@/app/actions';

const DEFAULT_MESSAGE = 'Wishing you a day full of love, laughter, cake, and beautiful memories!';
const DRAFT_STORAGE_KEY = 'birthday-bloom-draft';

type BirthdayDraft = { senderName: string; friendName: string; message: string; photoData: string | null };

function getStoredDraft(): BirthdayDraft {
  const emptyDraft: BirthdayDraft = { senderName: '', friendName: '', message: DEFAULT_MESSAGE, photoData: null };
  if (typeof window === 'undefined') return emptyDraft;
  try {
    const savedDraft = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
    return savedDraft ? { ...emptyDraft, ...(JSON.parse(savedDraft) as Partial<BirthdayDraft>) } : emptyDraft;
  } catch {
    return emptyDraft;
  }
}

async function compressImage(file: File) {
  const isHeic = /image\/(heic|heif)/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);
  let imageBlob: Blob = file;
  if (isHeic) {
    const { default: heic2any } = await import('heic2any');
    const convertedImage = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 });
    imageBlob = Array.isArray(convertedImage) ? convertedImage[0] : convertedImage;
  }

  const imageUrl = URL.createObjectURL(imageBlob);
  const image = new window.Image();
  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Unsupported image format.'));
      image.src = imageUrl;
    });
    const scale = Math.min(1, 1080 / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);
    canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.72);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export default function FormSection() {
  const [senderName, setSenderName] = useState(() => getStoredDraft().senderName);
  const [friendName, setFriendName] = useState(() => getStoredDraft().friendName);
  const [message, setMessage] = useState(() => getStoredDraft().message);
  const [photoData, setPhotoData] = useState<string | null>(() => getStoredDraft().photoData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ senderName, friendName, message, photoData }));
    } catch {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  }, [friendName, message, photoData, senderName]);

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const compressedPhoto = await compressImage(file);
      if (compressedPhoto.length > 800_000) return toast.error('Please choose a smaller photo.');
      setPhotoData(compressedPhoto);
    } catch {
      toast.error('This photo could not be read. Please try another image.');
    } finally {
      input.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!senderName.trim() || !friendName.trim()) return toast.error('Please fill in both names.');
    setLoading(true);
    try {
      const { slug } = await createBirthdayWishLink({ senderName, friendName, message, photoData: photoData ?? undefined });
      toast.success('Birthday surprise created!');
      router.push(`/${slug}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md p-6 sm:p-8 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_24px_80px_rgba(168,85,247,0.2)] border border-white/80">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div><label className="block text-sm font-bold mb-2 text-slate-700">Your Name</label><input type="text" required maxLength={30} placeholder="e.g. Rahul" value={senderName} onChange={(event) => setSenderName(event.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-rose-100 bg-white/90 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-fuchsia-100 focus:border-fuchsia-400 outline-none transition" /></div>
        <div><label className="block text-sm font-bold mb-2 text-slate-700">Birthday Star&apos;s Name</label><input type="text" required maxLength={30} placeholder="e.g. Priya" value={friendName} onChange={(event) => setFriendName(event.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-rose-100 bg-white/90 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-fuchsia-100 focus:border-fuchsia-400 outline-none transition" /></div>
        <div><label className="block text-sm font-bold mb-2 text-slate-700">Your message</label><textarea required maxLength={500} rows={4} value={message} onChange={(event) => setMessage(event.target.value)} className="w-full resize-none px-4 py-3 rounded-xl border border-rose-100 bg-white/90 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-fuchsia-100 focus:border-fuchsia-400 outline-none transition" /><p className="mt-1 text-right text-xs text-slate-400">{message.length}/500</p></div>
        <div><label className="block text-sm font-bold mb-2 text-slate-700">Add a photo <span className="font-medium text-slate-400">(optional)</span></label>{photoData ? <div className="relative overflow-hidden rounded-2xl border border-rose-100"><Image src={photoData} alt="Selected birthday memory" width={640} height={352} unoptimized className="h-44 w-full object-cover" /><button type="button" onClick={() => setPhotoData(null)} className="absolute right-2 top-2 rounded-full bg-slate-900/80 p-2 text-white"><X className="h-4 w-4" /></button></div> : <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-fuchsia-200 bg-fuchsia-50/60 px-4 py-7 text-center transition hover:border-fuchsia-400 hover:bg-fuchsia-50"><ImagePlus className="h-7 w-7 text-fuchsia-500" /><span className="mt-2 text-sm font-bold text-fuchsia-700">Choose a favourite photo</span><span className="mt-1 text-xs text-slate-500">Any photo format - converted and resized for sharing</span><input type="file" accept="image/*,.heic,.heif" onChange={handlePhotoChange} className="sr-only" /></label>}</div>
        <button type="submit" disabled={loading} className="w-full py-4 px-6 rounded-2xl font-extrabold text-white bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-500 hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-rose-300/60 flex items-center justify-center gap-2 disabled:opacity-50">{loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Sparkles className="w-5 h-5" /> Create birthday surprise</>}</button>
        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500"><Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> Personal, playful, and ready to share</p>
      </form>
    </div>
  );
}
