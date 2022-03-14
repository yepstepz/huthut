import axios from 'axios'

export const uploadImg = async ({ name, value, multiple = false }) => {
    const formData = new FormData(); // Currently empty

    for (const file of value) {
        formData.append(name, file)
    }

    const config = {
        onUploadProgress: (event) => {
            console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
    }

    return await axios.post(`/api/files/preview?name=${name}`, formData, config)
}
