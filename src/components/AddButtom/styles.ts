import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../styles/colors'

export const CircleButtom = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 64px;
  background-color: ${colors.green};
  color: #fff;
  position: fixed;
  bottom: 40px;
  right: 40px;
  border-radius: 50%;
  text-decoration: none;
  font-size: 40px;
`
