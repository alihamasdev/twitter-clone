# Query Keys

List of all the query used in the projects

| #   | QueryKey                      | Description                   | Type                                        |
| --- | ----------------------------- | ----------------------------- | ------------------------------------------- |
| 1   | `["auth"]`                    | Logged in user data           | [`UserData {}`](./src/types/user.ts)        |
| 2   | `["posts", "feed"]`           | Posts list on the homepage    | [`PostPage []`](./src/types/post.ts)        |
| 3   | `["posts", postId]`           | Single Post                   | [`PostData {}`](./src/types/post.ts)        |
| 4   | `["posts", userId]`           | Posts created by user         | [`PostPage []`](./src/types/post.ts)        |
| 5   | `["posts", "like", userId]`   | Posts liked by user           | [`PostPage []`](./src/types/post.ts)        |
| 6   | `["posts", "repost", userId]` | Posts reposts by user         | [`PostPage []`](./src/types/post.ts)        |
| 7   | `["posts", "count", userId]`  | Total number of posts by user | [`PostsCount {}`](./src/types/post.ts)      |
| 8   | `["profile", userId]`         | Profile user data             | [`ProfilePageUser {}`](./src/types/user.ts) |
| 9   | `["follower-info", userId]`   | Followers info details        | [`FollowerInfo {}`](./src/types/user.ts)    |
| 10  | `["following-info", userId]`  | Following info details        | [`FollowingInfo {}`](./src/types/user.ts)   |
| 11  | `["followers", userId]`       | People following user         | [`UserPage []`](./src/types/user.ts)        |
| 12  | `["following", userId]`       | User following people         | [`UserPage []`](./src/types/user.ts)        |

Note : `[]` shows infite query & `{}` single query
