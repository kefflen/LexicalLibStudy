import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import CodeHighlightPlugin from './Plugins/CodeHighlightPlugin';
import {CodeHighlightNode, CodeNode} from '@lexical/code';
import { $getRoot, $getSelection, EditorState } from 'lexical';
import {$createCodeNode} from '@lexical/code';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';


import StyledEditor from "./components/StyledEditor"
import playgroundTheme from './playgroundTheme';
import TriggerCodeNodePlugin from './Plugins/TriggerCodeNodePlugin';
import TreeViewPlugin from './Plugins/TreeViewPlugin';
import PrintableArea from './components/PrintableArea';

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
    console.log(root)
  })
}


function App() {

  return (
    <div className="App">
      <PrintableArea>
        <StyledEditor name="code-editor">
          <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin contentEditable={<ContentEditable  />}
              placeholder=''/>
            <CodeHighlightPlugin />
            <TriggerCodeNodePlugin />
            <OnChangePlugin onChange={onChange}/>
            <TreeViewPlugin />
          </LexicalComposer>
        </StyledEditor>
      </PrintableArea>
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