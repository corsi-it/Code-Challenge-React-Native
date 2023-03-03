export const getToDoList = async () =>{
    let response = await fetch(
    'https://dummyjson.com/todos'
    );
    let json = await response.json();
    return json;
};

export const getMoreToDoList = async (skip, limit) =>{
    let response = await fetch(
        `https://dummyjson.com/todos?skip=${skip}&limit=${limit}`
    );
    let json = await response.json();
    console.log(json.todos)
    return json.todos;
};

export const updateTodo = async (id, completed, todos) => {
    try {
        const response = await fetch(`https://dummyjson.com/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed,
            }),
        });
        const data = await response.json();
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                console.log(todo)
                return data;
            } else {
                return todo;
            }
        });
        return updatedTodos;
    } catch (error) {
        console.error(error);
    }
};
