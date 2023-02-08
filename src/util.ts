import htm from 'htm'
import { h } from 'preact'
import { VNode, ComponentType } from 'types/preact'

export const htmPreact = htm.bind(h) as (strings: TemplateStringsArray, ...values: Array<ComponentType>) => VNode

const templateSlotRE = /\$\{(.*?)\}/g
export type TemplateData = Record<string, string>
export function renderTemplate(template: string, data: Record<string, string>) {
  return template.replaceAll(templateSlotRE, replaceTemplateSlot)

  function replaceTemplateSlot(_: string, slotName: string) {
    return data[slotName]
  }
}

export function readTextFileFromModule(importSpecifier: string, moduleMeta = import.meta) {
  const resolvedPath = new URL(moduleMeta.resolve(importSpecifier)).pathname
  return Deno.readTextFile(resolvedPath)
}

export function escapeHtmlString(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("'", "&#39;")
    .replaceAll("\"", "&quot;")
}
