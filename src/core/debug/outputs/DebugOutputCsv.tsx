import React from 'react';
import { DebugOutputCsvRow } from './DebugOutputCsvRow';
import { Client } from '../../context';

const mapCsvRows = (debug: string): Client.CsvRow[] => {
    if (!debug) {
        return [];
    }
    const result: Client.CsvRow[] = [];
    const lines = debug.split('\n');
    const outputHeaders = lines[0].split(',');
    const outputLines = lines.slice(1, lines.length/2);
    const inputHeaders = lines[lines.length/2].split(';');
    const inputLines = lines.slice(lines.length/2+1, lines.length);
    for (let i = 0; i < inputLines.length; i++) {
        const inputLine = inputLines[i];
        const outputLine = outputLines[i];
        const inputValues = inputLine.split(';');
        const outputValues = outputLine.split(',');
        const rowId = outputLine[0];
        const csvRow: Client.CsvRow = { id: rowId, inputs: [], outputs: [] };
        for (let j = 0; j < inputValues.length; j++) {
            csvRow.inputs.push({
                name: inputHeaders[j],
                value: inputValues[j]
            });
        }
        for (let j = 1; j < outputValues.length; j++) {
            if (outputValues[j] !== '') {
                csvRow.outputs.push({
                    name: outputHeaders[j],
                    value: outputValues[j]
                });
            }
        }
        result.push(csvRow);
    }
    return result;
}

const DebugOutputCsv: React.FC<{ debug: string }> = ({ debug }) => {
    const csvRows = mapCsvRows(debug);
    return (<>
      {csvRows.map((csvRow: Client.CsvRow) => <DebugOutputCsvRow key={csvRow.id} csvRow={csvRow} index={csvRow.id}/>)}
    </>);
}
  
export { DebugOutputCsv };