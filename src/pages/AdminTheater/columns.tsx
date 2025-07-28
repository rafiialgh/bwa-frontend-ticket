import { Badge } from '@/components/ui/badge';
import type { Theater } from '@/services/theater/theater.type';
import type { ColumnDef } from '@tanstack/react-table';
import ActionColumns from './ActionColumns';


export const columns: ColumnDef<Theater>[] = [
  {
    accessorKey: 'name',
    header: 'Theater',
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: ({ row }) => <Badge>{row.original.city}</Badge>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const theater = row.original;

      return <ActionColumns id={theater._id} />;
    },
  },
];
