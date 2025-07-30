# Query Keys

List of all the query used in the projects

| #   | QueryKey                     | Description                    | Type                                        |
| --- | ---------------------------- | ------------------------------ | ------------------------------------------- |
| 01  | `["auth"]`                   | Logged in user data            | [`UserData {}`](./src/types/user.ts)        |
| 02  | `["people"]`                 | All users list                 | [`UserPage []`](./src/types/user.ts)        |
| 03  | `["feed"]`                   | Posts list on the homepage     | [`PostPage []`](./src/types/post.ts)        |
| 04  | `["bookmarks"]`              | Bookmarked posts of login user | [`PostPage []`](./src/types/post.ts)        |
| 05  | `["posts", userId]`          | Posts created by user          | [`PostPage []`](./src/types/post.ts)        |
| 06  | `["likes", userId]`          | Posts liked by user            | [`PostPage []`](./src/types/post.ts)        |
| 07  | `["reposts", userId]`        | Posts reposts by user          | [`PostPage []`](./src/types/post.ts)        |
| 08  | `["replies", userId]`        | Posts replied by user          | [`PostPage []`](./src/types/post.ts)        |
| 09  | `["posts-count", userId]`    | Total number of posts by user  | [`PostsCount {}`](./src/types/post.ts)      |
| 10  | `["post", postId]`           | Single Post                    | [`PostData {}`](./src/types/post.ts)        |
| 11  | `["replies", postId]`        | Replies on Post                | [`PostPage []`](./src/types/post.ts)        |
| 12  | `["profile", userId]`        | Profile user data              | [`ProfilePageUser {}`](./src/types/user.ts) |
| 13  | `["follower-info", userId]`  | Followers info details         | [`FollowerInfo {}`](./src/types/user.ts)    |
| 14  | `["following-info", userId]` | Following info details         | [`FollowingInfo {}`](./src/types/user.ts)   |
| 15  | `["followers", userId]`      | People following user          | [`UserPage []`](./src/types/user.ts)        |
| 16  | `["following", userId]`      | User following people          | [`UserPage []`](./src/types/user.ts)        |

Note : `[]` shows infite query & `{}` single query
