import { LinkStruct, _getStyleSheets } from "../internal/build_state.ts"

const templateSlotRE = /\$\{(.*?)\}/g

export type TemplateData = Record<string, string | number>

export const SPECIAL_SLOT_SYTLESHEETS = Symbol("StyleSheets")

export function renderTemplate(template: string, data: TemplateData) {
  const derivedData = {
    $styleSheetLinks: renderLinks(_getStyleSheets())
  }
  Object.assign(data, derivedData)
  return renderTemplateBasic(template, data)
}

function renderTemplateBasic(template: string, data: Record<string, string>) {
  return template.replaceAll(templateSlotRE, replaceTemplateSlot)

  function replaceTemplateSlot(_: string, slotName: string) {
    return data[slotName]
  }
}

function renderLinks(links: Array<LinkStruct>) {
  return links.map(({rel, href}) => {
    return `<link rel="${rel}" href="${href}">`
  }).join("\n")
}

