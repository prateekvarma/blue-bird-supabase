import Likes from "./likes";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  return tweets.map((tweet) => {
    return (
      <div key={tweet.id}>
        <p>
          {tweet.author.name} - {tweet.author.username}
        </p>
        <p>{tweet.title}</p>
        <Likes tweet={tweet} />
        <hr />
      </div>
    );
  });
}
