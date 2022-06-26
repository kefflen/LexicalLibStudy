import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, $isParagraphNode, ElementNode, LexicalEditor, LexicalNode, TextNode } from "lexical";
import { $createCodeNode, $createCodeHighlightNode } from '@lexical/code';
import { CodeHighlightNode, CodeNode } from '@lexical/code'

import React, { useEffect, useState } from "react";


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
        const parent = node.getParent()
        const codeNode = $createCodeNode()
        parent?.insertAfter(codeNode)
        codeNode.selectStart()
        node.remove()
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
        handleExit(node);
      }
    })
    return removeTransform
  }, [editor])

  function handleExit(node: LexicalNode) {
    const parent = node.getParent();
    createNextNodeIfNot(parent);
    node.remove();
    parent?.selectNext();
  
    function createNextNodeIfNot(parent: ElementNode | null) {
      let nextNode = parent?.getNextSibling();
      if (!nextNode || nextNode.getType() === 'code') {
        const p = $createParagraphNode();
        parent?.insertAfter(p);
      }
    }
  }
}

