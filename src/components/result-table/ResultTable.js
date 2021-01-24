import React from 'react';
import {Table} from 'reactstrap';
import styled from 'styled-components';

const TopTh = styled.th`
    &.full-width {
        width: 100%;
        white-space: nowrap;
    }
    border-top: none !important;
`;

const ResultTable = props => {

    const results = props.results;

    const allResultRows = () => {
        const resultRows = [];
        for (let i = 0; i < results.length; i++) {
            const {value, methodName, firstInput, secondInput} = results[i];
            resultRows.push(
                <tr key={i}>
                    <th scope="row">
                        {i + 1}
                    </th>
                    <td>
                        {`${methodName} (${firstInput},${secondInput})`}
                    </td>
                    <td>
                        {value}
                    </td>
                </tr>
            );
        }
        return resultRows;
    }

    return (
        <Table data-testid="result-table">
            <thead>
            <tr>
                <TopTh>#</TopTh>
                <TopTh className={'full-width'}>Operation</TopTh>
                <TopTh>Result</TopTh>
            </tr>
            </thead>
            <tbody>
                {results ? allResultRows() : null}
            </tbody>
        </Table>
    );
}

export default ResultTable;
