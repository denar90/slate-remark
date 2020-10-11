import * as slate from "slate";
import * as mdast from "./models/mdast";
import { Node as UnistNode } from "unist";
import { SlateNode } from "./remark-slate";

export function slateToRemark(node: any): UnistNode {
  return createMdastRoot(node as slate.Node);
}

function createMdastRoot(node: slate.Node): UnistNode {
  const root: mdast.Root = {
    type: "root",
    children: convertNodes((node as any).children) as mdast.Root["children"],
  };
  return (root as any) as UnistNode;
}

function convertNodes(nodes: slate.Node[]): UnistNode[] {
  return nodes.reduce<UnistNode[]>((acc, n) => {
    const node = createMdastNode(n as SlateNode);
    if (node) {
      acc.push(node);
    }
    return acc;
  }, []);
}

function createMdastNode(node: SlateNode): UnistNode | null {
  if ("text" in node) {
    let res:
      | mdast.Text
      | mdast.Emphasis
      | mdast.Strong
      | mdast.Delete
      | mdast.InlineCode = {
      type: "text",
      value: node.text,
    };
    if (node.inlineCode) {
      res = {
        type: "inlineCode",
        value: res.value,
      };
    }
    if (node.emphasis) {
      res = {
        type: "emphasis",
        children: [res],
      };
    }
    if (node.strong) {
      res = {
        type: "strong",
        children: [res],
      };
    }
    if (node.delete) {
      res = {
        type: "delete",
        children: [res],
      };
    }
    return (res as any) as UnistNode;
  }

  switch (node.type) {
    case "paragraph": {
      const { type, children } = node;
      const res: mdast.Paragraph = {
        type,
        children: (convertNodes(
          children
        ) as any) as mdast.Paragraph["children"],
      };
      return (res as any) as UnistNode;
    }
    case "heading": {
      const { type, depth, children } = node;
      const res: mdast.Heading = {
        type,
        depth,
        children: (convertNodes(children) as any) as mdast.Heading["children"],
      };
      return (res as any) as UnistNode;
    }
    case "thematicBreak": {
      const { type } = node;
      const res: mdast.ThematicBreak = {
        type,
      };
      return (res as any) as UnistNode;
    }
    case "blockquote": {
      const { type, children } = node;
      const res: mdast.Blockquote = {
        type,
        children: (convertNodes(
          children
        ) as any) as mdast.Blockquote["children"],
      };
      return (res as any) as UnistNode;
    }
    case "list": {
      const { type, ordered, start, spread, children } = node;
      const res: mdast.List = {
        type,
        ordered,
        start,
        spread,
        children: (convertNodes(children) as any) as mdast.List["children"],
      };
      return (res as any) as UnistNode;
    }
    case "listItem": {
      const { type, checked, spread, children } = node;
      const res: mdast.ListItem = {
        type,
        checked,
        spread,
        children: (convertNodes(children) as any) as mdast.ListItem["children"],
      };
      return (res as any) as UnistNode;
    }
    case "table": {
      const { type, align, children } = node;
      const res: mdast.Table = {
        type,
        align,
        children: (convertNodes(children) as any) as mdast.Table["children"],
      };
      return (res as any) as UnistNode;
    }
    case "tableRow": {
      const { type, children } = node;
      const res: mdast.TableRow = {
        type,
        children: (convertNodes(children) as any) as mdast.TableRow["children"],
      };
      return (res as any) as UnistNode;
    }
    case "tableCell": {
      const { type, children } = node;
      const res: mdast.TableCell = {
        type,
        children: (convertNodes(
          children
        ) as any) as mdast.TableCell["children"],
      };
      return (res as any) as UnistNode;
    }
    case "html": {
      const { type, children } = node;
      const res: mdast.HTML = {
        type,
        value: children[0].text,
      };
      return (res as any) as UnistNode;
    }
    case "code": {
      const { type, lang, meta, children } = node;
      const res: mdast.Code = {
        type,
        lang,
        meta,
        value: children[0].text,
      };
      return (res as any) as UnistNode;
    }
    case "yaml": {
      const { type, children } = node;
      const res: mdast.YAML = {
        type,
        value: children[0].text,
      };
      return (res as any) as UnistNode;
    }
    case "definition": {
      const { type, identifier, label, url, title } = node;
      const res: mdast.Definition = {
        type,
        identifier,
        label,
        url,
        title,
      };
      return (res as any) as UnistNode;
    }
    case "footnoteDefinition": {
      const { type, identifier, label, children } = node;
      const res: mdast.FootnoteDefinition = {
        type,
        identifier,
        label,
        children: (convertNodes(
          children
        ) as any) as mdast.FootnoteDefinition["children"],
      };
      return (res as any) as UnistNode;
    }
    case "break": {
      const { type } = node;
      const res: mdast.Break = {
        type,
      };
      return (res as any) as UnistNode;
    }
    case "link": {
      const { type, url, title, children } = node;
      const res: mdast.Link = {
        type,
        url,
        title,
        children: (convertNodes(children) as any) as mdast.Link["children"],
      };
      return (res as any) as UnistNode;
    }
    case "image": {
      const { type, url, title, alt } = node;
      const res: mdast.Image = {
        type,
        url,
        title,
        alt,
      };
      return (res as any) as UnistNode;
    }
    case "linkReference": {
      const { type, identifier, label, referenceType, children } = node;
      const res: mdast.LinkReference = {
        type,
        identifier,
        label,
        referenceType,
        children: (convertNodes(
          children
        ) as any) as mdast.LinkReference["children"],
      };
      return (res as any) as UnistNode;
    }
    case "imageReference": {
      const { type, identifier, label, alt, referenceType } = node;
      const res: mdast.ImageReference = {
        type,
        identifier,
        label,
        alt,
        referenceType,
      };
      return (res as any) as UnistNode;
    }
    case "footnote": {
      const { type, children } = node;
      const res: mdast.Footnote = {
        type,
        children: (convertNodes(children) as any) as mdast.Footnote["children"],
      };
      return (res as any) as UnistNode;
    }
    case "footnoteReference": {
      const { type, identifier, label } = node;
      const res: mdast.FootnoteReference = {
        type,
        identifier,
        label,
      };
      return (res as any) as UnistNode;
    }
    default:
      break;
  }
  return null;
}