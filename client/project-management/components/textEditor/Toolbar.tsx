'use client'

import { Editor } from '@tiptap/react'

const FONT_SIZES = ['12px', '14px', '16px', '18px', '24px', '32px', '48px']
const COLORS = ['#000000', '#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7', '#EC4899']

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  const btn = (active: boolean) =>
    `px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
    } border border-gray-200`

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button className={btn(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()}>
        B
      </button>
      <button className={btn(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <span className="italic">I</span>
      </button>
      <button className={btn(editor.isActive('strike'))} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <span className="line-through">S</span>
      </button>

      <span className="w-px h-6 bg-gray-300 mx-1" />

      <button className={btn(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        H1
      </button>
      <button className={btn(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </button>

      {/* Font size dropdown */}
      <select
        className="px-2 py-1.5 rounded-md border border-gray-200 text-sm bg-white"
        onChange={(e) => {
          const val = e.target.value
          if (val === 'default') {
            editor.chain().focus().unsetFontSize().run()
          } else {
            editor.chain().focus().setFontSize(val).run()
          }
        }}
        defaultValue="default"
      >
        <option value="default">Size</option>
        {FONT_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <span className="w-px h-6 bg-gray-300 mx-1" />

      {/* Color picker */}
      <div className="flex items-center gap-1">
        {COLORS.map((color) => (
          <button
            key={color}
            className="w-6 h-6 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
            onClick={() => editor.chain().focus().setColor(color).run()}
          />
        ))}
        <input
          type="color"
          className="w-6 h-6 rounded cursor-pointer border border-gray-300"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        />
        <button className="text-xs text-gray-500 underline ml-1" onClick={() => editor.chain().focus().unsetColor().run()}>
          reset
        </button>
      </div>

      <span className="w-px h-6 bg-gray-300 mx-1" />

      <button className={btn(editor.isActive('code'))} onClick={() => editor.chain().focus().toggleCode().run()}>
        {'</>'}
      </button>
      <button className={btn(editor.isActive('codeBlock'))} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        Code Block
      </button>

      <span className="w-px h-6 bg-gray-300 mx-1" />

      <button className={btn(false)} onClick={() => editor.chain().focus().undo().run()}>
        ↺
      </button>
      <button className={btn(false)} onClick={() => editor.chain().focus().redo().run()}>
        ↻
      </button>
    </div>
  )
}