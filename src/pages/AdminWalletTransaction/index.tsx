import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import TitleHeading from '@/components/TitleHeading';
import { useLoaderData } from 'react-router-dom';
import type { WalletTransaction } from '@/services/customer/customer.type';

export default function AdminWalletTransaction() {
  const transactions = useLoaderData() as WalletTransaction[]

  return (
    <>
      <TitleHeading title='List Wallet Transaction' />
      <div>
        <DataTable columns={columns} data={transactions} />
      </div>
    </>
  );
}
