import styled from "styled-components";


export const Container = styled.div`
  box-shadow: 1px 1px 0.5em;
  margin: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  .editor-header {
    padding: 0.5rem;
    background-color: #916dff;
    border-bottom: 2px solid #453479;
  }

  .editor-container {
    display: flex;
    flex-direction: column;
    min-height: 70vh;
    margin: 0.5rem;
    [role="textbox"] {
      flex: 1;
      box-shadow: 0.1px 0.1px 0.2rem inset;
      padding: 0.05rem 0.5rem;
      :focus-visible {
        outline: none;
      }
    }
  }
`