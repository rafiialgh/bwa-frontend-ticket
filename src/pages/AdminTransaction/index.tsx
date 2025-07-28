import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import TitleHeading from '@/components/TitleHeading';
import { useLoaderData } from 'react-router-dom';
import type { Transaction } from '@/services/customer/customer.type';

export default function AdminTransaction() {
  const transactions = useLoaderData() as Transaction[]

  return (
    <>
      <TitleHeading title='List Transaction' />
      <div>
        <DataTable columns={columns} data={transactions} />
      </div>
    </>
  );
}
