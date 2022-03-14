var ImageKit = require("imagekit");

export const promise = {
    imageKit: null,
    async getImageKit (callbacks) {
        if (this.imageKit) {
            return this.imageKit
        }

        console.log('ImageKit')

        this.imageKit = await new ImageKit({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        });

        return this.imageKit

        // return Promise.all(callbacks).catch((err) => {
        //     this.ready = false
        //     log.error('On mount promise failed', err)
        //     throw err
        // })
    },
    reset () {
        this.imageKit = null
    }
}
