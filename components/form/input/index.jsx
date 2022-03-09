import React, { useState } from 'react'
import { useFormikContext }  from 'formik'
import { Box } from 'theme-ui'

export const FileUploadInput = ({
    multiple,
    name,
    className
}) => {

    const [preview, setPreview] = useState(null)
    const [multiplePreview, setMultiplePreview] = useState(null)

    const { setFieldValue } = useFormikContext() ?? {}

    return (
        <Box my="8px" className={className}>
            {
                preview &&
                <img src={preview.file} />
            }
            <input
                name={name}
                type="file"
                multiple={multiple}
                onChange={async (event) => {
                    const currentTargetFile =  event.currentTarget.files[0]
                    console.log(event.currentTarget.files)
                    setFieldValue(name, currentTargetFile)

                    let reader = new FileReader()
                    let file = event.currentTarget.files[0]
                    reader.onloadend = (readerEvent) => {
                        var image = new Image();
                        image.src = readerEvent.target.result;
                        image.onload = function () {
                          console.log(`width : ${image.width} px`, `height: ${image.height} px`);
                        };
                        setPreview({
                            file: reader.result
                        })
                    }
                    reader.readAsDataURL(file);
                }}
            />
        </Box>
    )
}