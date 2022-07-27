import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Todo = props => {
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([])
    // const [todoState, setTodoState] = useState({userInput:'', todoList:[]})
    useEffect(()=>{
        axios.get('https://test-2f0e9-default-rtdb.firebaseio.com/todos.json')
        .then(result=>{
            console.log(result)
            const todoData= result.data;
            const todos =[]
            for (const key in todoData){
                todos.push({id:key, name: todoData[key].name})
            }
            setTodoList(todos)
        })
       
    },[])
    const inputChangeHandler = (event) => {
        setTodoName(event.target.value)
        // setTodoState({
        //     userInput:event.target.value,
        //     todoList:todoState.todoList
        // })
    }

    const addTodoHundler = () => {
        setTodoList(todoList.concat(todoName))
        axios.post('https://test-2f0e9-default-rtdb.firebaseio.com/todos.json', {name: todoName})
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        // setTodoState({
        //     userInput:todoState.userInput,
        //    todoList:todoState.todoList.concat(todoState.userInput) 
        // })
    }
    return <React.Fragment>
        <input
            type="text"
            placeholder='Todo'
            onChange={inputChangeHandler}
            value={todoName}
            // value={todoState.userInput}
        />
        <button type='button' onClick={addTodoHundler}>Add</button>
        <ul>
            {todoList.map(todo=>
                <li key={todo.id}>{todo.name}</li>
                ) }
                {/* {todoState.todoList.map(todo=>
                <li key={todo}>{todo}</li>
                ) } */}
        </ul>
    </React.Fragment>
}

export default Todo;