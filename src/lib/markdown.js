const FENCE_SPLIT = /(```[\s\S]*?```)/g;
const INLINE_CODE_SPLIT = /(`[^`\n]+`)/g;

function transformCallouts(text) {
  return text.replace(/:::(\w+)\n([\s\S]*?)\n:::/g, (_match, type, body) => {
    const lines = body.trim().split("\n");
    return ["> @" + type, ">", ...lines.map((l) => "> " + l)].join("\n");
  });
}

function transformInline(text) {
  const parts = text.split(INLINE_CODE_SPLIT);
  return parts
    .map((part) => {
      if (part.startsWith("`")) return part;
      return part
        .replace(/==([\s\S]*?)==/g, "`==$1==`")
        .replace(/\+\+([\s\S]*?)\+\+/g, "`++$1++`");
    })
    .join("");
}

export function preprocessContent(md) {
  return String(md)
    .split(FENCE_SPLIT)
    .map((part) => {
      if (part.startsWith("```")) return part;
      return transformInline(transformCallouts(part));
    })
    .join("");
}

export function toText(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (node.props) return toText(node.props.children);
  return "";
}

const CALL_OUTS = new Set(["note", "tip", "warn", "key", "quote"]);