'use client';

import { Card, Title, BarChart } from '@tremor/react';

const dataFormatter = (number: number) =>
  // return number no decimal places
  number.toFixed(0);
export const BarChartDemo = ({ chartData, title }: any) => (
  <Card className="rounded-md">
    <Title>{title}</Title>

    <BarChart
      className="mt-6"
      data={chartData}
      index="name"
      categories={['Number']}
      colors={['orange']}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  </Card>
);
