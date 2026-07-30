import { notFound } from 'next/navigation';
import ClientBirthdayWishViewer from '@/components/ClientBirthdayWishViewer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function BirthdayWishPage({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params;
  const birthdayWish = await prisma.birthdayWish.findUnique({ where: { slug } });

  if (!birthdayWish) notFound();

  return (
    <main className="celebration-page min-h-screen text-slate-900 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />
      <ClientBirthdayWishViewer senderName={birthdayWish.senderName} friendName={birthdayWish.friendName} message={birthdayWish.message} photoData={birthdayWish.photoData} />
    </main>
  );
}
