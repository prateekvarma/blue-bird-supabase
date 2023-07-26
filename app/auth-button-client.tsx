'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/auth-helpers-nextjs';

export default function AuthButtonClient({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient();

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
  };

  return session ? (
    <button onClick={handleSignout}>Logout</button>
  ) : (
    <button onClick={handleSignin}>Login</button>
  );
}
