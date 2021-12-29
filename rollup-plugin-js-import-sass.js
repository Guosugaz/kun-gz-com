// 匹配规则为 variables.scss 的文件
const filePathReg = /variables\.scss$/

export default function myPlugin() {
  return {
    transform(code, id) {
      if (!filePathReg.test(id)) return;
      const mapCode = code.substr(code.match(/:export\s{/).index + 8);
      const keysMatch = mapCode.matchAll(/\$\w+/g);
      let res = `export default { `;
      Array.from(keysMatch).forEach((item) => {
        const key = item[0]?.replace(/^\$/, "");
        const reg = new RegExp(`\\$${key}:\\s(.+);`);
        const value = code.match(reg)[1]?.replace(/\s/g, "");
        res += `${key}: "${value}",`;
      });
      res += " }";

      return {
        code: res
      };
    }
  };
}
