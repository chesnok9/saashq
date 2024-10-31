'use client';

import { Card, Title, AreaChart } from '@tremor/react';

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export const AreaChartDemo = ({ chartData, title }: any) => (
  <Card>
    <Title>{title}</Title>
    <AreaChart
      className="mt-4 h-72"
      data={chartData}
      index="date"
      categories={['Number']}
      colors={['orange']}
      valueFormatter={dataFormatter}
    />
  </Card>
);
