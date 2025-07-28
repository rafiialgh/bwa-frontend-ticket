import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import TitleHeading from '@/components/TitleHeading';
import { useLoaderData } from 'react-router-dom';
import type { User } from '@/services/customer/customer.type';

export default function AdminCustomer() {
  const customers = useLoaderData() as User[]

  return (
    <>
      <TitleHeading title='List Genre' />
      <div>
        <DataTable columns={columns} data={customers} />
      </div>
    </>
  );
}
