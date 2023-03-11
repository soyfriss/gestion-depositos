import { Admin, Resource } from 'react-admin';
import { dataProvider } from './data-provider';
import { CategoryList } from './category/category-list';
import { CategoryEdit } from './category/category-edit';
import { CategoryCreate } from './category/category-create';

function App() {
    return <>
        <Admin dataProvider={dataProvider}>
            <Resource
                name='categories'
                list={CategoryList}
                edit={CategoryEdit}
                create={CategoryCreate}
                recordRepresentation='name'
            />
        </Admin>
    </>
}

export default App;
