import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 2rem;
  padding: 0.5rem;
  box-shadow: 1px 1px 0.5em;
`

type props = {
  name: string
  children: React.ReactNode
}
const StyledEditor: React.FC<props> = ({ name, children }) => {

  return (
    <Container className='j-stylededitor'>
      {name}
      <hr />
      <div className='inner'>
        {children}
      </div>
    </Container>
  )
}

export default StyledEditor