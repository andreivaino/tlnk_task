import React, {useState, useEffect} from 'react';
import {Form, FormGroup, FormFeedback, Label, Input, Col, Button} from 'reactstrap';
import styled from 'styled-components';
import {getAllOperations} from '../../util/Calculator';

const StyledForm = styled(Form)`
    padding: 20px;
`;

export const blankInputMsg = 'Input can not be empty';
export const notValidNumberMsg = 'Number is not valid';
export const divideByZeroMsg = 'Can not divide by zero';
export const methNotChosenMsg = 'Calculation operation should be chosen';

const InputForm = props => {

    const {addResult} = props;

    const input = {
        value: '',
        errorMsg: '',
        isError: false
    }

    const [firstInput, setFirstInput] = useState({...input});
    const [secondInput, setSecondInput] = useState({...input});
    const [method, setMethod] = useState({...input});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted) {
            if (!firstInput.isError && !secondInput.isError && !method.isError) {
                addResult({
                    value: method.value.function(firstInput.value.replace(",", "."), secondInput.value.replace(",", ".")),
                    methodName: method.value.name,
                    firstInput: firstInput.value,
                    secondInput: secondInput.value
                });
            }
        }
        setIsSubmitted(false);
    }, [isSubmitted, firstInput, secondInput, method, addResult]);

    const onInputChange = (e) => {
        const val = e.target.value.trim();
        const name = e.target.name;
        if(name === "firstInput") {
            setFirstInput({value: val, errorMsg: val, isError: false})
        } else {
            setSecondInput({value: val, errorMsg: val, isError: false})
        }

    }

    const validateInput = (val, setInput) => {
        const numRegex = /^[+-]?[0-9]+([.,][0-9]+)?$/;
        if (val.trim().length < 1) {
            setInput({value: val, errorMsg: blankInputMsg, isError: true})
        } else if (val.match(numRegex) == null) {
            setInput({value: val, errorMsg: notValidNumberMsg, isError: true})
        } else {
            setInput({value: val, errorMsg: '', isError: false})
        }
    }

    const onMethodChange = (operation) => {
        if (secondInput.errorMsg === divideByZeroMsg) {
            setSecondInput({...secondInput, errorMsg: '', isError: false})
        }
        setMethod({value: operation, errorMsg: '', isError: false});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (method.value === '' || method.value === 'undefined' || method.value == null) {
            setMethod({...method, errorMsg: methNotChosenMsg, isError: true});
        }
        validateInput(firstInput.value, setFirstInput);
        validateInput(secondInput.value, setSecondInput);
        if (method.value.name === 'divide' && secondInput.value === '0') {
            setSecondInput({...secondInput, errorMsg: divideByZeroMsg, isError: true});
        }
        setIsSubmitted(true);
    }

    const allCalcMethodsAsRadio = () => {
        const allRadios = [];
        const allOperations = getAllOperations();
        for (let i = 0; i < allOperations.length; i++) {
            const operation = allOperations[i];
            allRadios.push(
                <FormGroup key={`check-group-${i}`} check>
                    <Label check>
                        <Input type="radio" name="operation" onChange={() => onMethodChange(operation)}/>{' '}
                        {operation.name}
                    </Label>
                </FormGroup>
            )
        }
        return allRadios;
    }

    return (
        <StyledForm id="input-form" onSubmit={handleSubmit}>
            <FormGroup row>
                <Label for="firstInput" sm={4}>First number:</Label>
                <Col sm={8}>
                    <Input invalid={firstInput.isError} type="text" id="firstInput" name="firstInput"
                           value={firstInput.value} onChange={onInputChange}/>
                    <FormFeedback id="fi-error-msg">{firstInput.errorMsg}</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row>
                <Col sm={4}>
                    <legend className="col-form-label">Operation:</legend>
                </Col>
                <Col sm={8} className="pt-2">
                    {allCalcMethodsAsRadio()}
                    <Input hidden disabled invalid={method.isError}/>
                    <FormFeedback id="op-error-msg">{method.errorMsg}</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="secondInput" sm={4}>Second number:</Label>
                <Col sm={8}>
                    <Input invalid={secondInput.isError} type="text" id="secondInput" name="secondInput"
                           value={secondInput.value} onChange={onInputChange}/>
                    <FormFeedback id="si-error-msg">{secondInput.errorMsg}</FormFeedback>
                </Col>
            </FormGroup>
            <Button id="calculate-btn">Calculate</Button>
        </StyledForm>
    );
}

export default InputForm;
