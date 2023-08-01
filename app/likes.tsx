"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Likes({ tweet }) {
  const router = useRouter();

  const handleLikes = async (e) => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (tweet.user_has_liked_tweet) {
        //dislike
        await supabase.from("likes").delete().match({
          user_id: user.id,
          tweet_id: tweet.id,
        });
        router.refresh();
      } else {
        // like
        await supabase
          .from("likes")
          .insert({ user_id: user.id, tweet_id: tweet.id });
        router.refresh();
      }
    }
  };

  return <button onClick={handleLikes}>{tweet.likes} Likes</button>;
}