import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
    // console.log(setTodos);
    // console.log(id);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id == id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  // const textInput = document.getElementById("addInput");
  // textInput.addEventListener("keypress", (event) => {
  //   if (event.key === "Enter") {
  //     setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
  //     setTodo("");
  //   }
  // });

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-[35%] shadow-md hover:shadow-xl">
        <h1 className="font-bold text-center text-3xl">
          Task Buddy - Manage your todos at one place.
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <input
            required
            onChange={handleChange}
            value={todo}
            className="w-full rounded-full px-5 py-1"
            type="text"
            placeholder="Add task"
          ></input>
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="mx-2 rounded-full text-white bg-violet-700 disabled:bg-violet-500 hover:bg-violet-800 p-4 py-2 text-sm font-bold"
          >
            Save
          </button>
        </div>
        <input
          id="show"
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div className="todo flex my-3 justify-between" key={item.id}>
                  <div className="flex gap-5">
                    <input
                      className="mr-2"
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="edit text-white bg-violet-700 hover:bg-violet-800 text-sm font-medium rounded-md mx-1 py-1 p-2"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="delete text-white bg-violet-700 hover:bg-violet-800 text-sm font-medium rounded-md mx-1 py-1 p-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
