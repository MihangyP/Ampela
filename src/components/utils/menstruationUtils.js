import moment from 'moment';

export function getOvulationDate(lastMenstruationDate, cycleDurations) {
  // Add 14 days to LMP, then subtract 28 days.
  const ovulationDate = moment(lastMenstruationDate).add(cycleDurations - 14, 'days');

  // If leap year, add 1 day.
  if (ovulationDate.isLeapYear()) {
    ovulationDate.add(1, 'days');
  }

  // Format date and return.
  const formattedDate = ovulationDate.format('YYYY-MM-DD');
  return { "ovulationDate": formattedDate };
}

export function getFecundityPeriod(lastMenstruationDate, cycleDurations) {
  // Calculate last 7 and 28 days
  const j1 = cycleDurations - 18;
  const j2 = cycleDurations - 11;

  // Find start and end of fecundity period
  const startFecondityDate = moment(lastMenstruationDate).add(j1, 'days').format('YYYY-MM-DD');
  const endFecondityDate = moment(lastMenstruationDate).add(j2, 'days').format('YYYY-MM-DD');

  // Return calculated period
  return { 
    "startFecondityDate": startFecondityDate, 
    "endFecondityDate": endFecondityDate 
  }
}


export function getMenstruationPeriod(lastMenstruationDate, cycleDuration, menstruationDuration) {
  // Calculate next menstruation date
  const nextMenstruationDate = moment(lastMenstruationDate).add(
    cycleDuration,
    "days"
  );
  // Calculate next menstruation end date
  const nextMenstruationEndDate = moment(lastMenstruationDate)
    .add(cycleDuration, "days")
    .subtract(1, "days") // Subtract one day from the next menstruation end date
    .add(menstruationDuration, "days");
  // Return menstruation period object
  return {
    "nextMenstruationDate": nextMenstruationDate.format("YYYY-MM-DD"),
    "nextMenstruationEndDate": nextMenstruationEndDate.format("YYYY-MM-DD")
  };
}
