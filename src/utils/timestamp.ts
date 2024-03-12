import moment from 'moment';
export const getTimestamp = (value: string) => {
  let startTimestamp = moment().unix();
  const endTimestamp = moment().unix();

  if (value === 'week') {
    const toDate = moment().subtract(7, 'days').format('L');
    startTimestamp = moment(toDate).unix();
  } else if (value === 'month') {
    const toDate = moment().subtract(1, 'months').format('L');
    startTimestamp = moment(toDate).unix();
  } else if (value === 'year') {
    const toDate = moment().subtract(1, 'years').format('L');
    startTimestamp = moment(toDate).unix();
  }

  return {
    startTimestamp: startTimestamp * 1000,
    endTimestamp: endTimestamp * 1000,
  };
};
