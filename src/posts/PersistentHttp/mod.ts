
import { readTextFileFromModule } from "~/util.ts";
import { HeroHeader } from "~/components/HeroHeader/mod.ts";
import { renderTemplate } from "~/util/template.ts";

const template = await readTextFileFromModule('./post.html', import.meta)
export const Post = () => {
  return renderTemplate(template, {
    header: HeroHeader({
      imageUrl: "/static/images/smelling_roses.png",
      headerHtml: "<h1>Smelling the roses with persistent HTTP connections</h1>",
      filter: "sepia(1) opacity(0.3)"
    })
  })
};
