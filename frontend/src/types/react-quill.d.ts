declare module 'react-quill-new' {
    import React from 'react';
    export interface ReactQuillProps {
        theme?: string;
        modules?: any;
        formats?: string[];
        value?: string;
        children?: React.ReactNode;
        onChange?: (content: string, delta: any, source: string, editor: any) => void;
        placeholder?: string;
        className?: string;
        [key: string]: any;
    }
    export default class ReactQuill extends React.Component<ReactQuillProps> { }
}
