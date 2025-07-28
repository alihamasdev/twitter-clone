# Query Keys

List of all the query used in the projects

| #   | QueryKey                     | Description                    | Type                                        |
| --- | ---------------------------- | ------------------------------ | ------------------------------------------- |
| 1   | `["auth"]`                   | Logged in user data            | [`UserData {}`](./src/types/user.ts)        |
| 2   | `["people"]`                 | All users list                 | [`UserPage []`](./src/types/user.ts)        |
| 3   | `["feed"]`                   | Posts list on the homepage     | [`PostPage []`](./src/types/post.ts)        |
| 4   | `["bookmarks"]`              | Bookmarked posts of login user | [`PostPage []`](./src/types/post.ts)        |
| 5   | `["posts", userId]`          | Posts created by user          | [`PostPage []`](./src/types/post.ts)        |
| 6   | `["likes", userId]`          | Posts liked by user            | [`PostPage []`](./src/types/post.ts)        |
| 7   | `["reposts", userId]`        | Posts reposts by user          | [`PostPage []`](./src/types/post.ts)        |
| 8   | `["replies", userId]`        | Posts replied by user          | [`PostPage []`](./src/types/post.ts)        |
| 9   | `["posts-count", userId]`    | Total number of posts by user  | [`PostsCount {}`](./src/types/post.ts)      |
| 10  | `["post", postId]`           | Single Post                    | [`PostData {}`](./src/types/post.ts)        |
| 11  | `["profile", userId]`        | Profile user data              | [`ProfilePageUser {}`](./src/types/user.ts) |
| 12  | `["follower-info", userId]`  | Followers info details         | [`FollowerInfo {}`](./src/types/user.ts)    |
| 13  | `["following-info", userId]` | Following info details         | [`FollowingInfo {}`](./src/types/user.ts)   |
| 14  | `["followers", userId]`      | People following user          | [`UserPage []`](./src/types/user.ts)        |
| 15  | `["following", userId]`      | User following people          | [`UserPage []`](./src/types/user.ts)        |

Note : `[]` shows infite query & `{}` single query
