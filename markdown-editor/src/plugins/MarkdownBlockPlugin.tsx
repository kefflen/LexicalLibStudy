import { $getSelection, createCommand, LexicalEditor } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { $createMarkdownBlockNode } from '../nodes/MarkdownNode'

const CREATE_MARKDOWN_BLOCK = createCommand()

export default function MarkdownBlockPlugin() {
  const [editor] = useLexicalComposerContext()
  useKeyDownEvent(editor)

  return null
}

function useKeyDownEvent(editor: LexicalEditor) {
  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.key === ';' && event.ctrlKey) {
        editor.dispatchCommand(CREATE_MARKDOWN_BLOCK, null)
      }
    })
  }, [])

  useEffect(() => {
    const removeCommandListener = editor.registerCommand(CREATE_MARKDOWN_BLOCK, () => {
      const currentSelection = $getSelection()
      if (currentSelection === null) return false
      const nodes = currentSelection.getNodes()
      if (nodes.length === 1) {
        const node = nodes[0]
        node.replace($createMarkdownBlockNode())
      }
      return true
    }, 1)
    return removeCommandListener
  }, [editor])
}