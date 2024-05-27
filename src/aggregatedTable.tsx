import React from "react";
import { Table, Paper } from "@mantine/core";
import { AggregatedResult } from "./dataProcessor";

interface AggregatedTableProps {
  data: Record<string, AggregatedResult>;
}

const AggregatedTable: React.FC<AggregatedTableProps> = ({ data }) => {
  const rows = Object.keys(data).map((year) => (
    <tr key={year}>
      <td>{year.replace("Financial Year (Apr - Mar), ", "")}</td>
      <td>{data[year].maxProduction.crop}</td>
      <td>{data[year].maxProduction.value}</td>
      <td>{data[year].minProduction.crop}</td>
      <td>{data[year].minProduction.value}</td>
    </tr>
  ));

  return (
    <Paper shadow="md" radius="md" p="md" withBorder>
      <Table striped highlightOnHover border={5} withColumnBorders>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Max Production</th>
            <th>Max Production (Tonnes)</th>
            <th>Crop with Min Production</th>
            <th>Min Production (Tonnes)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
};

export default AggregatedTable;
