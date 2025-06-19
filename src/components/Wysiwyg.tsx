import {memo} from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface IWysiwygProps {
    id: string,
    editorData?: string,
    setEditorData: (data: string) => void
}

function Wysiwyg({id, editorData, setEditorData}: IWysiwygProps) {

    console.log(editorData)

    return (
        <div className="wysiwyg">
            <CKEditor
                id={id}
                editor={ClassicEditor}
                config={{
                    toolbar: [
                        'undo', 'redo', '|',
                        'heading',  '|',
                        {
                            label: 'Basic styles',
                            icon: 'text',
                            items: [ 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code' ]
                        }, '|',
                        'link', 'insertTable', 'mediaEmbed', '|',
                        'bulletedList', 'numberedList', 'indent', 'outdent'
                    ]
                }}
                data={editorData}
                onChange={(event, editor) => {
                    setEditorData(data);
                }}
            />
        </div>
    );
}

export default memo(Wysiwyg);