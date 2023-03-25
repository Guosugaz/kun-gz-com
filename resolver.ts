import type { ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components/types'
import { kebabCase } from "unplugin-vue-components"

const com = "@sugaz/gz-com"

export interface GzComResolverOptions {
  /**
   * import style css or scss along with components
   *
   * @default true
   */
  importStyle?: boolean | 'css' | 'sass'
}

function getSideEffects(partialName: string, options: GzComResolverOptions): SideEffectsInfo | undefined {
  const { importStyle = true } = options

  if (importStyle === 'sass') {
    return [
      `${com}/src/theme-chalk/base.scss`,
      `${com}/src/theme-chalk/${partialName}.scss`,
    ]
  }
  else if (importStyle === true || importStyle === 'css') {
    return [
      `${com}/lib/theme-chalk/base.css`,
      `${com}/lib/theme-chalk/${partialName}.css`,
    ]
  }
}

export function GzComResolver(options: GzComResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Van')) {
        const partialName = name.slice(2)
        return {
          name: partialName,
          from: `${com}/lib`,
          sideEffects: getSideEffects(kebabCase(partialName), options),
        }
      }
    },
  }
}