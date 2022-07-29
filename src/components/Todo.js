// import React, { useState, useEffect, useReducer, useRef } from 'react';
import React, {useEffect, useReducer, useRef } from 'react';
import axios from 'axios'

const Todo = props => {
    // const [todoName, setTodoName] = useState('');
    // const [submittedTodo, setSubmittedTodo] = useState(null)
    // const [todoList, setTodoList] = useState([])
    // const [todoState, setTodoState] = useState({userInput:'', todoList:[]})
    const todoInputRef = useRef();

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload)
            case 'SET':
                return action.payload
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload)
            default:
                return state
        }
    }
    const [todoList, dispatch] = useReducer(todoListReducer, [])
    useEffect(() => {
        axios.get('https://test-2f0e9-default-rtdb.firebaseio.com/todos.json').then(result => {
          console.log(result);
          const todoData = result.data;
          const todos = [];
          for (const key in todoData) {
            todos.push({ id: key, name: todoData[key].name });
          }
          dispatch({ type: 'SET', payload: todos });
        });
        return () => {
          console.log('Cleanup');
        };
      }, []);
    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY)
    }
    useEffect(() => {
        document.addEventListener("mousemove", mouseMoveHandler)
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
    }, [])
    // useEffect(
    //     () => {
    //         if (submittedTodo) {
    //             dispatch({type:'ADD', payload: submittedTodo})
    //         }
    //     }, [submittedTodo]);
    // const inputChangeHandler = (event) => {
    //     setTodoName(event.target.value)
    //     // setTodoState({
    //     //     userInput:event.target.value,
    //     //     todoList:todoState.todoList
    //     // })
    // }

    const addTodoHundler = () => {
        const todoName = todoInputRef.current.value;
        axios
            .post('https://test-2f0e9-default-rtdb.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                setTimeout(() => {
                    const todoItem = { id: res.data.name, name: todoName }
                    // setTodoList(todoList.concat(todoItem))
                    // setSubmittedTodo(todoItem)
                    dispatch({ type: 'Add', payload: todoItem })
                }, 3000)
            })
            .catch(err => {
                console.log(err)
            })
        // setTodoState({
        //     userInput:todoState.userInput,
        //    todoList:todoState.todoList.concat(todoState.userInput) 
        // })
    }
    const todoRemoveHandler = (todoId) => {
        axios
            .delete(`https://test-2f0e9-default-rtdb.firebaseio.com/todos/${todoId}.json`)
            .then((res) => {
                dispatch({ type: 'REMOVE', payload: todoId })
            })
            .catch((err) => {
                console.log(err)
            })

    }
    return <React.Fragment>
        <input
            type="text"
            placeholder='Todo'
            // onChange={inputChangeHandler}
            // value={todoName}
            ref={todoInputRef}
        // value={todoState.userInput}
        />
        <button type='button' onClick={addTodoHundler}>Add</button>
        <ul>
            {todoList.map(todo =>
                <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>
            )}
            {/* {todoState.todoList.map(todo=>
                <li key={todo}>{todo}</li>
                ) } */}
        </ul>
    </React.Fragment>
}

export default Todo;