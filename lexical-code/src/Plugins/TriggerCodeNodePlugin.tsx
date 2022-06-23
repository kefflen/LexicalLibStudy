import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, TextNode } from "lexical";
import { $createCodeNode, $createCodeHighlightNode } from '@lexical/code';

import React, { useEffect } from "react";


const TriggerCodeNodePlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()
  useTrigger(editor)
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