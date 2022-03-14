import ImageKit from "imagekit";
import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import { fromString } from 'uuidv4'
import path from 'path'

import { promise } from '../../../server/image-kit'

export const config = {
    api: {
        bodyParser: false,
    },
};

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export default async (req, res) => {
    const kit = await promise.getImageKit()
    const authParams = await kit.getAuthenticationParameters()

    try {
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm();

            form.encoding = "base64";

            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                console.log({ fields, files })
                resolve({ fields, files });
            });
        });
        console.log(data)
        const contents = await fs.readFile(data.files.main_image_url.filepath, {
            encoding: "base64",
        });

        const result = await imagekit.upload({
            file: contents,
            folder: data.fields.alias,
            fileName: fromString(data.files.main_image_url.originalFilename) + path.extname(data.files.main_image_url.originalFilename),
        });

        console.log(result)
        if (result) {
            const url = imagekit.url({
                src: result.url,
                transformation: [
                    {
                        height: "512",
                        width: "512",
                    },
                ],
            });
            res.status(200).json({
                url,
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ statusCode: 500, message: err });
    }
};
