import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import { remove, edit, changeStatus } from '../../store/reducers/tasks'
import TaskClass from '../../models/Task'
import { Button } from '../../styles'
import { GreenButton } from '../../styles'

import * as enums from '../../utils/enums/TaskLabel'

type Props = TaskClass

const Task = ({
  title,
  priority,
  status,
  description: startDescription,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (startDescription.length > 0) {
      setDescription(startDescription)
    }
  }, [startDescription])

  function cancelEdit() {
    setDescription(startDescription)
    setEditing(false)
  }

  function changeTaskStatus(event: ChangeEvent<HTMLInputElement>) {
    dispatch(changeStatus({ id, completed: event.target.checked }))
  }

  return (
    <S.Card>
      <label htmlFor={title}>
        <input
          type="checkbox"
          id={title}
          checked={status === enums.Status.COMPLETED}
          onChange={changeTaskStatus}
        />
        {editing && <em>Editando: </em>}
        <S.Title>{title}</S.Title>
      </label>
      <S.Tag parameter="priority" priority={priority}>
        {priority}
      </S.Tag>
      <S.Tag parameter="status" status={status}>
        {status}
      </S.Tag>
      <S.Description
        disabled={!editing}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <S.ActionsBar>
        {editing ? (
          <>
            <GreenButton
              onClick={() => {
                dispatch(
                  edit({
                    title,
                    priority,
                    status,
                    description,
                    id
                  })
                )
                setEditing(false)
              }}
            >
              Salvar
            </GreenButton>
            <S.RedButton onClick={cancelEdit}>Cancelar</S.RedButton>
          </>
        ) : (
          <>
            <Button onClick={() => setEditing(true)}>Editar</Button>
            <S.RedButton onClick={() => dispatch(remove(id))}>
              Remover
            </S.RedButton>
          </>
        )}
      </S.ActionsBar>
    </S.Card>
  )
}

export default Task
