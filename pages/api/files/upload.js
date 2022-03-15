import ImageKit from 'imagekit'
import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import { fromString } from 'uuidv4'
import path from 'path'

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
    const files = []
    const fields = {}
    new IncomingForm().parse(req)
        .on('file', async (name, file) => {
            files.push({
                name,
                file
            })
        })
        .on('field', function(name, field) {
            fields[name] = field
        })
        .on('error', function(err) {
            next(err);
        })
        .on('end', async () => {

            const loadedImages = []
            for (const image of files) {
                const {
                    name,
                    file
                } = image

                const contents = await fs.readFile(file.filepath, {
                    encoding: "base64",
                })

                const result = await imagekit.upload({
                    file: contents,
                    folder: fields.alias,
                    fileName: fromString(file.originalFilename) + path.extname(file.originalFilename),
                })

                loadedImages.push({
                    name,
                    id: result.fileId,
                    url: result.url,
                    width: result.width,
                    height: result.height,
                    thumbnail: result.thumbnailUrl
                })
            }

            const mainImageInfo = loadedImages
                .find((image) => image.name === 'main_image_url')


            const imageUrls = loadedImages
                .filter((image) => image.name === 'image_urls')
                .map(({ name, ...rest}) => ({
                    ...rest
                }))

            res.status(200).json({
                main_image_url: mainImageInfo,
                image_urls: imageUrls
            });

        });
};
