import {
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
    Slider,
    Box,
    Flex,
    Button,
    Container
} from 'theme-ui'
import { useFormik, Formik } from 'formik';
import axios from 'axios'
import { useState } from 'react'

import { FileUploadInput } from '../components/form/input'

export default () => {
    const [mainImagePreview, setMainImagePreview] = useState(null)
    const [sliderImagesPreview, setSliderImagesPreview] = useState(null)

    // const formik = useFormik({
    //     initialValues: {
    //         title: 'Объектос',
    //         owner_alias: 'admin',
    //         short_description: 'Не так плох',
    //         long_description: 'Могло быть и хуже',
    //         object_alias: 'objectos',
    //         has_children: false,
    //         main_image_url: '',
    //         slider_image_urls: []
    //     },
    //     onSubmit: async (values) => {
    //         if (values?.main_image_url) {
    //             console.log(values)
    //             var formData = new FormData(); // Currently empty
    //             formData.append('main_image_url', values.main_image_url);
    //             const config = {

    //                 onUploadProgress: (event) => {
    //                     console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    //                 },
    //             };
                
    //             const response = await axios.post('/api/uploads', formData, config);

    //             console.log('response', response.data);
    //         }
    //         console.log(values)
    //     }
    // })

    return (
        <Formik
            initialValues={{
                title: 'Объектос',
                owner_alias: 'admin',
                short_description: 'Не так плох',
                long_description: 'Могло быть и хуже',
                object_alias: 'objectos',
                has_children: false,
                main_image_url: '',
                slider_image_urls: []
            }}
            onSubmit={async (values) => {
                if (values?.main_image_url) {
                    console.log(values)
                    var formData = new FormData(); // Currently empty
                    formData.append('main_image_url', values.main_image_url);
                    const config = {
    
                        onUploadProgress: (event) => {
                            console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
                        },
                    };
                    
                    const response = await axios.post('/api/uploads', formData, config);
    
                    console.log('response', response.data);
                }
                console.log(values)
            }
            }
        >
            {(formik) => (
            <Container as="main" p={5}>
                <Box as="form" method="post" enctype="multipart/form-data" onSubmit={formik.handleSubmit}>
                    <Label htmlFor="title">Название объекта</Label>
                    <Input
                        required={true}
                        name="title"
                        id="title"
                        mb={3}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />

                    <Label htmlFor="short_description">short_description</Label>
                    <Textarea
                        name="short_description"
                        id="short_description"
                        rows={6}
                        mb={3}
                        value={formik.values.short_description}
                        onChange={formik.handleChange}
                    />

                    <Label htmlFor="long_description">long_description</Label>
                    <Textarea
                        name="long_description"
                        id="short_description"
                        rows={6}
                        mb={3}
                        value={formik.values.long_description}
                        onChange={formik.handleChange}
                    />

                    <Label htmlFor="object_alias">object_alias</Label>
                    <Input
                        name="object_alias"
                        id="object_alias"
                        mb={3}
                        value={formik.values.object_alias}
                        onChange={formik.handleChange}
                    />

                    <Box>
                        <Label mb={3}>
                            <Checkbox
                                name="has_children"
                                value={formik.values.has_children}
                                onChange={formik.handleChange}
                            />
                                has_children
                            </Label>
                    </Box>

                    {/* <Box my="8px">
                        {
                            mainImagePreview &&
                            <img src={mainImagePreview.file} />
                        }
                        <input
                            name="main_image_url"
                            type="file"
                            onChange={async (event) => {
                                console.log(event.currentTarget.files)
                                formik.setFieldValue("main_image_url", event.currentTarget.files[0]);

                                let reader = new FileReader();
                                let file = event.currentTarget.files[0];
                                reader.onloadend = () => {
                                    setMainImagePreview({
                                        file: reader.result
                                    });
                                };
                                reader.readAsDataURL(file);
                            }}
                        ></input>
                    </Box> */}

                    <FileUploadInput
                        name="main_image_url"
                    />

                    <FileUploadInput
                        name="image_urls"
                        multiple
                    />

                    <Button>Submit</Button>
                </Box>
            </Container>
            )}
        </Formik> 
    )

}