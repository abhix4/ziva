import { Pencil, Trash } from "lucide-react";
import type { TodoItem } from "../types/todos";
import toast from "react-hot-toast";
import '../styles/dialog.css'

interface TodoMoreDialogProps {
  todo: TodoItem;
  onClose: () => void;
  onEdit: (todo: TodoItem) => void;
  onDelete: (id: string) => void;
}

export default function TodoMoreDialog({ todo, onClose, onEdit, onDelete }: TodoMoreDialogProps) {
  return (
    <div className="more-dialog">
      <div className="more-dialog-content " onClick={() =>{
         onEdit(todo)
         onClose()
      } }>
        <Pencil size={16} className="icon" />
        <p className="option">Edit</p>
      </div>
      <div className="more-dialog-content" onClick={() => {
        onDelete(todo.id)
        onClose()
        toast.success('Successfully deleted!')
      }}>
        <Trash size={16} className="icon"  />
        <p className="option">Delete</p>
      </div>
    </div>
  );
}
