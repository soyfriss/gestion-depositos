import { Admin, Resource } from 'react-admin';
import { dataProvider } from './data-provider';
import authProvider from './authProvider';
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
import { DeliveryNoteEdit } from './delivery-note/delivery-note-edit';
import { SupplierList } from './supplier/supplier-list';
import { SupplierCreate } from './supplier/supplier-create';
import { SupplierEdit } from './supplier/supplier-edit';
import { PurchaseReceiptList } from './purchase-receipt/purchase-receipt-list';
import { PurchaseReceiptCreate } from './purchase-receipt/purchase-receipt-create';
import { PurchaseReceiptEdit } from './purchase-receipt/purchase-receipt-edit';
// import { TicketList } from './ticket/ticket-list';
import { ProfileLayout } from './layout/layout';
import { ProfileEdit } from './profile/profile-edit';
import { InventoryCountList } from './inventory-count/inventory-count-list';
import { InventoryCountCreate } from './inventory-count/inventory-count-create';

function App() {
    return <>
        <Admin layout={ProfileLayout} dataProvider={dataProvider} authProvider={authProvider}>
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
                recordRepresentation={(record) => `- ${record.firstname} ${record.lastname}`}
            />
            <Resource
                name='suppliers'
                list={SupplierList}
                edit={SupplierEdit}
                create={SupplierCreate}
                recordRepresentation='name'
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
                recordRepresentation={(record) => `- ${record.username}`}
            />
            <Resource
                name='delivery-notes'
                list={DeliveryNoteList}
                create={DeliveryNoteCreate}
                edit={DeliveryNoteEdit}
                recordRepresentation={(record) => `N° ${record.documentNumber}`}
            />
            <Resource
                name='purchase-receipts'
                list={PurchaseReceiptList}
                create={PurchaseReceiptCreate}
                edit={PurchaseReceiptEdit}
                recordRepresentation={(record) => `N° ${record.documentNumber}`}
            />
            <Resource
                name='profile'
                edit={ProfileEdit}
            />
            <Resource
                name='inventory-counts'
                list={InventoryCountList}
                create={InventoryCountCreate}
            />
        </Admin>
    </>
}

export default App;
