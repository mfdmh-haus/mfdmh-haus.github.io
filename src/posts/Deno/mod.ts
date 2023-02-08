import { readTextFileFromModule } from "~/util.ts";

const postContent = await readTextFileFromModule('./post.html', import.meta)
export const Post = () => {
  return postContent
};
