import React from "react";
import {render, screen} from '@testing-library/react'
import ResultTable from './ResultTable';

describe('<ResultTable/>', () => {

    it("inputTable renders without results props", () => {
        const {getByRole} = render(<ResultTable/>);
        getByRole("columnheader", {name: "Operation"});
        const tbody = document.querySelector("tbody");
        expect(tbody).toBeEmptyDOMElement();
    });

    const results = [{
        value: 12,
        methodName: 'sum',
        firstInput: 10,
        secondInput: 2
    }];

    it("inputTable renders with results props", () => {
        const {getByRole} = render(<ResultTable results={results}/>);
        getByRole("cell", {name: "sum (10,2)"});
        getByRole("cell", {name: "12"});
    });

    it("shows correct styled-component's width when full-width class is used", () => {
        const {getByRole} = render(<ResultTable results={results}/>);
        const operationTh = getByRole("columnheader", {name: "Operation"});
        const resultTh = getByRole("columnheader", {name: "Result"});
        expect(operationTh).toHaveClass("full-width");
        expect(resultTh).not.toHaveClass("full-width");
        expect(operationTh).toHaveStyle("width: 100%");
        expect(resultTh).not.toHaveStyle("width: 100%");
    });

});
