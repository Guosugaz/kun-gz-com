import components from "../component-list.js";

const com = "@sugaz/gz-com";
function kebabCase(key) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}

function getSideEffects(partialName, options) {
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

export function GzComResolver(options = {}) {
  return {
    type: "component",
    resolve: (name) => {
      if (name.startsWith("Gz")) {
        const partialName = name.slice(2);
        const kb = kebabCase(partialName);
        if (components.includes(kb)) {
          return {
            name: partialName,
            from: `${com}/lib/${kb}`,
            sideEffects: getSideEffects(kb, options)
          };
        }
      }
    }
  };
}
