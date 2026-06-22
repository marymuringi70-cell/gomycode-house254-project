import { cloudinary } from '../config/cloudinary.js'

export async function uploadBufferToCloudinary(buffer: Buffer, folder = 'house254') {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error: Error | undefined, result: { secure_url?: string } | undefined) => {
        if (error) {
          reject(error)
          return
        }

        if (!result?.secure_url) {
          reject(new Error('Cloudinary upload failed'))
          return
        }

        resolve(result.secure_url)
      },
    )

    uploadStream.end(buffer)
  })
}