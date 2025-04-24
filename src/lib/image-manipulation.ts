/**
 * Retrieves the dimensions (width and height) of an image file.
 * @param file - The image file.
 * @returns A promise that resolves with an object containing the width and height of the image.
 */
export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (!event.target) {
        reject(new Error("Error while trying to read image"))
        return
      }

      const img = new Image()
      img.src = event.target.result as string
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => {
        reject(new Error("Error while loading image"))
      }
    }
    reader.onerror = () => {
      reject(new Error("Error while trying to read image"))
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Resizes and crops an image to a square format.
 * @param file - The image file to resize and crop.
 * @param name - The name of the image file.
 * @param size - The size of the square image.
 * @param avatarExtension - The extension of the image file.
 * @returns A promise that resolves with the resized and cropped image file.
 */
export async function resizeAndCropImage(
  file: File,
  name: string,
  size: number,
  avatarExtension: string
): Promise<File> {
  const image = await loadImage(file)

  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size

  const ctx = canvas.getContext("2d")

  const minEdge = Math.min(image.width, image.height)

  const sx = (image.width - minEdge) / 2
  const sy = (image.height - minEdge) / 2
  const sWidth = minEdge
  const sHeight = minEdge

  ctx?.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, size, size)

  const resizedImageBlob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, `image/${avatarExtension}`)
  )

  return new File(
    [resizedImageBlob as BlobPart],
    `${name}.${avatarExtension}`,
    {
      type: `image/${avatarExtension}`,
    }
  )
}

/**
 * Loads an image from a file and returns a promise that resolves with the image element.
 * @param file - The image file to load.
 * @returns A promise that resolves with the image element.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      image.src = e.target?.result as string
    }
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Failed to load image"))

    reader.readAsDataURL(file)
  })
}
