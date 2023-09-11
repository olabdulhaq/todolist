import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CircleIcon from '@mui/icons-material/Circle'

import { appColor } from '../../constants/color';
import { TasksProps } from '@/types';
import moment from 'moment';

// import { CalendarIcon, ClockIcon, UnCheckedIcon } from '../../icons';

interface IProps {
  todosData:  TasksProps[]
  handleDateButton: (date: any) => void
}

const TodoCalendar = ({todosData, handleDateButton}:IProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const handleDateChange = (e: any) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  };

  const handlePreviousMonthClick = () => {
    // Navigate to the previous month
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      1
    );
    setSelectedDate(newDate);
  };

  const handleNextMonthClick = () => {
    // Navigate to the next month
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      1
    );
    setSelectedDate(newDate);
  };

  const getDaysInMonth = (year: any, month: any) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    // Calculate the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();

    // Define an array of day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendarRows = [];
    let currentDay = 1;

    // Add the row with day names
    calendarRows.push(
      <TableRow
        key={`row-header`}
        sx={{
          color: appColor.gray700,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: '1.25rem',
        }}>
        {dayNames.map((dayName, index) => (
          <TableCell key={`header-${index}`}>{dayName}</TableCell>
        ))}
      </TableRow>
    );

    for (let i = 0; i < 6; i++) {
      const calendarRow = [];
      let cellClass;

      for (let j = 0; j < 7; j++) {
        let cellContent = null;

        if (i === 0 && j < firstDayOfMonth) {
          // Display some part of the previous month
          const prevMonthDay = lastDayOfPreviousMonth - firstDayOfMonth + j + 1;
          cellContent = (
            <Typography
              key={`prev-${prevMonthDay}`}
              sx={{
                color: appColor.gray500,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: '1.25rem',
              }}>
              {prevMonthDay}
            </Typography>
          );
        } else if (currentDay <= daysInMonth) {
          // Determine if the current cell is in the current month
          const isCurrentMonth =
            currentDay === selectedDate.getDate() &&
            year === selectedDate.getFullYear() &&
            month === selectedDate.getMonth();

            
          const cellDate = new Date(year, month, currentDay).toISOString().split('T')[0];
          const hasTodos = todosData.some((todo) => moment(todo.date).format('YYYY-MM-DD')=== cellDate);

          cellClass = isCurrentMonth ? 'current-day' : hasTodos ? 'dayWithTodos' : 'other-day';

          // Display the current month's date with appropriate styling
          cellContent = (
            <div
              key={`current-${currentDay}`}
              style={{
                cursor: 'pointer',
                color: isCurrentMonth ? '#fff' : appColor.gray700,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => {
                handleDateButton(selectedDate)
                // alert(selectedDate)
                console.log(moment(selectedDate))
              }}
              >
              {currentDay}
              {hasTodos && <CircleIcon sx={{ fontSize: 5, color: "#008000" }} />}
            </div>
          );
          currentDay++;
        } else {
          // Display some part of the next month
          const nextMonthDay = currentDay - daysInMonth;
          cellContent = (
            <Typography
              key={`next-${nextMonthDay}`}
              sx={{
                color: appColor.gray500,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: '1.25rem',
              }}>
              {nextMonthDay}
            </Typography>
          );
          currentDay++;
        }

        calendarRow.push(
          <TableCell
            key={`${year}-${month}-${i}-${j}`}
            style={{ textAlign: 'center', }}
            className={cellClass}>
            {cellContent}
          </TableCell>
        );
      }

      calendarRows.push(<TableRow key={`row-${i}`}>{calendarRow}</TableRow>);
    }

    return calendarRows;
  };

  return (
    <Card
      elevation={0}
      sx={{
        boxShadow:
          '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
      }}>
      <CardHeader
        sx={{ p: 0 }}
        title={
          <Grid
            container
            alignItems="center"
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={handlePreviousMonthClick}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography
              sx={{
                color: appColor.gray700,
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: '1.5rem',
              }}>
              {selectedDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
              })}
            </Typography>
            <IconButton onClick={handleNextMonthClick}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        }
      />
      <CardContent className="calendar-content">
        <Grid
          container
          spacing={2}
          sx={{ width: '100%', alignItems: 'center' }}>
          <Grid item xs={12} md={8}>
            <TextField
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className="date-input"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.5rem',
                  border: `1px solid ${appColor.gray300}`,
                  background: '#fff',
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              onClick={handleTodayClick}
              sx={{
                textTransform: 'none',
                borderRadius: '0.5rem',
                border: `1px solid ${appColor.gray300}`,
                color: appColor.gray700,
                fontSize: '0.875rem',
                fontWeight: 600,
                lineHeight: '1.25rem',
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
              }}>
              Today
            </Button>
          </Grid>
        </Grid>
        <Table className="calendar-table">
          <TableBody>{generateCalendar()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TodoCalendar;
