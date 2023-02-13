import { readTextFileFromModule, renderTemplate, TemplateData, useStyleSheet } from "~/util.ts";

const template = await readTextFileFromModule("./template.html", import.meta);

interface HeroHeaderProps extends TemplateData {
  imageUrl: string,
  headerLevel: number,
  headerText: string
}

export function HeroHeader(props: HeroHeaderProps) {
  useStyleSheet("./style.css", import.meta)
  return renderTemplate(template, props);
}
