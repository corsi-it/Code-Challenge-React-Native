import { useEffect, useState } from 'react'

const useFetchTodos = (limit) => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [skip, setSkip] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalTodos, setTotalTodos] = useState(0)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(false)
      const response = await fetch(
        `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
      )
      if (!response.ok) {
        setError(true)
        throw new Error(response.statusText)
      }
      const data = await response.json()

      setTodos(() => data.todos)
      setTotalTodos(() => data.total)
      setPage(() => Math.ceil((skip + limit) / limit))
      setTotalPages(() => Math.ceil(data.total / limit))
      setLoading(false)
      setRefreshing(false)
    } catch (err) {
      setLoading(false)
      setRefreshing(false)
      setError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [refreshing, skip])

  return {
    todos,
    loading,
    error,
    refreshing,
    setRefreshing,
    setTodos,
    setSkip,
    totalPages,
    page,
    totalTodos,
  }
}

export default useFetchTodos
