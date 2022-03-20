import React, { useState } from 'react'
import * as yup from 'yup'

import {
    TextField,
    Container,
    Box,
    Button,
    Checkbox,
    FormControlLabel
} from '@mui/material'
import { Formik, Field, useFormik, FormikProvider } from 'formik'
import { Map, Placemark } from "react-yandex-maps";

import { SingleUploadInput, MultipleUploadInput } from '../components/form/input'
import responseImages from '../_fixture/upload.json'

const validationSchema = yup.object({
    title: yup
        .string('Enter your title')
        .required('title is required'),
    long_description: yup
        .string('Enter your long_description')
        .required('long_description is required'),
    alias: yup
        .string()
        .required('alias is required')
});

export default () => {
    const [coordinates, setCoordinates] = useState([])
    const formik = useFormik({
        initialValues: {
            title: 'Объектос',
            short_description: 'kekes',
            long_description: 'This is long description',
            alias: 'objectos',
            has_children: false,
            image_urls: [],
            lat: 0,
            long: 0
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const {
                main_image_url,
                image_urls,
                ...rest
            } = values

            if (values?.main_image_url) {
                const formData = new FormData();
                await formData.append('main_image_url', values.main_image_url[0])
                formData.append('alias', values.alias)

                for (const file of values.image_urls) {
                    formData.append('image_urls', file)
                }

                let imagesUrl
                // if (process.env.NODE_ENV === 'development') {
                //     imagesUrl = responseImages
                // } else {
                    imagesUrl = await fetch('/api/files/upload', {
                        method: 'POST',
                        body: formData
                    }).then(r => r.json())
                // }

                console.log({
                    newValues: {...imagesUrl, ...rest},
                    values
                })
            }
        }
    })

    return (
        <div>
            <Map
                defaultState={{ center: [55.75, 37.57], zoom: 15 }}
                width="100%"
                onClick={(e) => {
                    const [lat, long] = e.get('coords')
                    formik.setFieldValue('lat', lat)
                    formik.setFieldValue('long', long)
                    setCoordinates(e.get('coords'))
                }}
            >
                {coordinates && (<Placemark geometry={coordinates} />)}
            </Map>
            <Container sx={{
                width: '600px'
            }}>
                <form onSubmit={formik.handleSubmit}>
                    <Box paddingY="10px">
                        <TextField
                            inputProps={{
                                readOnly: true
                            }}
                            name="lat"
                            id="lat"
                            label="lat"
                            value={formik.values.lat}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            inputProps={{
                                readOnly: true
                            }}
                            name="long"
                            id="long"
                            label="long"
                            value={formik.values.long}
                            onChange={formik.handleChange}
                        />
                    </Box>

                    <Box paddingY="10px">
                        <TextField
                            fullWidth
                            required={true}
                            name="title"
                            id="title"
                            label="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                    </Box>

                    <Box paddingY="10px">
                        <TextField
                            fullWidth
                            name="short_description"
                            id="short_description"
                            label="short_description"
                            value={formik.values.short_description}
                            onChange={formik.handleChange}
                            error={formik.touched.short_description && Boolean(formik.errors.short_description)}
                            helperText={formik.touched.short_description && formik.errors.short_description}
                        />
                    </Box>

                    <Box paddingY="10px">
                        <TextField
                            fullWidth
                            multiline
                            name="long_description"
                            id="long_description"
                            label="long_description"
                            rows={6}
                            value={formik.values.long_description}
                            onChange={formik.handleChange}
                            error={formik.touched.long_description && Boolean(formik.errors.long_description)}
                            helperText={formik.touched.long_description && formik.errors.long_description}
                        />
                    </Box>

                    <Box paddingY="10px">
                        <TextField
                            fullWidth
                            name="object_alias"
                            id="object_alias"
                            label="object_alias"
                            value={formik.values.alias}
                            onChange={formik.handleChange}
                            error={formik.touched.alias && Boolean(formik.errors.alias)}
                            helperText={formik.touched.alias && formik.errors.alias}
                        />
                    </Box>

                    <Box paddingY="10px">
                        <FormControlLabel control={
                            <Checkbox
                                name="has_children"
                                value={formik.values.has_children}
                                onChange={formik.handleChange}
                            />
                        } label="has_children" />
                    </Box>

                    <SingleUploadInput
                        name="main_image_url"
                        setFieldValue={formik.setFieldValue}
                        required
                    />

                    <MultipleUploadInput
                        setFieldValue={formik.setFieldValue}
                        name="image_urls"
                    />

                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    );
}
