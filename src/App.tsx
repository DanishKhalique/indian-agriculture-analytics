import React, { useEffect, useState } from "react";
import AggregatedTable from "./aggregatedTable";
import AverageTable from "./averageTable";
import { processData, AggregatedResult, AverageResult } from "./dataProcessor";
import { Container, Title, Space } from "@mantine/core";

const App: React.FC = () => {
  const [aggregatedData, setAggregatedData] = useState<
    Record<string, AggregatedResult>
  >({});
  const [averageData, setAverageData] = useState<AverageResult[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((row: { [x: string]: any }) => {
          return {
            ...row,
            "Crop Production (UOM:t(Tonnes))":
              row["Crop Production (UOM:t(Tonnes))"] || 0,
            "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))":
              row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
            "Area Under Cultivation (UOM:Ha(Hectares))":
              row["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
          };
        });
        const { aggregatedResults, averageResults } =
          processData(processedData);
        setAggregatedData(aggregatedResults);
        setAverageData(averageResults);
      });
  }, []);
  return (
    <Container size="lg" p="md">
      <Title style={{ textAlign: "center" }} order={1}>
        Agriculture Data Analytics Task
      </Title>
      <Space h="xl" />
      <Title style={{ textAlign: "center" }} order={2}>
        Yearly Production Data
      </Title>
      <AggregatedTable data={aggregatedData} />
      <Space h="xl" />
      <Title style={{ textAlign: "center" }} order={2}>
        Average Crop Data (1950-2020)
      </Title>
      <AverageTable data={averageData} />
    </Container>
  );
};

export default App;
