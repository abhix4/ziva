import { Plus } from 'lucide-react'
import './App.css'
import Todo from './components/todo'
import { useEffect, useState } from 'react';
import NewTodoDialog from './components/new-todo-dialog';
import type { TodoItem } from './types/todos';
import EditTodoDialog from './components/edit-todo-dialog';
import toast, { Toaster } from 'react-hot-toast';
import StatusCount from './components/status-count';
import UserDialog from './components/user-dialog';



function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [name, setName] = useState("");

  const addTodo = (todo: TodoItem) => {
    setTodos([...todos, todo]);
    toast.success('Successfully added!')
  }

  const handleToggle = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
      toast.success(`Marked as ${todos.find(todo => todo.id === id)?.completed ? 'Active' : 'Completed'}!`)
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
      toast.success('Successfully deleted!')
  }

  const handleDoubleTap = (id: string) => {
    setCurrentTodo(todos.find(todo => todo.id === id) || null);
    setIsEditDialogOpen(true);
  }

  const handleEdit = (todo: TodoItem) => {
    setTodos(prev => prev.map((t) => t.id === todo.id ? { ...t, ...todo } : t));
    setCurrentTodo(todo);
    setIsEditDialogOpen(true);
  
  }


  useEffect(() => {
    const savedUser = localStorage.getItem('name');
    if (!savedUser) {
      setIsUserDialogOpen(true)
    }
    else{
      setName(savedUser);
    }
  },[])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='main'>
      <div className='content'>

        {/* left */}
        <div className='todo-container'>
          <div className='nav'>
            <h1 className='nav-title'>Todo</h1>
            <div className='right-nav'>
              <div className='add-task' onClick={() => setIsDialogOpen(!isDialogOpen)} title='add a todo'>
                  <Plus size={22}/>
              </div>
           
              <div>
                <div className='filter'></div>
                <div className='filter'>
                <select value={filter} onChange={e => setFilter(e.target.value as 'all' | 'completed' | 'pending')}>
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
                {/* <ChevronDown size={16} /> */}
                </div>
              </div>
            </div>
          </div>
        {/* Active - todos */}
        <div className='scroll-bar'>
        {
          filter === 'all' && (<div>
          <div className='grid-box'>
          <p className='title'>Active</p>
          <div className={`${todos.length !== 0 && 'grid'}`}>
            {
              todos.length > 0 ? (
                todos.filter(todo => !todo.completed).reverse().map((todo) => (
                  <Todo key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit}   openEditor = {() => handleDoubleTap(todo.id)} />
                ))
              ) : (
                <p className='place-holder'>No active todos</p>
              )
            }
            
          </div>
        </div>
          
        <div className='grid-box'>
        <p className='title'>Completed</p>
        <div className={`${todos.filter(todo => todo.completed).length !== 0 && 'grid'}`}>
          {
            todos.filter(todo => todo.completed).length > 0 ? (
              todos.filter(todo => todo.completed).reverse().map((todo) => (
                <Todo key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit}  openEditor = {() => handleDoubleTap(todo.id)}  />
              ))
            ) : (
              <p className='place-holder'>No completed todos</p>
            )
          }
        </div>
        </div>

          </div>
          )
        }  
        {
          filter === 'completed' && (
             <div className='grid-box'>
        <p className='title'>Completed</p>
        <div className={`${todos.filter(todo => todo.completed).length !== 0 && 'grid'}`}>
          {
            todos.filter(todo => todo.completed).length > 0 ? (
              todos.filter(todo => todo.completed).reverse().map((todo) => (
                <Todo key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit}  openEditor = {() => handleDoubleTap(todo.id)}  />
              ))
            ) : (
              <p className='place-holder'>No completed todos</p>
            )
          }
        </div>
        </div>
          )

        }

        {
          filter === 'pending' && (
             <div className='grid-box'>
          <p className='title'>Active</p>
          <div className={`${todos.length !== 0 && 'grid'}`}>
            {
              todos.length > 0 ? (
                todos.filter(todo => !todo.completed).reverse().map((todo) => (
                  <Todo key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} openEditor = {() => handleDoubleTap(todo.id)} />
                ))
              ) : (
                <p className='place-holder'>No active todos</p>
              )
            }
            
          </div>
        </div>
          )
        }
        </div>
        </div>

        {/* right */}
        <div className='profile-container'>
          <div className='profile-content'>
            <div>
               <p className='name'>Hello,</p>
            <p className='first-name'>{name}</p>
            </div>
            <div className='profile-pic'>
              <img src='https://avatars.githubusercontent.com/u/62734288?v=4' alt='profile-pic' />
            </div>
          </div>

          <div className='todo-status'>
            <div className='status-box'>
              <p className='status-title'>All Todos: </p>
               <StatusCount value={todos.length} className="status-count" />
            </div>
             <div className='status-box'>
              <p className='status-title'>Active: </p>
             <StatusCount value={todos.filter(todo => !todo.completed).length} className="status-count1" />
            </div>
             <div className='status-box'>
              <p className='status-title'>Completed:</p>
              <StatusCount value={todos.filter(todo => todo.completed).length} className="status-count2" />
            </div>
          </div>
         </div>
    </div>
    {
      isDialogOpen && (
        <NewTodoDialog onAdd={addTodo} onCloseDialog={() => setIsDialogOpen(false)}/>
      )
    }
    {isEditDialogOpen && currentTodo && (
      <EditTodoDialog todo={currentTodo} onUpdate={handleEdit} onCloseDialog={() => setIsEditDialogOpen(false)} />
    )}
    {
      isUserDialogOpen && (
        <UserDialog onCloseDialog={() => setIsUserDialogOpen(false)} />
      )
    }
    <div><Toaster
    position="bottom-center"
    reverseOrder={false}
    /></div>
  </div>
  )
}

export default App
