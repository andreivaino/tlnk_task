import React, {useState} from 'react';
import {Container, Row, Col} from 'reactstrap';
import styled from 'styled-components';
import Table from '../result-table/ResultTable';
import InputForm from '../input-form/InputForm';

const MainContainer = styled(Container)`
    padding-top: 30px;
    padding-bottom: 30px;
`;

const ShadowedCol = styled(Col)`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 22px 0px;
`;

const App = () => {
    const [results, setResults] = useState([]);

    const onResultAdd = (newResult) => {
        setResults(results => [...results, newResult]);
    }

    return (
        <MainContainer>
            <Row>
                <ShadowedCol data-testid="main-col" sm="12" md={{size: 6, offset: 3}}>
                    <InputForm addResult={(newResult) => onResultAdd(newResult)}/>
                    {results.length > 0 ? <Table results={results}/> : null}
                </ShadowedCol>
            </Row>
        </MainContainer>
    );
}

export default App;
