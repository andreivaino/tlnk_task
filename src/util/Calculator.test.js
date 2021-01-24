import {getAllOperations} from '../util/Calculator';

describe('Calculator functions', () => {

    const operations = getAllOperations();

    it('getAllOperations should return 4 operations', () => {
        expect(operations).toHaveLength(4);
    });

    it('sum', () => {
        const operation = operations[0];
        expect(operation.name).toBe('sum');
        expect(operation.function('1', '-1')).toBe(0);
        expect(operation.function('1', '-1')).not.toBe(2);
    });

    it('divide', () => {
        const operation = operations[1];
        expect(operation.name).toBe('divide');
        expect(operation.function('10', '-5')).toBe(-2);
        expect(operation.function('10', '-5')).not.toBe(-5);
    });

    it('remainder', () => {
        const operation = operations[2];
        expect(operation.name).toBe('remainder');
        expect(operation.function('13', '2')).toBe(1);
        expect(operation.function('13', '2')).not.toBe(2);
    });

    it('highest prime', () => {
        const operation = operations[3];
        expect(operation.name).toBe('highest prime');
        expect(operation.function('-5', '14')).toBe(13);
        expect(operation.function('-5', '14')).not.toBe(14);
    });

});
