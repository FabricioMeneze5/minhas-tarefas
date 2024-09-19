import styled, { createGlobalStyle } from 'styled-components'
import colors from './colors'

const EstiloGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding:0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }
`
export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;
`
export const MainContainer = styled.main`
  padding: 0 40px;
  height: 100vh;
  overflow-y: scroll;
`
export const Title = styled.h2`
  display: block;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: bold;
`
export const Input = styled.input`
  padding: 8px;
  backgroung-color: #fff;
  border-radius: 8px;
  font-weight: bold;
  color: #666666;
  border: 1px solid #666666;
  width: 100%;
  resize: none;
`

export const Button = styled.button`
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  background-color: ${colors.grey};
  border-radius: 8px;
  margin-right: 8px;
`

export const GreenButton = styled(Button)`
  background-color: ${colors.green};
`
export default EstiloGlobal
