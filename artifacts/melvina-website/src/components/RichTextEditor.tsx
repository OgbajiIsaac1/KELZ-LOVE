import { useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Undo2, Redo2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const tools = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Bold" },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Italic" },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "Heading 2" },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }), label: "Heading 3" },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Bullet List" },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Ordered List" },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), label: "Blockquote" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-input bg-muted/20 rounded-t-lg">
      {tools.map(({ icon: Icon, action, active, label }) => (
        <Toggle
          key={label}
          size="sm"
          pressed={active}
          onPressedChange={action}
          aria-label={label}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </Toggle>
      ))}
      <span className="w-px h-5 bg-border mx-1" />
      <Toggle size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} aria-label="Undo" title="Undo">
        <Undo2 className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} aria-label="Redo" title="Redo">
        <Redo2 className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const initialValue = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Start writing…",
      }),
    ],
    content: initialValue.current || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[280px] px-3 py-3",
      },
    },
  });

  return (
    <div className="border border-input rounded-lg overflow-hidden bg-background focus-within:ring-1 focus-within:ring-ring">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
