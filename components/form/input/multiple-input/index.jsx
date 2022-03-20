import React, {useState, useCallback, useEffect} from 'react'
import { useFormikContext }  from 'formik'
import {
    Box,
    Input,
    Button
} from '@mui/material'

import { uploadImg } from '../../../../pages/utils/upload-img'

import { PreviewGallery } from '../../../preview-gallery'

export const MultipleUploadInput = ({
    name,
    className,
    setFieldValue
}) => {

    const [multiplePreview, setMultiplePreview] = useState([])

    const addToGallery = (img) => {
        setMultiplePreview(prevState => [
            ...prevState,
            img
        ])
    }

    const handleChange = useCallback (async (event) => {
        const currentTargetFile =  event.currentTarget.files
        setFieldValue(name, currentTargetFile)
        await uploadImg({
            name: 'image_urls',
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
            <label htmlFor="contained-button-file-multiple">
                <Input
                    sx={` display: none; `}
                    onChange={handleChange}
                    name={name}
                    accept="image/*"
                    id="contained-button-file-multiple"
                    type="file"
                    inputProps={{ multiple: true }}
                />
                <Button variant="outlined" component="span">
                    Загрузить дополнительные фотографии
                </Button>
            </label>
            {
                multiplePreview?.length &&
                <PreviewGallery imagesSrc={multiplePreview} />
            }
        </Box>
    )
}
