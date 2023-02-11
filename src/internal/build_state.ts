import { getProjectRelativePath, getStaticUriForSource, resolvePath } from "../util.ts"

export type LinkStruct = {
  rel: string,
  href: string
}
export type StaticTarget = {
  src: string,
  uri: string
}
const state = {
  styleSheets: {
    usedByComponents: [] as Array<LinkStruct>,
    byUri: {} as Record<string, number>
  },
  staticTargets: {
    usedByComponents: [] as Array<StaticTarget>,
    byUri: {} as Record<string, number>
  }
}

export function _getStyleSheets() {
  return [...state.styleSheets.usedByComponents]
}

export function _getStaticTargets() {
  return [...state.staticTargets.usedByComponents]
}

export function _useStyleSheet(relPathToSource: string, moduleMeta: ImportMeta) {
  const absPathSource = resolvePath(relPathToSource, moduleMeta)
  const uri = getStaticUriForSource(absPathSource, "stylesheet")
  const {styleSheets} = state
  _useStaticTarget(relPathToSource, moduleMeta)
  if(!(uri in state.styleSheets.byUri)) {
    styleSheets.byUri[uri] = styleSheets.usedByComponents.length
    styleSheets.usedByComponents.push({
      rel: "stylesheet",
      href: uri
    })
  }
}

export function _useStaticTarget(relPathToSource: string, moduleMeta: ImportMeta) {
  const absPathToSource = resolvePath(relPathToSource, moduleMeta)
  const src = getProjectRelativePath(absPathToSource)
  const uri = getStaticUriForSource(absPathToSource, "stylesheet")
  const {staticTargets} = state
  if(!(uri in state.styleSheets.byUri)) {
    staticTargets.byUri[uri] = staticTargets.usedByComponents.length
    staticTargets.usedByComponents.push({
      src,
      uri
    })
  }
}
