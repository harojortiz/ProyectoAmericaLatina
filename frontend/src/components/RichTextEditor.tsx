'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { useMemo } from 'react';

// Importación dinámica para evitar errores de SSR (document is not defined)
const ReactQuill = dynamic(async () => {
    const { default: RQ } = await import('react-quill-new');
    const Component = ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
    Component.displayName = 'ReactQuill';
    return Component;
}, { ssr: false });

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
                className="h-64 mb-12 bg-white rounded-lg"
            />
            <style jsx global>{`
                .ql-toolbar {
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                    background-color: #f8fafc;
                }
                .ql-container {
                    border-bottom-left-radius: 0.75rem;
                    border-bottom-right-radius: 0.75rem;
                    background-color: white;
                    font-family: inherit;
                    min-height: 200px;
                }
                .ql-editor {
                    min-height: 200px;
                    font-size: 1rem;
                    line-height: 1.6;
                }
            `}</style>
        </div>
    );
}
