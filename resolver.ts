const com = "@sugaz/gz-com";
function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}

export interface GzComResolverOptions {
  /**
   * import style css or scss along with components
   *
   * @default true
   */
  importStyle?: boolean | "css" | "sass";
}

function getSideEffects(
  partialName: string,
  options: GzComResolverOptions
): any | undefined {
  const { importStyle = true } = options;

  if (importStyle === "sass") {
    return [
      `${com}/src/theme-default/base.scss`,
      `${com}/src/theme-default/${partialName}.scss`
    ];
  } else if (importStyle === true || importStyle === "css") {
    return [
      `${com}/lib/theme-default/base.css`,
      `${com}/lib/theme-default/${partialName}.css`
    ];
  }
}

export function GzComResolver(options: GzComResolverOptions = {}): any {
  return {
    type: "component",
    resolve: (name: string) => {
      if (name.startsWith("Van")) {
        const partialName = name.slice(2);
        return {
          name: partialName,
          from: `${com}/lib`,
          sideEffects: getSideEffects(kebabCase(partialName), options)
        };
      }
    }
  };
}
