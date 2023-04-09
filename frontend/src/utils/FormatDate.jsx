function FormatDate(props) {
  const date = props.split('T')[0];
  const time = props.split('T')[1];

  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2];

  const hour = time.split(':')[0];
  const minute = time.split(':')[1];
  const second = time.split(':')[2].split('.')[0];

  return { year, month, day, hour, minute, second };
}

export default FormatDate;
