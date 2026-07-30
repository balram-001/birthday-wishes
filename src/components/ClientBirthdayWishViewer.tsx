'use client';

import BirthdayWishViewer from './BirthdayWishViewer';

type Props = { senderName: string; friendName: string; message: string | null; photoData: string | null };

export default function ClientBirthdayWishViewer(props: Props) {
  return <BirthdayWishViewer {...props} />;
}
