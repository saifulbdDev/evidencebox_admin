import * as Highcharts from 'highcharts';

interface UserData {
  evidence: number;
  income: number;
  month: number;
  monthName: string;
  police: number;
  relative: number;
  user: number;
  year: number;
}

interface StatisticsData {
  options: Highcharts.Options;
}

export const statisticsDataPaper = (data: UserData[]): StatisticsData => {
  const categories = data.map((element) => element.monthName);
  const users = data.map((element) => element.user);
  const polices = data.map((element) => element.police);
  const evidences = data.map((element) => element.evidence);
  const incomes = data.map((element) => element.income);
  const relatives = data.map((element) => element.relative);

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    credits: {
      enabled: false,
    },
    legend: {
      align: 'right',
       //@ts-ignore
      verticalAlign: 'center',
      symbolWidth: 5,
      symbolHeight: 8,
    },
    title: {
      text: 'Statistics',
      align: 'left',
      style: {
        color: '#000000',
         //@ts-ignore
        fontSize: 20,
        lineWidth: 28,
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories,
    },
    yAxis: [{
      allowDecimals: false,
      min: 0,
      title: {
        margin: 120,
        text: 'Count medals',
         //@ts-ignore
        enabled: false,
      },
    }],
    tooltip: {
      format: '<b>Manth: {key}</b><br/>{series.name}: {y}<br/>',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
    series: [
      {
        type: 'column',
        name: 'User',
        color: '#7842E8',
        data: users,
      },
      {
        type: 'column',
        name: 'Police',
        color: '#08BD25',
        data: polices,
      },
      {
        type: 'column',
        name: 'Evidence',
        color: '#EE2E2E',
        data: evidences,
      },
      {
        type: 'column',
        name: 'Income',
        color: '#FFB600',
        data: incomes,
      },
      {
        type: 'column',
        name: 'Relatives',
        color: '#45CFDD',
        data: relatives,
      },
    ],
  };

  return { options };
};




