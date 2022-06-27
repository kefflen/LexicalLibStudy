import { $createParagraphNode, EditorConfig, ElementNode, LexicalNode, RangeSelection } from 'lexical'


export default class MarkdownBlockNode extends ElementNode {

  __isMarkdownActive: boolean
  constructor(isMarkdownActive: boolean, key: string|undefined) {
    super(key)
    this.__isMarkdownActive = isMarkdownActive
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('div')
    return element
  }

  insertNewAfter(selection: RangeSelection): LexicalNode | null {
    const children = this.getChildren()
    const childrenLength = children.length
    
    // Se tiver 3 quebras de linhas no final sai do bloco automaticamente
    if (childrenLength >= 2 && children[childrenLength - 1].getTextContent() === '\n' && children[childrenLength - 2].getTextContent() === '\n' && selection.isCollapsed() && selection.anchor.key === this.__key && selection.anchor.offset === childrenLength) {
      console.log('Enter')
      children[childrenLength - 1].remove();
      children[childrenLength - 2].remove();
      const newElement = $createParagraphNode();
      this.insertAfter(newElement);
      return newElement;
    } else {
      return super.insertNewAfter(selection)
    }
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

