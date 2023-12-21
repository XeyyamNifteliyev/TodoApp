import { useReducer, useState } from 'react';
import { Input, List, Checkbox, Button, Space } from 'antd';
import './App.css';

const adlar = [
  {
    ad: "Xeyyam Nifteliyev",
    id: 1,
    status: false,
  },
  {
    ad: "Zeka Qeniyev",
    id: 2,
    status: false,
  },
  {
    ad: "Kamran Seyidov",
    id: 3,
    status: false,
  },
];





const reduce = (state, action) => {

  switch (action.type) {

    case "STATUS": {
      return state.map((todo) =>

        action.id === todo.id ? { ...todo, status: !todo.status } : todo

      )
    }

    case "ADD": {
      return [...state, action.data]
    }

    case "DELETE": {
      return state.filter((todo) => todo.id !== action.id)
    }

    default:
      return state
  }
}







function App() {

  const [todos, dispatch] = useReducer(reduce, adlar)
  const [newTodo, setNewTodo] = useState("");

  const add = (e) => {
    const { keyCode } = e
    if (keyCode === 13 && newTodo.trim() !== "") {
      dispatch({
        type: "ADD",
        data: {
          ad: newTodo,
          id: todos.length + 1,
        }
      })
      setNewTodo("")
    }
  }


  const sil = (id) => {
    dispatch({ type: "DELETE", id })
  }

  const deyis = (item) => {
    dispatch({ type: "STATUS", id: item.id })
  }

  return (
    <div className="App">
      <Input placeholder="Daxil Edin" style={{ width: "400px", padding: "20px" }}
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={add}
        allowClear />

      {todos.map((item) => (

        <div key={item.id} className='Col'>

          <label >
            <List
              bordered
              size='large'>
              <List.Item className='List' >
                <Space >
                  <input 
                  className='
                  '
                    type='checkbox'
                    checked={item.status}
                    onChange={() => {
                      deyis(item);
                    }}
                  />
                  {item.ad}
                  {item.status && <Button
                    onClick={() => sil(item.id)}
                    type="primary"
                    danger
                    className='Button'>
                    Sil
                  </Button>}
                </Space>
              </List.Item>
            </List>
          </label>
        </div>


      ))}

    </div>
  );
}

export default App
