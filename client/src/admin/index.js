import { Admin, Resource } from 'react-admin';
import { dataProvider } from './data-provider';
import { CategoryList } from './category/category-list';
import { CategoryEdit } from './category/category-edit';
import { CategoryCreate } from './category/category-create';
import { EmployeeList } from './employee/employee-list';
import { EmployeeEdit } from './employee/employee-edit';
import { EmployeeCreate } from './employee/employee-create';

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
                edit={EmployeeEdit}
                create={EmployeeCreate}
                recordRepresentation='filenumber'
            />
        </Admin>
    </>
}

export default App;
