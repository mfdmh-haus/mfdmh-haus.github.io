import { readTextFileFromModule, renderTemplate, TemplateData, useStyleSheet } from "~/util.ts";

const template = await readTextFileFromModule("./template.html", import.meta);

interface HeroHeaderProps {
  imageUrl: string,
  headerHtml: string,
  filter?: string,
}

export function HeroHeader(props: HeroHeaderProps) {
  useStyleSheet("./style.css", import.meta)
  const data: TemplateData = {
    ...props,
    filter: props.filter || "var(--filter)"
  }
  return renderTemplate(template, data);
}
