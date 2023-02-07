import { readTextFileFromModule, renderTemplate } from "~/util.ts";

const template = await readTextFileFromModule('./template.html', import.meta)

export const KindWords = (props: {photo: string, name: string, distinction: string, quote: string}) => {
  return renderTemplate(template, props)
}
