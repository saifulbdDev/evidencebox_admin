import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetStatisticsQuery } from '@/features/dashboard/dashboardApi';
import { statisticsDataPaper } from '@/utils/statisticsDataPaper';
import { Loader } from '@/assets/icons';

const Statistics = () => {
  const { data, isLoading } = useGetStatisticsQuery('');
  const statistics  = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    width: 400,
    type: "pie"
  },
  credits: {
    enabled: false
  },
  title: {
    text: "Vehicles Activity",
    align: "left",
    fontSize: "12px",
    enabled: false
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  accessibility: {
    point: {
      valueSuffix: "%"
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",

      borderRadius: 5,
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
        distance: -50,
        filter: {
          property: "percentage",
          operator: ">",
          value: 4
        }
      }
    }
  },
  series: [
    {
      name: "Share",
      data: [
        { name: "Chrome", y: 74.03 },
        { name: "Edge", y: 12.66 },
        { name: "Firefox", y: 4.96 },
        { name: "Safari", y: 2.49 },
        { name: "Internet Explorer", y: 2.31 },
        { name: "Other", y: 3.398 }
      ]
    }
  ]
};


  // const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <div className="bg-white px-2 py-3.5 rounded-2xl">
      {!isLoading && statistics?.series?.length ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={statistics}
         
         
        />
      ) : (
        <div className='flex justify-center items-center min-h-[400px]'>
          <Loader className='text-primary-400' />
        </div>
      )}
    </div>
  );
};

export default Statistics;
