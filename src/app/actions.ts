'use server';

import { prisma } from '@/lib/prisma';
import slugify from 'slugify';

type BirthdayWishInput = {
  senderName: string;
  friendName: string;
  message?: string;
  photoData?: string;
};

export async function createBirthdayWishLink({ senderName, friendName, message, photoData }: BirthdayWishInput) {
  const cleanSenderName = senderName.trim();
  const cleanFriendName = friendName.trim();
  const cleanMessage = message?.trim();

  if (!cleanSenderName || !cleanFriendName) throw new Error('Both names are required.');
  if (cleanMessage && cleanMessage.length > 500) throw new Error('Message must be 500 characters or less.');
  if (photoData && (!photoData.startsWith('data:image/') || photoData.length > 800_000)) throw new Error('Please choose a smaller image.');

  const baseSlug = slugify(cleanSenderName, { lower: true, strict: true }) || 'birthday-wish';
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (await prisma.birthdayWish.findUnique({ where: { slug: uniqueSlug } })) uniqueSlug = `${baseSlug}-${counter++}`;

  const birthdayWish = await prisma.birthdayWish.create({
    data: { slug: uniqueSlug, senderName: cleanSenderName, friendName: cleanFriendName, message: cleanMessage || null, photoData: photoData || null },
  });

  return { slug: birthdayWish.slug };
}
