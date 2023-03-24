export const getTodos = async (offset = 0, limit = 10) => {
    try{
        let response = await fetch("https://dummyjson.com/todos?limit="+limit+"&skip=" + offset)
        let data = await response.json()
        return data.todos
    } catch (e) {
        throw Error(e.toString())
    }
}

export const addTodo = async (userId, text) => {
    try{
        let response = await fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: text,
                completed: false,
                userId: userId,
            })
        })
        let data = await response.json()
        return data
    } catch (e) {
        throw Error(e.toString())
    }

}

export const updateTodo = async (todoID, completed) => {
    try{
        let response = await fetch('https://dummyjson.com/todos/' + todoID, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: completed,
            })
        })
        let data = await response.json()
        return data
    } catch (e) {
        throw Error(e.toString())
    }
}

export const deleteTodo = async (todoID) => {
    try{
        let response = await fetch('https://dummyjson.com/todos/' + todoID, {
            method: 'DELETE'
        })
        let data = await response.json()
        return data
    } catch (e) {
        throw Error(e.toString())
    }
}