import { Button } from '@/components/ui/button';
import { deleteTheater } from '@/services/theater/theater.service';
import { useMutation } from '@tanstack/react-query';
import { Edit, Trash } from 'lucide-react';
import React from 'react';
import { Link, useRevalidator } from 'react-router-dom';
import { toast } from 'sonner';

interface ActionColumnProps {
  id: string;
}

export default function ActionColumns({ id }: ActionColumnProps) {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteTheater(id),
  });

  const revalidator = useRevalidator();

  const handleDelete = async () => {
    try {
      await mutateAsync();

      revalidator.revalidate();
      toast.success('Data successfully deleted');
    } catch (error) {
      console.log(error);
      toast.success('Something went wrong');
    }
  };
  return (
    <div className='inline-flex items-center gap-4 p-5'>
      <Button size='sm' variant='secondary' asChild>
        <Link to={`/admin/theaters/edit/${id}`}>
          <Edit className='w-4 h-4 mr-2' />
          Edit
        </Link>
      </Button>
      <Button
        isLoading={isPending}
        onClick={handleDelete}
        size='sm'
        variant={'destructive'}
      >
        <Trash className='w-4 h-4 mr-2' />
        Delete
      </Button>
    </div>
  );
}
