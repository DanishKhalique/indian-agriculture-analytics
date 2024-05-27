import React from "react";
import { Paper, Table } from "@mantine/core";
import { AverageResult } from "./dataProcessor";

interface AverageTableProps {
  data: AverageResult[];
}

const AverageTable: React.FC<AverageTableProps> = ({ data }) => {
  const rows = data.map((cropData) => (
    <tr key={cropData.crop}>
      <td>{cropData.crop}</td>
      <td>{cropData.averageYield}</td>
      <td>{cropData.averageArea}</td>
    </tr>
  ));

  return (
    <Paper shadow="md" radius="md" p="md" withBorder>
      <Table striped highlightOnHover border={5} withColumnBorders>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield of the Crop between 1950-2020 (Kg/Ha)</th>
            <th>Average Cultivation Area of the Crop between 1950-2020 (Ha)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
};

export default AverageTable;
