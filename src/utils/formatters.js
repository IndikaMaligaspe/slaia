const currencyFormatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'LKR',});

const dateShortFormatter = new Intl.DateTimeFormat('en-GB');

export default {currencyFormatter, dateShortFormatter}