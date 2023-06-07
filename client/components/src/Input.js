import React, { useEffect } from 'react';

const inputReducer = (state, action) => {
  switch (action.type) {
  case 'CHANGE':
    return { ...state, value: action.val };
  default:
    return state;
  }
}; 

const Input = (props) => {
  const [inputState, dispatch] = userReducer(inputReducer, {value: ''});

  const {id, onInput} = props;
  const {value} = inputState;

  useEffect(() => { onInput(id, value) }, [id, onInput, value]);

  const changeHandler = event => {dispatch({type: 'CHANGE', val: event.target.value})}
  const element = props.element === 'input' ? (
    <input id={props.id} type={props.type} placeholder={props.placeholder}
      onChange={changeHandler} value={inputState.value} /> ) :
    (<textarea id={props.id} rows={props.row || 3} onChange={changeHandler} value={inputState.value} />
    );
  return(
    <div> <label htmlFor={props.id}> {props.label}</label>
      {element}
    </div>
  );
}

export default Input;