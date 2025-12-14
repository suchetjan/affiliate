import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ short_code: string }>;
}

export default async function RedirectPage({ params }: Props) {
  const { short_code } = await params;
  
  // Redirect to backend endpoint
  redirect(`${process.env.NEXT_PUBLIC_API_URL}/go/${short_code}`);
}