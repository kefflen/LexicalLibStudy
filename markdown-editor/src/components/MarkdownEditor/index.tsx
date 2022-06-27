import { Container } from "./styled";
import { LexicalEditor } from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import MarkdownBlockPlugin from "../../plugins/MarkdownBlockPlugin";
import TreeViewPlugin from "../../plugins/TreeViewPlugin";
import MarkdownBlockNode from "../../nodes/MarkdownNode";

const initialConfig = {
  namespace: 'markdown-editor',
  onError(err: Error, editor: LexicalEditor) {
    console.log(err)
  },
  theme: {},
  nodes: [
    MarkdownBlockNode
  ]
}

export default function MarkdownEditor() {

  return (
    <Container>
      <div className="editor-header">
        <h2>Markdown Editor</h2>
      </div>
      <div className="editor-container">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin 
            contentEditable={<ContentEditable />}
            placeholder=''/>
          <MarkdownBlockPlugin />
          <TreeViewPlugin />
        </LexicalComposer>
      </div>
    </Container>
  )
}