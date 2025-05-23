import { type Tweets } from "@prisma/client";

import { type User } from "@/types/user";

export type TweetData = Omit<Tweets, "user_id"> & {
	isBookmarked: boolean;
	isLiked: boolean;
	isRetweeted: boolean;
	likesCount: number;
	retweetsCount: number;
	bookmarksCount: number;
};
