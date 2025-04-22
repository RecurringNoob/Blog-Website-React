import React, { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import SunEditor from 'suneditor'; // Import SunEditor
import 'suneditor/dist/css/suneditor.min.css'; // Import SunEditor styles
import plugins from 'suneditor/src/plugins'


export default function RTE({ name, control, label, defaultValue = "" }) {
  const editorRef = useRef(null);

  // Initialize SunEditor on mount
  useEffect(() => {
    if (editorRef.current) {
      const editor = SunEditor.create(editorRef.current, {
        height: 500, 
        plugins: plugins,// Editor height
       /* buttonList: [
          ['undo', 'redo'],
          ['bold', 'italic', 'underline', 'strike'],
          ['fontSize', 'fontColor', 'hiliteColor'],
          ['align', 'list', 'outdent', 'indent'],
          ['link', 'image', 'video'],
          ['blockquote', 'codeView', 'preview'],
          [ 'horizontalRule'],
          ['fullScreen', 'showBlocks'],
          ['removeFormat', 'help'],
        ],*/
        defaultStyle: 'font-family:Helvetica, Arial, sans-serif; font-size:14px;', // Default styling
      });

      // Set the value of the editor if it is controlled
      editor.setContents(defaultValue);
      
      // Cleanup on unmount
      return () => {
        if (editor) {
          editor.destroy();
        }
      };
    }
  }, [defaultValue]); // Reinitialize if defaultValue changes

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <div
              ref={editorRef}
              onBlur={() => {
                if (editorRef.current) {
                  // On blur, update the value in react-hook-form
                  onChange(editorRef.current.editor.getContents());
                }
              }}
              onInput={() => {
                if (editorRef.current) {
                  onChange(editorRef.current.editor.getContents());
                }
              }}
            ></div>
          </div>
        )}
      />
    </div>
  );
}
