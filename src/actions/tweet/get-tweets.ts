import { getAuthUser } from "@/actions/auth/get-auth-user";
import { prisma } from "@/lib/db";

export async function getTweets(limit: number = 15) {
	const { id: currentUserId } = await getAuthUser();

	const list = await prisma.tweets.findMany({
		take: limit,
		omit: { user_id: true },
		orderBy: { created_at: "desc" },
		include: {
			_count: { select: { likes: true, retweets: true, bookmarks: true } },
			likes: { select: { id: true }, where: { user_id: currentUserId } },
			retweets: { select: { id: true }, where: { user_id: currentUserId } },
			bookmarks: { select: { id: true }, where: { user_id: currentUserId } },
			user: {
				select: {
					id: true,
					name: true,
					username: true,
					verified: true,
					avatar: true,
					follower: { select: { id: true }, where: { user_following: currentUserId } }
				}
			}
		}
	});

	const tweetsList = list.map(({ _count, bookmarks, likes, retweets, user: { follower, ...user }, ...tweetData }) => ({
		user,
		tweetData: {
			...tweetData,
			isBookmarked: bookmarks.length > 0,
			isLiked: likes.length > 0,
			isRetweeted: retweets.length > 0,
			likesCount: _count.likes,
			retweetsCount: _count.retweets,
			bookmarksCount: _count.bookmarks
		},
		isCurrentUserAuthor: currentUserId === user.id,
		isFollowing: follower.length > 0
	}));

	return tweetsList;
}
