import { EditorConfig, LexicalNode, ParagraphNode } from 'lexical'


export default class MarkdownBlockNode extends ParagraphNode {

  __isMarkdownActive: boolean
  constructor(isMarkdownActive: boolean, key: string|undefined) {
    super(key)
    this.__isMarkdownActive = isMarkdownActive
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config)
    return dom
  }

  static clone(node: MarkdownBlockNode): MarkdownBlockNode {
    return new this(node.__isMarkdownActive, node.key)
  }

  static getType(): string {
    return 'markdowblock'
  }
}

export function $isMarkdownBlockNode(node: LexicalNode) {
  return node instanceof MarkdownBlockNode
}

export function $createMarkdownBlockNode(isMarkdownActive=false, key?: string) {
  return new MarkdownBlockNode(isMarkdownActive, key)
}

