import escapeHtml from 'escape-html'
import prism from 'prismjs'
import path from 'path';
import fs from 'fs';
import mdContainer from 'markdown-it-container';

function wrap(code, lang) {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<pre v-pre style="margin: 0; white-space: pre-wrap;"><code>${code}</code></pre>`
}
// 语法高亮
const highlight = (str, lang) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
// 配置
export const markdownConfig = (md) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^code\s*(.*)$/);
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^code\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const sourceFile = m && m.length > 1 ? m[1] : '';
        // 源码文件路径
        const filePath = path.resolve(__dirname, '../examples', `${sourceFile}`);
        let source = fs.readFileSync(filePath, 'utf-8');
        if (!source)
          throw new Error(`Incorrect source file: ${sourceFile}`);
        return `<code-box source="${encodeURIComponent(highlight(source, 'vue'))}" raw-source="${encodeURIComponent(source)}" path="${sourceFile}" >`;
      }
      return '</code-box>';
    },
  });
}