import { CircleCheckBig, Ellipsis, Undo2 } from "lucide-react";
import { useState } from "react";
import TodoMoreDialog from "./todo-more-dialog";
import type { TodoItemProps } from "../types/todos";
// import '../styles/todo.css'

export default function Todo({ todo, onToggle, onDelete, onEdit, openEditor }: TodoItemProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <div className="todo-box" onDoubleClick={openEditor}>
            {
                todo.completed ?
                 <div className="check-icon" onClick={() => onToggle(todo.id)} title="undo completed">
                   <Undo2 size={18} aria-label="undo-completed" />
                </div> :
                 <div className="check-icon mark-completed" onClick={() => onToggle(todo.id)} title="mark as completed">
                <CircleCheckBig size={18} aria-label="mark-completed" />
                </div>
            }
           
            <p className="title-todo">{todo.title}</p>
            <p className="description-todo">{todo.description}</p>

            <div className="todo-footer">
                <p className="todo-date">Created on {new Date(todo.createdAt).toLocaleDateString()}</p>
                <div className="todo-more">
                    <div className="priority" style={{ backgroundColor: todo.priority === "high" ? "#f44336" : todo.priority === "medium" ? "#ff9800" : "#4caf50" }} title="priority"></div>
                    <div title="more" className="icon more">
                    <Ellipsis size={18} className="icon" onClick={() => setDialogOpen(!dialogOpen)}  />
                    </div>
                </div>
            </div>
            {dialogOpen && <TodoMoreDialog todo={todo} onClose={() => setDialogOpen(false)} onEdit={onEdit} onDelete={onDelete} />}
        </div>
    )
}