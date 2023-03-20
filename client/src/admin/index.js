import { Admin, Resource } from 'react-admin';
import { dataProvider } from './data-provider';
import { CategoryList } from './category/category-list';
import { CategoryEdit } from './category/category-edit';
import { CategoryCreate } from './category/category-create';
import { EmployeeList } from './employee/employee-list';

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

            <Resource
                name='employees'
                list={EmployeeList}
                recordRepresentation='filenumber'
            />
        </Admin>
    </>
}

export default App;
