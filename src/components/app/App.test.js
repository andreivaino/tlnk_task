import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import {shallow, mount} from "enzyme";
import App from './App';
import InputForm from "../input-form/InputForm";

describe('<App/>', () => {

    it('App renders', () => {
        render(<App/>);
        expect(screen.getByTestId("main-col")).not.toBeEmptyDOMElement();
    });

    it('ResultTable component renders only if results > 0', () => {
        const {getByTestId, queryByTestId} = render(<App/>);
        expect(queryByTestId("result-table")).toBeNull();
        setInputAndClickButton();
        expect(getByTestId("result-table")).not.toBeEmptyDOMElement();
    });

    it('onResultAdd callback is called by InputForm', () => {
        const onResultAdd = jest.fn();
        render(<InputForm addResult={onResultAdd}/>);
        setInputAndClickButton();
        expect(onResultAdd).toHaveBeenCalled();
    });

    function setInputAndClickButton() {
        fireEvent.change(screen.getByLabelText("First number:"), {target: {value: '1'}});
        fireEvent.click(screen.getByLabelText("sum"));
        fireEvent.change(screen.getByLabelText("Second number:"), {target: {value: '1'}});
        fireEvent.click(screen.getByText("Calculate"));
    }

});
