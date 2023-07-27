'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  };

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <button onClick={handleSignout}>Logout</button>
  ) : (
    <button onClick={handleSignin}>Login</button>
  );
}
