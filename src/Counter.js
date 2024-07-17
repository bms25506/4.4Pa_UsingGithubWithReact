import React, { useState } from 'react';  
const Counter = () => {  
    const [count, setCount] = useState(0);  
    const increment = () => {  
        setCount(count + 1);  
    };  
    const decrement = () => {  
        if (count > 0) {  
            setCount(count - 1);  
        }  
        const reset = () => {
            if (count != 0 ) {
                setCount(0);
            }
        }
    };  
    return (  
        <div>  
            <h2>Counter</h2> 
            <p>Count: {count}</p> 
            <button onClick={increment}>Increment</button>  
            <button onClick={decrement}>Decrement</button>  
            <button onClick={reset}>Reset</button>
        </div>  
    );  
};  
export default Counter; 