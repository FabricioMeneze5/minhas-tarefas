import { useSelector } from 'react-redux'

import Task from '../../components/Task'
import { MainContainer, Title } from '../../styles'

import { RootReducer } from '../../store'

const TasksList = () => {
  const { items } = useSelector((state: RootReducer) => state.tasks)
  const { term, criteria, value } = useSelector(
    (state: RootReducer) => state.filter
  )

  const filterTask = () => {
    let filteredTasks = items

    if (term !== undefined) {
      filteredTasks = filteredTasks.filter(
        (item) =>
          item.title.toLowerCase().search(term.toLowerCase()) >= 0 ||
          item.description.toLowerCase().search(term.toLowerCase()) >= 0
      )

      if (criteria === 'priority') {
        filteredTasks = filteredTasks.filter((item) => item.priority === value)
      } else if (criteria === 'status') {
        filteredTasks = filteredTasks.filter((item) => item.status === value)
      }
      return filteredTasks
    } else {
      return items
    }
  }

  const showTaskMessage = (amount: number) => {
    let message = ''
    const termValidation =
      term !== undefined && term.length > 0 ? `e "${term}"` : ''

    if (criteria === 'all') {
      message = `${amount} tarefa(s) encontrada(s) como "todas" ${termValidation}`
    } else {
      message = `${amount} tarefa(s) encontrada(s) com ${`${criteria} ${value}`} ${termValidation}`
    }

    return message
  }

  const tasks = filterTask()
  const message = showTaskMessage(tasks.length)

  return (
    <MainContainer>
      <Title as="p">{message}</Title>
      <ul>
        {tasks.map((tValue) => (
          <li key={tValue.title}>
            <Task
              id={tValue.id}
              title={tValue.title}
              priority={tValue.priority}
              status={tValue.status}
              description={tValue.description}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default TasksList
