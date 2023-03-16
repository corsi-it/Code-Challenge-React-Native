export async function fetchTodo() {
  const response = await fetch("https://dummyjson.com/todos");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return data.todos;
}
