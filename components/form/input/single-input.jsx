import React, { useState, useCallback } from 'react'
import { useFormikContext }  from 'formik'
import {
    Box,
    Input,
    Button
} from '@mui/material'

import { PreviewGallery } from "../../preview-gallery";
import { uploadImg } from "../../../pages/utils/upload-img";

export const SingleUploadInput = ({
    name,
    className,
    setFieldValue,
    required
}) => {

    const [preview, setPreview] = useState(null)

    const addToGallery = (img) => {
        setPreview(prevState => [
            img
        ])
    }

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
            <label htmlFor="contained-button-file">
                <Input sx={` display: none; `} onChange={handleChange} required={required} name={name} accept="image/*" id="contained-button-file" type="file" />
                <Button variant="outlined" component="span">
                    Загрузить главное фото
                </Button>
            </label>
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
