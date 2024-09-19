import { useDispatch, useSelector } from 'react-redux'
import CardFilter from '../../components/CardFilter'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'
import { Button } from '../../styles'
import * as enums from '../../utils/enums/TaskLabel'
import { RootReducer } from '../../store'
import { changeTerm } from '../../store/reducers/filter'
import { Input } from '../../styles'

type Props = {
  showFilter: boolean
}

const SideBar = ({ showFilter }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { term } = useSelector((state: RootReducer) => state.filter)

  return (
    <S.Aside>
      {showFilter ? (
        <>
          <Input
            type="text"
            placeholder="Buscar"
            value={term}
            onChange={(event) => dispatch(changeTerm(event.target.value))}
          />
          <S.Filtros>
            <CardFilter
              value={enums.Status.PENDING}
              criteria="status"
              subtitle="pendentes"
            />
            <CardFilter
              value={enums.Status.COMPLETED}
              criteria="status"
              subtitle="concluidas"
            />
            <CardFilter
              value={enums.Priority.URGENT}
              criteria="priority"
              subtitle="urgentes"
            />
            <CardFilter
              value={enums.Priority.IMPORTANT}
              criteria="priority"
              subtitle="importantes"
            />
            <CardFilter
              value={enums.Priority.NORMAL}
              criteria="priority"
              subtitle="normal"
            />
            <CardFilter criteria="all" subtitle="todas" />
          </S.Filtros>
        </>
      ) : (
        <Button onClick={() => navigate('/')}>Voltar a lista de tarefas</Button>
      )}
    </S.Aside>
  )
}

export default SideBar
