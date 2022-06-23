import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, LexicalEditor, TextNode } from "lexical";
import { $createCodeNode, $createCodeHighlightNode } from '@lexical/code';
import {CodeHighlightNode, CodeNode} from '@lexical/code'

import React, { useEffect } from "react";


const TriggerCodeNodePlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()
  useTrigger(editor)
  useExitTrigger(editor)
  return null
}

export default TriggerCodeNodePlugin

function useTrigger(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(TextNode, node => {
      const content = node.getTextContent()
      if (content === "```js") {
        node.replace($createCodeNode())
      }
    })
    return removeTransform
  }, [editor])
}

function useExitTrigger(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(CodeNode, node => {
      const content = node.getTextContent()
      console.log(content)
      if (content.endsWith('exit')) {
        const parent = node.getParent()
        
        const p = $createParagraphNode()
        const text = $createTextNode('TextNode')
        p.append(text)
        parent?.append(p)
        parent?.select()
      }
    })
    return removeTransform
  }, [editor])
}