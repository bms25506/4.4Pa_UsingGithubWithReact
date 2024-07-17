import React from 'react';  
import Counter from './Counter';  
import FormInput from './FormInput';  
import TodoList from './TodoList'; 
import Weather from './Weather';
const App = () => {  
  return (  
    <div>  
      <Counter />  
      <FormInput />  
      <TodoList/> 
      <Weather/>
    </div>  
  );  
};  
export default App; 