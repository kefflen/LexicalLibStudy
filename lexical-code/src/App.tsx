import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import CodeHighlightPlugin from './Plugins/CodeHighlightPlugin';
import {CodeHighlightNode, CodeNode} from '@lexical/code';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import {$createCodeNode, $createCodeHighlightNode} from '@lexical/code';


import StyledEditor from "./components/StyledEditor"
import playgroundTheme from './playgroundTheme';

const initialConfig = {
  namespace: 'code-editor',
  editorState: prePopulateEditor,
  theme: playgroundTheme,
  onError(e: any) {
    console.log(e)
  },
  nodes: [CodeHighlightNode, CodeNode]
}

function App() {

  return (
    <div className="App">
      <StyledEditor name="code-editor">
        <LexicalComposer initialConfig={initialConfig}>
          <PlainTextPlugin contentEditable={<ContentEditable />}
            placeholder=''/>
          <CodeHighlightPlugin />
        </LexicalComposer>
      </StyledEditor>
    </div>
  )
}

export default App


function prePopulateEditor() {
  console.log('Teste')
  const root = $getRoot()
  // const paragraph = $createParagraphNode();
  // const text = $createTextNode('Populando o node com text node') 
  const codeNode = $createCodeNode('javascript')
  codeNode.append($createCodeHighlightNode('const x = 2'))
  root.append(codeNode)
}