// import { Log } from './CommonMethods';

function secToTime(timeInSecs) {
  // Log('Seconds to Time ', timeInSecs);
  if (timeInSecs !== null && timeInSecs !== '' && parseInt(timeInSecs, 10) > 0) {
      if (timeInSecs < 59) {
          return "00:" + timeInSecs;
      } else if (timeInSecs < 3599) {
          const minutes = Math.floor(timeInSecs / 60);
          const seconds = Math.floor(timeInSecs % 60);
          const updatedMinute = minutes.toString().length < 2 ? "0" + minutes : minutes;
          const updatedSeconds = seconds.toString().length < 2 ? "0" + seconds : seconds;
          return updatedMinute + ":" + updatedSeconds;
      } else {
          const totalMinutes = Math.floor(timeInSecs / 60);
          const hours = Math.floor(totalMinutes / 60);
          const minutes = Math.floor(totalMinutes % 60);
          const seconds = Math.floor(timeInSecs % 60);

          const updatedHours = hours.toString().length < 2 ? "0" + hours : hours;
          const updatedMinute = minutes.toString().length < 2 ? "0" + minutes : minutes;
          const updatedSeconds = seconds.toString().length < 2 ? "0" + seconds : seconds;
          return updatedHours + ":" + updatedMinute + ":" + updatedSeconds;
      }
  } else {
      // Log('Returning 00:00');
      return "00:00"
  }
}

function courseDuration(timeInSecs) {
  if (timeInSecs !== null && timeInSecs !== '' && parseInt(timeInSecs, 10) > 0) {
      if (timeInSecs < 59) {
          return "00 seconds";
      } else if (timeInSecs < 3599) {
          const minutes = Math.ceil(timeInSecs / 60);
          const updatedMinute = minutes.toString().length < 2 ? "0" + minutes : minutes;
          return updatedMinute + ' minutes';
      } else {
          const totalMinutes = Math.floor(timeInSecs / 60);
          const hours = Math.ceil(totalMinutes / 60);

          const updatedHours = hours.toString().length < 2 ? "0" + hours : hours;
          return updatedHours + ' hours';
      }
  } else {
      // Log('Returning 00:00');
      return "00 seconds"
  }
}

function timeToSec(time) {
  const timearray = time.split(":");
  // Log(timearray);
  let seconds = 0;
  if (timearray.length > 2) {
      seconds = (parseInt(timearray[0], 10) * 60 * 60) + (parseInt(timearray[1], 10) * 60) + (parseInt(timearray[2], 10));
  } else {
      seconds = (parseInt(timearray[0], 10) * 60) + (parseInt(timearray[1], 10));
  }

  // // Log(time + ' => ' + seconds);
  return seconds;
}

function timeFromNow(dateTimeInISO) {
  const isoDateInMil = new Date(dateTimeInISO).getTime();
  const todayDateInMil = new Date().getTime();

  //// Log(isoDateInMil, todayDateInMil);

  const oneDayInMil = 1000 * 60 * 60 * 24;

  const differenceInDays = (todayDateInMil - isoDateInMil) / oneDayInMil;

  if (differenceInDays > 365) {
      const years = Math.floor(differenceInDays / 365)
      return years + (years > 1 ? " years" : " year");
  } else if (differenceInDays > 30) {
      const months = Math.floor(differenceInDays / 30);
      return months + (months > 1 ? " months" : " month");
  } else if (differenceInDays > 7) {
      const weeks = Math.floor(differenceInDays / 7);
      return weeks + (weeks > 1 ? " weeks" : " week");
  } else if (differenceInDays < 7 && differenceInDays >= 1) {
      const days = Math.floor(differenceInDays);
      return days + (days > 1 ? " days" : " day");
  } else if (differenceInDays < 1) {
      const hours = Math.floor(differenceInDays * 24);
      const minutes = Math.floor(differenceInDays * 24 * 60);
      const seconds = Math.floor(differenceInDays * 24 * 60 * 60);
      if (hours > 0) {
          return hours + (hours > 1 ? " hours" : " hour");
      } else if (minutes > 0) {
          return minutes + (minutes > 1 ? " minutes" : " minute");
      } else {
          if (seconds < 0) {
              return "0 seconds"
          }
          return (seconds > 1 ? seconds + " seconds" : seconds + " second");
      }
  }
}

function parseTimeForDate(dateTimeInISO) {
  const date = new Date(dateTimeInISO);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime; // 07:30 PM
}

function getFullDateTime(dateTimeInISO) {
  const date = parseDate(dateTimeInISO);
  const time = parseTimeForDate(dateTimeInISO);

  return date + ', ' + time;
}

function parseDate(dateTimeInISO, shortYear, shortMonth) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(dateTimeInISO);
  let parsedDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  if (shortYear) {
      try {
          parsedDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + months[date.getMonth()] + "'" + date.getFullYear().toString().slice(2, 4);
      } catch (err) {
          parsedDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      }
  }
  if (shortMonth) {
      parsedDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + shortMonths[date.getMonth()] + ' ' + date.getFullYear();
  }

  return parsedDate;
}

function parseDateWithWeekDay(dateTimeInISO, forNotifPage) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const date = new Date(dateTimeInISO);
  let parsedDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ', ' + weekDays[date.getDay()];
  if (forNotifPage) {
      const today = Date.now();
      const dateDiff = today - new Date(dateTimeInISO);
      const oneDayTime = 86400 * 1000;
      if (dateDiff > 0) {
          parsedDate = (dateDiff <= oneDayTime)
              ? "TODAY" : (dateDiff > oneDayTime && dateDiff <= oneDayTime * 2)
                  ? "YESTERDAY" : parsedDate;
      }
  }

  return parsedDate; // e.g. 1 January 2021, Monday
}

function parseDateForDropdownNotification(dateTimeInISO) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const date = new Date(dateTimeInISO);
  const time = parseTimeForDate(dateTimeInISO);


  let parsedDate = time + ', ' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();

  return parsedDate; // e.g. 08:00 AM, 26 Jan 2021
}

function parseDateForInputField(dateTimeInISO) {
  const date = new Date(dateTimeInISO);

  const month = date.getMonth() + 1;

  let parsedDate = date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

  return parsedDate; // Format: yyyy-mm-dd
}

function parseTimeForInputField(time) {
  const date = new Date('01/01/2021 ' + time); // Here 01/01/2021 is just for creating a date. We only need time
  const timeInMinutes = date.getMinutes();
  const timeInHours = date.getHours();
  let parsedTime = (timeInHours < 10 ? '0' + timeInHours : timeInHours) + ':' + (timeInMinutes < 10 ? '0' + timeInMinutes : timeInMinutes);
  return parsedTime; // Time Format: HH:MM (24 Hours Format)
}

function parseDateForPlannerCard(date) {
  let updatedDate = new Date(date);

  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let parsedDate = shortMonths[updatedDate.getMonth()] + ' ' + updatedDate.getDate();

  return parsedDate;
}


export { secToTime, timeFromNow, parseDate, timeToSec, courseDuration, getFullDateTime, parseTimeForDate, parseDateWithWeekDay, parseDateForDropdownNotification, parseDateForInputField, parseTimeForInputField, parseDateForPlannerCard };