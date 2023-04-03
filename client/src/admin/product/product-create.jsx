import { useCallback } from 'react';
import { Create, SimpleForm, useRedirect, useNotify, useCreate } from 'react-admin';
import { ProductForm } from './product-form';
import { handlePhotoUploads } from '../handle-photo-uploads';

export const ProductCreate = () => {
    const redirect = useRedirect();
    const notify = useNotify();
    const [create] = useCreate();

    const save = useCallback(
        async values => {
            try {
                values.ProductPhotos = await handlePhotoUploads(values.ProductPhotos)

                const createdProduct = await create(
                    'products',
                    { data: values },
                    { returnPromise: true }
                );
                notify('ra.notification.created', {
                    type: 'info',
                    messageArgs: { smart_count: 1 }
                });
                redirect('list', 'products', createdProduct.id);
            } catch (error) {
                if (error.status === 400 && !error.body.validationError) {
                    return error.body;
                }

                if (error.status === 400 && error.body.validationError) {
                    return notify('Error validating data', {
                        type: 'error'
                    });
                }

                return notify('Unknow error', {
                    type: 'error'
                });
            }
        },
        [create, notify, redirect]
    );

    return (
        <Create>
            <SimpleForm onSubmit={save}>
                <ProductForm />
            </SimpleForm>
        </Create>
    );
}
