const { ProductPhoto } = require('../../db');
const saveImage = require('../../utils/save-image');
const deleteImage = require('../../utils/delete-image');

const updatePhotos = async (product, photos, transaction) => {

    const productPhotos = await product.getProductPhotos({ transaction });

    const excludePhotosFromRemoval = [];
    if (photos && photos.length > 0) {

        for (const photo of photos) {

            if (photo.base64String) {
                // Save new photo
                const newPhoto = await ProductPhoto.create({
                    productId: product.id,
                    path: photo.title
                }, { transaction });

                // Save photo
                await newPhoto.update({
                    path: saveImage(photo.base64String, `${newPhoto.id}-${product.id}`)
                }, { transaction });
            } else {
                excludePhotosFromRemoval.push(Number(photo.title.split('-')[0]))
            }
        }
    }

    // Delete old photos
    const photosToRemove = productPhotos.filter(p => !excludePhotosFromRemoval.includes(p.id));
    if (photosToRemove.length) {
        await product.removeProductPhotos(photosToRemove.map(p => p.id), { transaction });
        // Delete files
        photosToRemove.forEach(photo => deleteImage(photo.path));
    }

}

module.exports = updatePhotos;
