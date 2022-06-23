import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import CodeHighlightPlugin from './Plugins/CodeHighlightPlugin';
import {CodeHighlightNode, CodeNode} from '@lexical/code';
import { $createParagraphNode, $createTextNode, $getRoot, $getSelection, EditorState, LexicalEditor } from 'lexical';
import {$createCodeNode, $createCodeHighlightNode} from '@lexical/code';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';


import StyledEditor from "./components/StyledEditor"
import playgroundTheme from './playgroundTheme';
import TriggerCodeNodePlugin from './Plugins/TriggerCodeNodePlugin';

const initialConfig = {
  namespace: 'code-editor',
  editorState: prePopulateEditor,
  theme: playgroundTheme,
  onError(e: any) {
    console.log(e)
  },
  nodes: [CodeHighlightNode, CodeNode]
}

function onChange(editorState: EditorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  })
}


function App() {

  return (
    <div className="App">
      <StyledEditor name="code-editor">
        <LexicalComposer initialConfig={initialConfig}>
          <PlainTextPlugin contentEditable={<ContentEditable />}
            placeholder=''/>
          <CodeHighlightPlugin />
          <TriggerCodeNodePlugin />
          <OnChangePlugin onChange={onChange}/>
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
  // codeNode.append($createCodeHighlightNode('const x = 2'))
  root.append(codeNode)
}