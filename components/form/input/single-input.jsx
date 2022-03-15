import React, { useState, useCallback } from 'react'
import { useFormikContext }  from 'formik'
import { Box } from 'theme-ui'
import {PreviewGallery} from "../../preview-gallery";
import {uploadImg} from "../../../pages/utils/upload-img";

export const SingleUploadInput = ({
    name,
    className
}) => {

    const [preview, setPreview] = useState(null)

    const addToGallery = (img) => {
        setPreview(prevState => [
            img
        ])
    }

    const { setFieldValue } = useFormikContext() ?? {}

    const handleChange = useCallback (async (event) => {
        const currentTargetFile =  event.currentTarget.files
        setFieldValue(name, currentTargetFile)
        await uploadImg({
            name,
            value: currentTargetFile
        })

        Object.values(currentTargetFile).map((file) => {
            addToGallery({
                src: `/tmp/${file.name}`,
                width: 300
            })
        })
    }, [name])


    return (
        <Box my="8px" className={className}>
            <input
                name={name}
                type="file"
                onChange={handleChange}
            />
            {
                preview?.length &&
                <PreviewGallery
                    imagesSrc={preview}
                    multiple={false}
                />
            }
        </Box>
    )
}
