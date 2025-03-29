import {Cloudinary} from '@cloudinary/url-gen';

export const cld = new Cloudinary({
    cloud: {
        cloudName:process.env.EXPO_PUBLIC_CLOUD_NAME,
        apiKey:process.env.EXPO_PUBLIC_CLOUD_APIKEY,
        apiSecret:process.env.EXPO_PUBLIC_CLOUD_APISECRET,
    },
    url: {
        secure: true,
    },
})   

export const options = {
    upload_preset:"incampus",
    tag:"sample",
    unsigned:true,
}