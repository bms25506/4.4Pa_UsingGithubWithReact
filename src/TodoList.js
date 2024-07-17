import React, { useState } from 'react';  
const TodoList = () => {  
    const [todos, setTodos] = useState([]); 
    const [input, setInput] = useState('');  
    const handleAdd = () => {  
    if (input) {  
        setTodos([...todos, input]);  
        setInput('');  
    }  
    };  
    const handleRemove = (index) => {  
        const newTodos = todos.filter((_, i) => i !== index);  
        setTodos(newTodos);  
    };  
    return (  
        <div>  
            <h2>Todo List</h2>  
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />  
            <button onClick={handleAdd}>Add Todo</button>  
            <ul>  
                {todos.map((todo, index) => (  
                <li key={index}>  
                    {todo} <button onClick={() => handleRemove(index)}>Remove</button>  
                </li>  
                ))}  
            </ul>  
        </div>  
    );  
};  
export default TodoList; 