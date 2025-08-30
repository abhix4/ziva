import { useState } from "react";
import { X } from "lucide-react";
import '../styles/dialog.css'

interface UserDialogProps {
  onCloseDialog: () => void;
  setUserName: (name: string) => void;
}

export default function UserDialog({ onCloseDialog, setUserName }: UserDialogProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("name", name);
    setUserName(name)
    onCloseDialog();
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
      <div className="dialog-title">
        <h2>What should I call you?</h2>
        <X onClick={onCloseDialog} size={18} className="icon"/>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
          onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const next = document.getElementById("submit-btn");
            next?.focus();
          }
          }}
        />
        </div>
     
        <button type="submit" className="submit-btn" id="submit-btn">
        Continue
        </button>
      </form>
      </div>
    </div>
  );
}
