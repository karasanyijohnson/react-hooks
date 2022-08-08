import React from 'react';

const List=(props)=>{
    console.log('Rendering the List.......')
return <ul>
{props.items.map(item => (
  <li key={item.id} onClick={props.onClick.bind(this, item.id)}>
    {item.name}
  </li>
))}
    {/* {todoState.todoList.map(todo=>
        <li key={todo}>{todo}</li>
        ) } */}
</ul>
}

export default List;