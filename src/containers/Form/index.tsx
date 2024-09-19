import { useDispatch } from 'react-redux'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Sform, Options } from './style'
import { MainContainer, Title, Input, GreenButton } from '../../styles'
import * as enums from '../../utils/enums/TaskLabel'
import { register } from '../../store/reducers/tasks'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(enums.Priority.NORMAL)

  const registerTask = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      register({
        title,
        priority,
        status: enums.Status.PENDING,
        description
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Title>Nova Tarefa</Title>
      <Sform onSubmit={registerTask}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          type="text"
          placeholder="Titulo"
        />
        <Input
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          as="textarea"
          placeholder="Descrição da tarefa"
        />
        <Options>
          <p>Prioridade</p>
          {Object.values(enums.Priority).map((priority) => (
            <div key={priority}>
              <input
                value={priority}
                name="priority"
                type="radio"
                onChange={({ target }) =>
                  setPriority(target.value as enums.Priority)
                }
                id={priority}
                defaultChecked={priority === enums.Priority.NORMAL}
              />{' '}
              <label htmlFor={priority}>{priority}</label>
            </div>
          ))}
        </Options>
        <GreenButton type="submit">Cadastrar</GreenButton>
      </Sform>
    </MainContainer>
  )
}

export default Form
