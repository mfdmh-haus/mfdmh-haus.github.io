import { readTextFileFromModule, renderTemplate, TemplateData } from "~/util.ts";

const template = await readTextFileFromModule("./template.html", import.meta);

export interface KindWordsProps extends TemplateData {
  photo: string;
  name: string;
  distinction: string;
  quote: string;
}

export const KindWords = (props: KindWordsProps) => {
  return renderTemplate(template, props);
};
