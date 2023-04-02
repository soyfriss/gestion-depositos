import { Admin, Resource } from 'react-admin';
import { dataProvider } from './data-provider';
import { CategoryList } from './category/category-list';
import { CategoryEdit } from './category/category-edit';
import { CategoryCreate } from './category/category-create';
import { EmployeeList } from './employee/employee-list';
import { EmployeeEdit } from './employee/employee-edit';
import { EmployeeCreate } from './employee/employee-create';
import { ProductList } from './product/product-list';
import { ProductCreate } from './product/product-create';
import { ProductEdit } from './product/product-edit';
import { UserList } from './user/user-list';
import { UserCreate } from './user/user-create';
import { UserEdit } from './user/user-edit';
import { DeliveryNoteList } from './delivery-note/delivery-note-list';
import { DeliveryNoteCreate } from './delivery-note/delivery-note-create';

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
            <Resource
                name='products'
                list={ProductList}
                create={ProductCreate}
                edit={ProductEdit}
                recordRepresentation='name'
            />
            <Resource
                name='users'
                list={UserList}
                create={UserCreate}
                edit={UserEdit}
                recordRepresentation='username'
            />
            <Resource
                name='delivery-notes'
                list={DeliveryNoteList}
                create={DeliveryNoteCreate}
                recordRepresentation={(record) => `N° ${record.documentNumber}`}
                options={{ label: 'Delivery Notes' }}
            />
        </Admin>
    </>
}

export default App;
