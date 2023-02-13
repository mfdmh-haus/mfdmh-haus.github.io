import { readTextFileFromModule, renderTemplate } from "~/util.ts";
import { HeroHeader } from "../../components/HeroHeader/mod.ts";

const template = await readTextFileFromModule('./post.html', import.meta)
export const Post = () => {
  return renderTemplate(template, {
    header: HeroHeader({
      imageUrl: "/static/images/deno_news.png",
      headerHtml: "<h1>Discovering Deno</h1>"
    })
  })
};
