import React, {useState, useCallback, useEffect} from 'react'
import { useFormikContext }  from 'formik'
import { Box } from 'theme-ui'

import { uploadImg } from '../../../../pages/utils/upload-img'

import { PreviewGallery } from '../../../preview-gallery'

export const MultipleUploadInput = ({
    name,
    className
}) => {

    const [multiplePreview, setMultiplePreview] = useState([])

    const addToGallery = (img) => {
        setMultiplePreview(prevState => [
            ...prevState,
            img
        ])
    }

    const { setFieldValue } = useFormikContext() ?? {}

    const handleChange = useCallback (async (event) => {
        const currentTargetFile =  event.currentTarget.files
        setFieldValue(name, currentTargetFile)
        await uploadImg({
            name: 'image_urls',
            value: currentTargetFile
        })

        Object.values(currentTargetFile).map((file) => {
            console.log(file.name)
            addToGallery({
                src: `/tmp/${file.name}`,
                width: 300
            })
        })
    }, [name])

    useEffect(() => {
        console.log('multiplePreview', multiplePreview)
    },[multiplePreview])


    return (
        <Box my="8px" className={className}>
            <input
                name={name}
                type="file"
                multiple
                onChange={handleChange}
            />
            {
                multiplePreview?.length &&
                <PreviewGallery imagesSrc={multiplePreview} />
            }
        </Box>
    )
}
