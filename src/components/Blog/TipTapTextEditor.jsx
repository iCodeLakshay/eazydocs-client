"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Quote, Link as LinkIcon, Unlink,
  Highlighter, Palette, Code, Undo, Redo, Minus, Type, X, Check
} from "lucide-react";
import { createLowlight } from "lowlight";
const lowlight = createLowlight();
import "highlight.js/styles/github.css";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import kotlin from "highlight.js/lib/languages/kotlin";
import swift from "highlight.js/lib/languages/swift";
import typescript from "highlight.js/lib/languages/typescript";
import sql from "highlight.js/lib/languages/sql";
import html from "highlight.js/lib/languages/xml"; // HTML/XML
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import shell from "highlight.js/lib/languages/shell";
import bash from "highlight.js/lib/languages/bash";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import yaml from "highlight.js/lib/languages/yaml";
import markdown from "highlight.js/lib/languages/markdown";
import perl from "highlight.js/lib/languages/perl";
import r from "highlight.js/lib/languages/r";
import scala from "highlight.js/lib/languages/scala";
import objectivec from "highlight.js/lib/languages/objectivec";
import dart from "highlight.js/lib/languages/dart";

// Register with lowlight
lowlight.register("javascript", javascript);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("c", c);
lowlight.register("cpp", cpp);
lowlight.register("csharp", csharp);
lowlight.register("php", php);
lowlight.register("ruby", ruby);
lowlight.register("go", go);
lowlight.register("rust", rust);
lowlight.register("kotlin", kotlin);
lowlight.register("swift", swift);
lowlight.register("typescript", typescript);
lowlight.register("sql", sql);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("json", json);
lowlight.register("shell", shell);
lowlight.register("bash", bash);
lowlight.register("dockerfile", dockerfile);
lowlight.register("yaml", yaml);
lowlight.register("markdown", markdown);
lowlight.register("perl", perl);
lowlight.register("r", r);
lowlight.register("scala", scala);
lowlight.register("objectivec", objectivec);
lowlight.register("dart", dart);


export default function TipTapTextEditor({ value = "", onChange }) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // we replace with lowlight version
      }),
      // Rich text extensions
      Underline,
      Highlight,
      TextStyle,
      Color,
      Link.configure({
        autolink: true,
        openOnClick: false,
        protocols: ["http", "https", "mailto"],
        HTMLAttributes: { rel: "noopener noreferrer nofollow" },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Write your blog content here…",
        emptyEditorClass: "is-editor-empty",
      }),
      // Code block with syntax highlighting
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "javascript" }),
    ],
    content: value || "<p></p>",
    autofocus: false,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none focus:outline-none min-h-[350px] px-4 py-3 text-base",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange && onChange(html);
    },
  });

  const setLanguage = (lang) => {
    if (!editor) return;
    // Ensure we're inside a code block, then set language
    if (!editor.isActive("codeBlock")) {
      editor.chain().focus().toggleCodeBlock().run();
    }
    editor.chain().focus().updateAttributes("codeBlock", { language: lang }).run();
  };

  const openLinkModal = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");
    
    setLinkUrl(previousUrl);
    setLinkText(selectedText);
    setShowLinkModal(true);
  };

  const handleLinkSubmit = () => {
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run();
      setShowLinkModal(false);
      return;
    }

    try {
      const normalized = new URL(linkUrl, window.location.origin).href;
      
      if (linkText.trim() && !editor.state.selection.empty) {
        // If there's selected text, just add the link
        editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
      } else if (linkText.trim()) {
        // If no selection but we have text to insert
        editor.chain().focus().insertContent(`<a href="${normalized}">${linkText}</a>`).run();
      } else {
        // Just add link to selected text or current position
        editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
      }
    } catch (e) {
      // Invalid URL
      editor.chain().focus().unsetLink().run();
    }
    
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
  };

  const handleLinkCancel = () => {
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
    editor.chain().focus().run();
  };

  if (!editor) return null;

  return (
    <div className="rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm bg-white">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        {/* Basic formatting */}
        <div className="flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("bold") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("italic") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("underline") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("strike") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Headings / Paragraph */}
        <div className="flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("paragraph") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Paragraph"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("heading", { level: 1 }) 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("heading", { level: 2 }) 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("heading", { level: 3 }) 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("bulletList") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("orderedList") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("blockquote") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <div className="flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Link */}
        <div className="flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={openLinkModal}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("link") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Remove Link"
          >
            <Unlink className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Highlight & Color */}
        <div className="flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("highlight") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Highlight"
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <div className="relative">
            <input
              type="color"
              title="Text color"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="absolute opacity-0 w-8 h-8 cursor-pointer"
            />
            <div className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800 border cursor-pointer">
              <Palette className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Code Block controls */}
        <div className="flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              editor.isActive("codeBlock") 
                ? "bg-[#334727] text-white shadow-md" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
          <select
            className="max-h-40 overflow-auto px-2 py-1 text-xs rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:border-[#334727] focus:ring-1 focus:ring-[#334727] transition-all duration-200"
            onChange={(e) => setLanguage(e.target.value)}
            defaultValue="javascript"
            title="Select Language"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="kotlin">Kotlin</option>
            <option value="swift">Swift</option>
            <option value="typescript">TypeScript</option>
            <option value="sql">SQL</option>
            <option value="html">HTML/XML</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="shell">Shell</option>
            <option value="bash">Bash</option>
            <option value="dockerfile">Dockerfile</option>
            <option value="yaml">YAML</option>
            <option value="markdown">Markdown</option>
            <option value="perl">Perl</option>
            <option value="r">R</option>
            <option value="scala">Scala</option>
            <option value="objectivec">Objective-C</option>
            <option value="dart">Dart</option>
          </select>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Misc */}
        <div className="flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Horizontal Rule"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <EditorContent editor={editor} />
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 max-w-[90vw] mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Link</h3>
              <button
                onClick={handleLinkCancel}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#334727] focus:border-[#334727] outline-none transition-all"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Text (optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#334727] focus:border-[#334727] outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleLinkCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLinkSubmit}
                className="px-4 py-2 bg-[#334727] text-white rounded-lg hover:bg-[#2a3d20] transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(.ProseMirror) {
          padding: 1rem 1.25rem;
          min-height: 350px;
        }
        :global(.ProseMirror:focus) {
          outline: none;
        }
        :global(.is-editor-empty:first-child::before) {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
          font-style: italic;
        }
        :global(.ProseMirror h1) {
          font-size: 2rem;
          font-weight: bold;
          margin: 1.5rem 0 1rem 0;
          line-height: 1.2;
        }
        :global(.ProseMirror h2) {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.25rem 0 0.75rem 0;
          line-height: 1.3;
        }
        :global(.ProseMirror h3) {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }
        :global(.ProseMirror p) {
          margin: 0.75rem 0;
          line-height: 1;
        }
        :global(pre) {
          background: #111827;
          color: #f9fafb;
          border-radius: 0.75rem;
          padding: 1.25rem;
          overflow-x: auto;
          margin: 1rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        :global(code) {
          background: #f1f5f9;
          color: #e11d48;
          padding: 0.125rem 0.375rem;
          border-radius: 0.375rem;
          font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
          font-size: 0.9em;
        }
        :global(blockquote) {
          border-left: 4px solid #334727;
          background: linear-gradient(to right, #f8fafc, #ffffff);
          padding: 1rem 1.5rem;
          color: #4b5563;
          border-radius: 0 0.75rem 0.75rem 0;
          margin: 1.5rem 0;
          font-style: italic;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        :global(ul), :global(ol) {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        :global(ul) {
          list-style-type: disc;
        }
        :global(ol) {
          list-style-type: decimal;
        }
        :global(ul li), :global(ol li) {
          margin: 0.5rem 0;
          line-height: 1.6;
          display: list-item;
        }
        :global(ul ul) {
          list-style-type: circle;
        }
        :global(ul ul ul) {
          list-style-type: square;
        }
        :global(a) {
          color: #334727;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: all 0.2s;
        }
        :global(a:hover) {
          color: #2a3d20;
          text-decoration-thickness: 2px;
        }
        :global(mark) {
          background: #fef08a;
          padding: 0.1em 0.2em;
          border-radius: 0.25rem;
        }
        :global(hr) {
          border: none;
          height: 2px;
          background: linear-gradient(to right, transparent, #d1d5db, transparent);
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );

}
