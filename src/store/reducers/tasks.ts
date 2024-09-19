import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'
import * as enums from '../../utils/enums/TaskLabel'

type TasksState = {
  items: Task[]
}

const initialState: TasksState = {
  items: [
    {
      id: 1,
      title: 'Estudar Typescript',
      priority: enums.Priority.IMPORTANT,
      status: enums.Status.PENDING,
      description: 'Ver a aula 3 do modulo 25'
    },
    {
      id: 2,
      title: 'Estudar Ir ao banco',
      priority: enums.Priority.URGENT,
      status: enums.Status.COMPLETED,
      description: 'novos alunos dos meus clientes'
    },
    {
      id: 3,
      title: 'Estudar Redux',
      priority: enums.Priority.NORMAL,
      status: enums.Status.COMPLETED,
      description: 'Ver a aula 5 do modulo 30'
    },
    {
      id: 4,
      title: 'Estudar HTML',
      priority: enums.Priority.NORMAL,
      status: enums.Status.PENDING,
      description: 'Ver a aula 5 do modulo 2'
    }
  ]
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
    edit: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.items.findIndex((t) => t.id === action.payload.id)
      if (taskIndex >= 0) {
        state.items[taskIndex] = action.payload
      }
    },
    register: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const isDuplicateTask = state.items.find(
        (task) =>
          task.title.toLowerCase() === action.payload.title.toLowerCase()
      )

      if (isDuplicateTask) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const lastTask = state.items[state.items.length - 1]

        const newTask = {
          ...action.payload,
          id: lastTask ? lastTask.id + 1 : 1
        }
        state.items.push(newTask)
      }
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const taskIndex = state.items.findIndex((t) => t.id === action.payload.id)
      if (taskIndex >= 0) {
        state.items[taskIndex].status = action.payload.completed
          ? enums.Status.COMPLETED
          : enums.Status.PENDING
      }
    }
  }
})

export const { remove, edit, register, changeStatus } = taskSlice.actions

export default taskSlice.reducer
