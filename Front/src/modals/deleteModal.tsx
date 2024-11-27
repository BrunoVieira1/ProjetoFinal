import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Api } from '@/api';

interface deleteProps {
  id: number;
  location: string;
}

function DeleteModal({id, location} : deleteProps) {
  function deleteFuction() {
    Api.delete(`/${location}`, {
      data: {
        id: id,
      },
    });
    alert("Deletado com sucesso")
  }
  return (
    <AlertDialog>
  <AlertDialogTrigger className='bg-red-700 p-2 px-3 text-white font-semibold rounded-sm'>Excluir</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Você tem certeza? </AlertDialogTitle>
      <AlertDialogDescription>
        Você tem certeza que deseja excluir esse item? 
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={() => deleteFuction()}>Excluir</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteModal