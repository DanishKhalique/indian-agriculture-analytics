interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": any;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": any;
  "Area Under Cultivation (UOM:Ha(Hectares))": any;
}

interface AggregatedResult {
  maxProduction: { crop: string; value: number };
  minProduction: { crop: string; value: number };
}

interface AverageResult {
  crop: string;
  averageYield: string;
  averageArea: string;
}

const processData = (
  data: CropData[]
): {
  aggregatedResults: Record<string, AggregatedResult>;
  averageResults: AverageResult[];
} => {
  const aggregatedResults: Record<string, AggregatedResult> = {};
  const totals: Record<
    string,
    { totalYield: number; totalArea: number; count: number }
  > = {};

  data.forEach((entry) => {
    const year = entry.Year.replace("Financial Year (Apr - Mar), ", "");
    const crop = entry["Crop Name"];
    const production =
      parseFloat(entry["Crop Production (UOM:t(Tonnes))"]) || 0; // if val is null || undefined take 0
    const yieldValue =
      parseFloat(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0; // if val is null || undefined take 0
    const area =
      parseFloat(entry["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0; // if val is null || undefined take 0

    if (!aggregatedResults[year]) {
      // if result doesnt exist store in object
      aggregatedResults[year] = {
        maxProduction: { crop, value: production },
        minProduction: { crop, value: production },
      };
    } else {
      if (production > aggregatedResults[year].maxProduction.value) {
        //if the production is gt max stored
        aggregatedResults[year].maxProduction = { crop, value: production };
      }
      if (production < aggregatedResults[year].minProduction.value) {
        // if the prodction is lt min stored
        aggregatedResults[year].minProduction = { crop, value: production };
      }
    }

    if (!totals[crop]) {
      //if totals crop is not present then add in obj
      totals[crop] = { totalYield: yieldValue, totalArea: area, count: 1 };
    } else {
      // keep adding to total and increment count
      totals[crop].totalYield += yieldValue;
      totals[crop].totalArea += area;
      totals[crop].count += 1;
    }
  });

  // Calculate averages for every crop by diving with total count
  const averageResults: AverageResult[] = Object.keys(totals).map((crop) => {
    const total = totals[crop];
    return {
      crop,
      averageYield: (total.totalYield / total.count).toFixed(3), // for 3 decimal
      averageArea: (total.totalArea / total.count).toFixed(3), // for 3 decimal
    };
  });

  return { aggregatedResults, averageResults };
};

export { processData };
export type { CropData, AggregatedResult, AverageResult };
