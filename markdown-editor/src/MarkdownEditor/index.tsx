import { Container } from "./styled";
import { LexicalEditor } from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'

const initialConfig = {
  namespace: 'markdown-editor',
  onError(err: Error, editor: LexicalEditor) {
    console.log(err)
  },
  theme: {}
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
        </LexicalComposer>
      </div>
    </Container>
  )
}