import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, $isParagraphNode, LexicalEditor, TextNode } from "lexical";
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
    const removeTransform = editor.registerNodeTransform(CodeHighlightNode, node => {
      const content = node.getTextContent()
      if (content === 'exit') {
        const parent = node.getParent()
        node.remove()
        let nextNode = parent?.getNextSibling()
        if (!nextNode) {
          const p = $createParagraphNode()
          parent?.insertAfter(p)
          nextNode = p
        }
        console.log(parent?.selectNext())
      }
    })
    return removeTransform
  }, [editor])
}