import React, { useReducer, useEffect, useContext } from "react";

import { validate } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import { MDBTooltip, MDBBtn } from "mdbreact";

import "../../../css/style.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true
      };
    }
    case "FOCUS": {
      return {
        ...state,
        isFocused: true
      };
    }
    default:
      return state;
  }
};

const Input = props => {
  console.log("input rendering");
  const auth = useContext(AuthContext);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isFocused: false,
    isValid: props.initialValid || false
  });
  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    if (id === "destination") {
    } else {
      onInput(id, value, isValid);
    }
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    });
  };
  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    });
  };

  const foucsHandler = () => {
    if (props.id === "destination") {
      dispatch({
        type: "FOCUS"
      });
      props.changeId(id);
    }
  };
  console.log(id);
  console.log(inputState);
  console.log(inputState.isValid);
  console.log(inputState.isFocused);
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onFocus={foucsHandler}
        onBlur={touchHandler}
        value={id === "destination" ? auth.destination : inputState.value}
        readOnly={props.readOnly || null}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        placeholder={props.placeholder}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <fieldset
      className={`${
        props.lesswidth ? `form__control-small` : `form-control-large`
      } ${
        id === "destination"
          ? inputState.isFocused &&
            !auth.destinationValid &&
            "form-control--invalid"
          : !inputState.isValid &&
            inputState.isTouched &&
            "form-control--invalid"
      }`}
    >
      {/* <label htmlFor={props.id}>{props.label}</label> */}
      {element}

      {id === "destination"
        ? !auth.destinationValid &&
          inputState.isFocused && <p>{props.errorText}</p>
        : !inputState.isValid &&
          inputState.isTouched && <p>{props.errorText}</p>}
    </fieldset>
  );
};

export default Input;
