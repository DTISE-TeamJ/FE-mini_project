import React from "react";
import AreaBarChart from "./AreaBarChart";
import AreaProgressChart from "./AreaProgressChart";
import { ContentAreaCharts } from "./style";

const AreaCharts: React.FC = () => {
  return (
    <ContentAreaCharts>
      <AreaBarChart />
      <AreaProgressChart />
    </ContentAreaCharts>
  );
};

export default AreaCharts;
