import { ChangeEvent, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import TodoDetails from './TodoDetails';
import AddEditTodo from './AddEditTodo';
import TodoCalendar from './TodoCalendar';
import { appColor } from '../../constants/color';
import { useCreateTodo } from '../../hooks/useCreateTodo';
import { useFetchTodos } from '../../hooks/useFetchTodos';
import { MicrophoneIcon } from '../../icons';
import { greetingMessage } from '../../utils/helpers';
import moment, { Moment } from 'moment';
import { TasksProps } from '@/types';
import { useUpdateTodo } from '../../hooks/useUpdateTodo';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import { Checkbox } from '@mui/material';

const Todos = () => {
  const [open, setOpen] = useState(false);
  const [isInputMode, setIsInputMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeDate, setActiveDate] = useState<Moment>(moment());
  const [dateButtons, setDateButtons] = useState<Moment[]>([]);
  const [selectedRow, setSelectedRow] = useState<TasksProps | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    task: '',
    date: moment(),
    startTime: moment(),
    endTime: moment(),
  });

  const { data: todos, status } = useFetchTodos();
  const { mutate: createTodo, isLoading: isLoadingCreateTodo } =
    useCreateTodo();
  const { mutate: updateTodo, isLoading: isLoadingUpdateTodo } =
    useUpdateTodo();
  const { mutate: deleteTodo, isLoading: isLoadingDeleteTodo } =
    useDeleteTodo();

  const pageSize = 10;
  const filterPageSize =
    todos.rows.filter(
      (el) =>
        moment(el.date).format('YYYY-MM-DD') ===
        moment(activeDate).format('YYYY-MM-DD')
    ) || 0;
  const totalPages = Math.ceil(filterPageSize.length / pageSize);

  useEffect(() => {
    // Initialize the dates array with 11 dates starting from today
    const initialDates = Array.from({ length: 11 }, (_, i) =>
      moment().add(i - 5, 'days')
    );
    setDateButtons(initialDates);
    // setFilterTerm(moment(activeDate).format('YYYY-MM-DD'))
  }, []);

  const handleOpenInputMode = () => {
    setIsInputMode(true);
  };
  const handleCloseInputMode = () => {
    setIsInputMode(false);
    setIsEditing(false);
    setSelectedRow(null);
  };
  const handleOpenViewMode = () => setIsViewMode(true);
  const handleCloseViewMode = () => setIsViewMode(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return todos.rows
      .filter(
        (todo) =>
          moment(todo.date).format('YYYY-MM-DD') ===
          moment(activeDate).format('YYYY-MM-DD')
      )
      .slice(startIndex, endIndex);
  };

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  // const handleDateButton = (clickedDate: Moment) => {
  //   // Calculate the number of days to shift the dates to keep the selected date in the middle
  //   const daysToShift = 5 - dateButtons.findIndex((date) => date.isSame(clickedDate, 'day'));

  //   // Calculate the new array of dates
  //   const newDates = dateButtons.map((date) =>
  //     moment(date).add(daysToShift, 'days')
  //   );

  //   setActiveDate(clickedDate);
  //   setDateButtons(newDates);
  // };

  const handleDateButton = (newDate: Moment) => {
    setActiveDate(newDate);
    // You can perform any additional actions here based on the new active date.
  };

  const handleDelete = () => {
    const id = selectedRow?.id as number;

    deleteTodo(id, {
      onSuccess: () => {
        handleCloseViewMode();
      },
    });
  };

  const handleSubmit = () => {
    const data = {
      task: formData.task,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    console.log('submit', data);

    const updateData = {
      task: formData.task,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      id: selectedRow?.id as number,
      completed: selectedRow?.completed as boolean,
    };

    if (isEditing) {
      updateTodo(updateData as any, {
        onSuccess: () => {
          handleCloseInputMode();
          setFormData({
            task: '',
            date: moment(),
            startTime: moment(),
            endTime: moment(),
          });
        },
      });
    } else {
      createTodo(data, {
        onSuccess: () => {
          handleCloseInputMode();
          setFormData({
            task: '',
            date: moment(),
            startTime: moment(),
            endTime: moment(),
          });
        },
      });
    }
  };

  //   const handleDateClick = (day) => {
  //     // Handle the click on a date in the calendar, e.g., open a popup, update selected date, etc.
  //     // You can add your logic here.
  //     console.log('Clicked on day:', day);
  //   };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography
            sx={{
              fontSize: ['1.5rem', '1.5rem', '1.875rem'],
              fontWeight: 600,
              lineHeight: '2.375rem',
              color: appColor.gray900,
            }}>
            {greetingMessage}
          </Typography>
          <Button
            variant="contained"
            sx={{
              display: ['none', 'none', 'flex'],
              fontSize: '0.875rem',
              padding: '0.625rem 1rem',
              fontWeight: 600,
              lineHeight: '1.25rem',
              borderRadius: '0.5rem',
              border: `1px solid ${appColor.primary}`,
              background: appColor.primary,
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
              textTransform: 'none',
              '&:hover': { backgroundColor: appColor.primary100 },
            }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              handleOpenInputMode();
              handleCloseViewMode();
            }}>
            Create New Task
          </Button>
        </Box>
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.5rem',
            color: appColor.gray600,
          }}>
          You got some task to do.
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          mt: '2rem',
          '& .MuiGrid-item': {
            pt: 0,
            pb: 10,
          },
        }}>
        <Grid item xs={12} md={8}>
          <Box>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: '1.5rem',
                color: appColor.gray900,
              }}>
              January 2023
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                overflow: ['auto', 'auto', 'initial'],
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}>
              {dateButtons.map((date, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    minWidth: ['3.08563rem', '3.08563rem', 0],
                    width: ['3.08563rem', '3.08563rem', '3.875rem'],
                    padding: [
                      '0.625rem 0.8rem',
                      '0.625rem 0.8rem',
                      '0.625rem 1rem',
                    ],
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textTransform: 'none',
                    color: date.isSame(activeDate, 'day')
                      ? '#fff'
                      : appColor.gray700,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    lineHeight: '1.25rem',
                    borderRadius: '0.5rem',
                    border: `1px solid ${appColor.gray300}`,
                    backgroundColor: date.isSame(activeDate, 'day')
                      ? appColor.primary
                      : 'transparent',
                    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                  }}
                  onClick={() => {
                    handleCloseInputMode();
                    handleCloseViewMode();
                    handleDateButton(date);
                  }}>
                  <span>{date.format('ddd')}</span>
                  <span>{date.format('D')}</span>
                </Button>
              ))}
            </Box>
            <Typography
              sx={{
                mt: '2rem',
                mb: '1rem',
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: '24px',
                color: appColor.gray900,
              }}>
              My Tasks
            </Typography>
            {status === 'loading' ? (
              <div>loading...</div>
            ) : (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {getCurrentPageData().length <= 0 ? (
                  <Typography sx={{ textAlign: 'center', py: 5 }}>
                    You don't have any task for today
                  </Typography>
                ) : (
                  getCurrentPageData().map((todo) => (
                    <Box
                      key={todo.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '4.5rem',
                        padding: '1rem 1.5rem',
                        backgroundColor: appColor.gray50,
                        borderBottom: appColor.gray200,
                      }}>
                      <Checkbox
                        checked={todo.completed}
                        onChange={(event) => {
                          const newFormData = {
                            ...todo,
                            completed: event.target.checked,
                          };
                          updateTodo(newFormData);
                        }}
                      />
                      <Box
                        sx={{
                          mr: 'auto',
                          ml: '0.75rem',
                          width: '100%',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          handleOpenViewMode();
                          handleCloseInputMode();
                          setSelectedRow(todo);
                        }}>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px',
                            color: appColor.gray900,
                          }}>
                          {todo.task}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: appColor.gray600,
                          }}>
                          {`${moment(todo.startTime).format(
                            'h:mm a'
                          )} - ${moment(todo.endTime).format('h:mm a')}`}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          color: appColor.gray600,
                        }}>
                        {moment(todo.date).calendar({
                          sameDay: '[Today]',
                          nextDay: '[Tomorrow]',
                          nextWeek: 'dddd',
                          lastDay: '[Yesterday]',
                          lastWeek: '[Last] dddd',
                          sameElse: 'DD/MM/YYYY',
                        })}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            )}
          </Box>
          <Divider
            sx={{
              mt: '2rem',
              mb: '1.25rem',
              display: ['none', 'none', 'block'],
            }}
          />
          <Stack spacing={2} sx={{ display: ['none', 'none', 'block'] }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Stack>
          <Box
            sx={{
              mt: '1rem',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
            }}>
            <TextField
              id="filled-start-adornment"
              fullWidth
              onClick={toggleDrawer(true)}
              placeholder="Input task"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      //   onClick={handleClickShowPassword}
                      //   onMouseDown={handleMouseDownPassword}
                      edge="end">
                      <MicrophoneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                display: ['block', 'block', 'none'],
                padding: '0.5rem 0.75rem',
                zIndex: 10,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.5rem',
                  backgroundColor: '#fff',
                  border: `1px solid ${appColor.gray300}`,
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                },
              }}
              inputProps={{
                style: {
                  height: '3rem',
                },
              }}
            />
          </Box>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ ml: '20px', mr: '20px', display: ['none', 'none', 'block'] }}
        />
        <Grid item xs={12} md={3.6} sx={{ width: '100%' }}>
          <Box
            sx={{ width: '100%', p: '0 ', display: ['none', 'none', 'block'] }}>
            {isInputMode ? (
              <AddEditTodo
                onChange={handleFormChange}
                setFormData={setFormData}
                formData={formData}
                onClose={handleCloseInputMode}
                onSubmit={handleSubmit}
                isLoading={isLoadingCreateTodo}
                isLoadingUpdate={isLoadingUpdateTodo}
                isEditing={isEditing}
                selectedRow={selectedRow}
              />
            ) : isViewMode ? (
              <TodoDetails
                onClose={handleCloseViewMode}
                onEdit={handleOpenInputMode}
                selectedRow={selectedRow}
                setIsEditing={setIsEditing}
                onDelete={handleDelete}
                isLoadingDelete={isLoadingDeleteTodo}
              />
            ) : (
              <TodoCalendar
                todosData={todos.rows}
                handleDateButton={handleDateButton}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '1.75rem 1.75rem 0rem 0rem',
          },
        }}>
        <Box
          sx={{
            p: '1.5rem',
          }}>
          {isInputMode ? (
            <AddEditTodo
              onChange={handleFormChange}
              setFormData={setFormData}
              formData={formData}
              onClose={handleCloseInputMode}
              onSubmit={handleSubmit}
              isLoading={isLoadingCreateTodo}
              isLoadingUpdate={isLoadingUpdateTodo}
              isEditing={isEditing}
              selectedRow={selectedRow}
            />
          ) : (
            isViewMode && (
              <TodoDetails
                onClose={handleCloseViewMode}
                onEdit={handleOpenInputMode}
                selectedRow={selectedRow}
                setIsEditing={setIsEditing}
                onDelete={handleDelete}
                isLoadingDelete={isLoadingDeleteTodo}
              />
            )
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Todos;
