import { readTextFileFromModule, renderTemplate, TemplateData, useStyleSheet } from "~/util.ts";

const template = await readTextFileFromModule("./template.html", import.meta);

export interface KindWordsProps extends TemplateData {
  photo: string;
  name: string;
  distinction: string;
  quote: string;
}

export const KindWords = (props: KindWordsProps) => {
  useStyleSheet("./style.css", import.meta)
  return renderTemplate(template, props);
};
