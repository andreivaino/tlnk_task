import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import InputForm, {blankInputMsg, divideByZeroMsg, methNotChosenMsg, notValidNumberMsg} from './InputForm';
import {shallow, mount} from "enzyme";

describe('<InputForm/>', () => {

  it('inputTable renders', () => {
    render(<InputForm/>);
  });

  it('should show blankInputMsg msg when submitted with empty input', () => {
    const {getByText, getByLabelText} = render(<InputForm />);

    expect(getByLabelText("First number:").textContent).toBe("");
    expect(getByLabelText("Second number:").textContent).toBe("");

    fireEvent.change(getByLabelText("First number:"), {target: {value: ''}});
    fireEvent.change(getByLabelText("Second number:"), {target: {value: ''}});

    fireEvent.click(getByText("Calculate"));

    expect(document.querySelector("#fi-error-msg").textContent).toBe(blankInputMsg);
    expect(document.querySelector("#si-error-msg").textContent).toBe(blankInputMsg);
  });

  it('should show Number is not valid msg when submitted with empty input', () => {
    const {getByText, getByLabelText} = render(<InputForm />);

    fireEvent.change(getByLabelText("First number:"), {target: {value: 'aa'}});
    fireEvent.change(getByLabelText("Second number:"), {target: {value: 'bb'}});

    fireEvent.click(getByText("Calculate"));

    expect(document.querySelector("#fi-error-msg").textContent).toBe(notValidNumberMsg);
    expect(document.querySelector("#si-error-msg").textContent).toBe(notValidNumberMsg);
  });

  it('should show divideByZeroMsg msg when submitted with valid input', () => {
    const {getByText, getByLabelText} = render(<InputForm />);

    fireEvent.change(getByLabelText("First number:"), {target: {value: '123'}});
    fireEvent.change(getByLabelText("Second number:"), {target: {value: '123'}});

    fireEvent.click(getByText("Calculate"));

    expect(document.querySelector("#fi-error-msg").textContent).toBe("");
    expect(document.querySelector("#si-error-msg").textContent).toBe("");
  });

  it('should show error msg when submitted with divide operation and zero second input', () => {
    const {getByText, getByLabelText} = render(<InputForm />);

    fireEvent.change(getByLabelText("First number:"), {target: {value: '123'}});
    fireEvent.change(getByLabelText("Second number:"), {target: {value: '0'}});
    fireEvent.click(getByLabelText("divide"));

    fireEvent.click(getByText("Calculate"));

    expect(document.querySelector("#fi-error-msg").textContent).toBe("");
    expect(document.querySelector("#si-error-msg").textContent).toBe(divideByZeroMsg);
  });


  it('should show methNotChosenMsg msg when submitted without method', () => {
    const {getByText} = render(<InputForm />);

    expect(document.querySelector("#op-error-msg").textContent).toBe("");

    fireEvent.click(getByText("Calculate"));

    expect(document.querySelector("#op-error-msg").textContent).toBe(methNotChosenMsg);
  });

  it('props callback addResult is called if all inputs are valid', () => {
    const addResult = jest.fn();
    const {getByLabelText, getByText} = render(<InputForm addResult={addResult} />);

    fireEvent.click(getByText("Calculate"));
    expect(addResult).not.toBeCalled();

    fireEvent.change(getByLabelText("First number:"), {target: {value: '123'}});
    fireEvent.change(getByLabelText("Second number:"), {target: {value: '1'}});
    fireEvent.click(getByLabelText("divide"));
    fireEvent.click(getByText("Calculate"));

    expect(addResult).toBeCalled();
  })

});
