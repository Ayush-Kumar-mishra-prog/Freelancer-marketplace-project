'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, common } from 'lowlight'
import { FontSize } from '@/lib/font-size-extension'
import Toolbar from './Toolbar'
import { Button, Stack, TextField } from '@mui/material'
import FormPage from '../common/Form'

const lowlight = createLowlight(common)

export default function RichTextEditor() {
  const [tab, setTab] = useState<'editor' | 'preview'>('editor')
    const handleReset = () => {
     alert("Reset clicked")
    };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      TextStyle,
      Color,
      FontSize,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: `
      <h1>Start writing here...</h1>
      <p>Select some text to try <strong>bold</strong>, <em>italic</em>, colors and font sizes.</p>
      <pre><code>console.log("hello world")</code></pre>
    `,
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  })

  return (
    <div className="max-w-4xl  border-l-slate-400  mx-auto ">
      {/* <TextField id="standard-basic" fullWidth label="Enter your post title" variant="standard" sx={{margin:"5px"}} /> */}
      <FormPage />
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTab('editor')}
          className={`px-4 py-2 text-sm font-medium ${
            tab === 'editor' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setTab('preview')}
          className={`px-4 py-2 text-sm font-medium ${
            tab === 'preview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
          }`}
        >
          Preview
        </button>
      </div>

      {tab === 'editor' ? (
        <>
          <Toolbar editor={editor} />
          
          <EditorContent editor={editor} />
          <Stack direction="row" spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                    >
                      Create Post
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Stack>
          
        </>
      ) : (
        <div
          className="prose max-w-none min-h-75 p-4"
          dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}
        />
      )}
      
    </div>
  )
}