import { useState } from "react";
import type { TodoItem } from "../types/todos";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import '../styles/dialog.css'

interface EditTodoDialogProps {
  todo: TodoItem;
  onUpdate: (todo: TodoItem) => void;
  onCloseDialog: () => void;
}

export default function EditTodoDialog({ todo, onUpdate, onCloseDialog }: EditTodoDialogProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState<"low" | "medium" | "high">(todo.priority);
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newTodo = { title, description, priority, id: todo.id, completed: todo.completed, createdAt: todo.createdAt };
      onUpdate(newTodo as TodoItem)
    //   console.log("New Todo:", newTodo);

      // reset form
      setTitle("");
      setDescription("");
      setPriority("low");
      onCloseDialog();
      toast.success('Successfully edited!')
    }
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        <div className="dialog-title">
          <h2>Edit Todo</h2>
          <X onClick={onCloseDialog} size={18} className="icon"/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "error" : ""}
               onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const next = document.getElementById("description-input");
            next?.focus();
          }
          }}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group" >
            <textarea
                id="description-input"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
               onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const next = document.getElementById("priority-low-btn");
            next?.focus();
          }
          }}
            />
          </div>

          <div className="form-group priority-picker">
            <label>Priority:</label>
            <div style={{ display: "flex ", gap: "1rem", marginTop:'12px' }}>
            {[
                { value: "low", color: "#4caf50" },
                { value: "medium", color: "#ff9800" },
                { value: "high", color: "#f44336" },
            ].map((p: any) => (
                <button
                id={`priority-${p.value}-btn`}
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p?.value)}
                    style={{
                        border: priority === p.value ? "1px solid #333" : "1px solid #ccc",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        background: p.color,
                        cursor: "pointer",
                        outline: "none",
                        padding: 0,
                        display: "inline-block",
                    }}
                    aria-label={p.value}
                     onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const next = document.getElementById("submit-btn");
            next?.focus();
          }
          }}
                />
            ))}
            </div>
          </div>

          <button type="submit" className="submit-btn"  id="submit-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
