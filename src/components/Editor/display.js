import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ExampleTheme from './themes/ExampleTheme';

import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import './styles.css';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const loadContent = () => {
  // 'empty' editor
  const value = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Title 1',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'heading',
          version: 1,
          tag: 'h1',
        },
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Here are some paragraphs.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 1,
              mode: 'normal',
              style: '',
              text: 'Here are some paragraphs.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 2,
              mode: 'normal',
              style: '',
              text: 'Here are some paragraphs.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 8,
              mode: 'normal',
              style: '',
              text: 'Here are some paragraphs.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 4,
              mode: 'normal',
              style: '',
              text: 'Here are some paragraphs.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 16,
              mode: 'normal',
              style: '',
              text: 'Here are some paragraphs.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
        {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Here are some paragraphs.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'link',
              version: 1,
              rel: 'noopener',
              target: null,
              url: 'https://',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Here is a quote',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'quote',
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'const',
              type: 'code-highlight',
              version: 1,
              highlightType: 'keyword',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' ',
              type: 'code-highlight',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'helloWord',
              type: 'code-highlight',
              version: 1,
              highlightType: 'function-variable',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' ',
              type: 'code-highlight',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '=',
              type: 'code-highlight',
              version: 1,
              highlightType: 'operator',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' ',
              type: 'code-highlight',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '(',
              type: 'code-highlight',
              version: 1,
              highlightType: 'punctuation',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ')',
              type: 'code-highlight',
              version: 1,
              highlightType: 'punctuation',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' ',
              type: 'code-highlight',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '=>',
              type: 'code-highlight',
              version: 1,
              highlightType: 'operator',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' ',
              type: 'code-highlight',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '{',
              type: 'code-highlight',
              version: 1,
              highlightType: 'punctuation',
            },
            { type: 'linebreak', version: 1 },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '  ',
              type: 'code-highlight',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'console',
              type: 'code-highlight',
              version: 1,
              highlightType: 'builtin',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '.',
              type: 'code-highlight',
              version: 1,
              highlightType: 'punctuation',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'info',
              type: 'code-highlight',
              version: 1,
              highlightType: 'function',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '(',
              type: 'code-highlight',
              version: 1,
              highlightType: 'punctuation',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: "'Hello World'",
              type: 'code-highlight',
              version: 1,
              highlightType: 'string',
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ')',
              type: 'code-highlight',
              version: 1,
              highlightType: 'punctuation',
            },
            { type: 'linebreak', version: 1 },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '}',
              type: 'code-highlight',
              version: 1,
              highlightType: 'punctuation',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'code',
          version: 1,
          language: 'typescript',
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };

  return JSON.stringify(value);
};

const initialEditorState = loadContent();

const editorConfig = {
  editorState: initialEditorState,
  editable: false,
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    // console.log(editor);
    editor.focus();
  }, [editor]);

  return null;
}

export default function Editor({ onChange }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container" style={{ border: 'none' }}>
        {/* <ToolbarPlugin /> */}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
          <OnChangePlugin onChange={onChange} />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
