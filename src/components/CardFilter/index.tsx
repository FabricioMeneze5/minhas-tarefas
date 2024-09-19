import * as S from './styles'
import * as enums from '../../utils/enums/TaskLabel'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../../store/reducers/filter'
import { RootReducer } from '../../store'

export type Props = {
  subtitle: string
  criteria: 'priority' | 'status' | 'all'
  value?: enums.Priority | enums.Status
}

const CardFilter = ({ subtitle, criteria, value }: Props) => {
  const dispatch = useDispatch()
  const { filter, tasks } = useSelector((state: RootReducer) => state)

  const isActive = () => {
    const sameCriteria = filter.criteria === criteria
    const sameValue = filter.value === value

    return sameCriteria && sameValue
  }

  const countTasks = () => {
    if (criteria === 'all') return tasks.items.length
    if (criteria === 'priority') {
      return tasks.items.filter((item) => item.priority === value).length
    }
    if (criteria === 'status') {
      return tasks.items.filter((item) => item.status === value).length
    }
  }

  const selectFilter = () => {
    dispatch(
      changeFilter({
        criteria,
        value
      })
    )
  }

  const active = isActive()
  const counter = countTasks()

  return (
    <div>
      <S.Card active={active} onClick={selectFilter}>
        <S.Counter>{counter}</S.Counter>
        <S.Label>{subtitle}</S.Label>
      </S.Card>
    </div>
  )
}

export default CardFilter
