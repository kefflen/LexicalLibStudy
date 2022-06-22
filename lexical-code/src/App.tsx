import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';

import StyledEditor from "./components/StyledEditor"

const initialConfig = {
  namespace: 'code-editor',
  theme: {},
  onError(e: any) {
    console.log(e)
  }
}

function App() {

  return (
    <div className="App">
      <StyledEditor name="code-editor">
        <LexicalComposer initialConfig={initialConfig}>
          <PlainTextPlugin contentEditable={<ContentEditable />}
            placeholder=''/>
        </LexicalComposer>
      </StyledEditor>
    </div>
  )
}

export default App
