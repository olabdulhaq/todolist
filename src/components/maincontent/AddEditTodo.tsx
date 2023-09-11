import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';

import moment, { Moment } from 'moment';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import LoadingButton from '@mui/lab/LoadingButton';

import CloseIcon from '@mui/icons-material/Close';

import { appColor } from '../../constants/color';
import { BellIcon } from '../../icons';
import { TasksProps } from '../../types';

interface TaskFormProps {
  task: string;
  date: Moment;
  startTime: Moment;
  endTime: Moment;
}

interface IProps {
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFormData: Dispatch<SetStateAction<TaskFormProps>>;
  formData: TaskFormProps;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  isLoadingUpdate: boolean;
  isEditing: boolean;
  selectedRow: TasksProps | null;
}

const AddEditTodo = ({
  onChange,
  setFormData,
  formData,
  onClose,
  onSubmit,
  isLoading,
  isLoadingUpdate,
  isEditing,
  selectedRow,
}: IProps) => {
  useEffect(() => {
    if (!isEditing) return
      setFormData({
        task: selectedRow?.task as string,
        date: moment(selectedRow?.date),
        startTime: moment(selectedRow?.startTime),
        endTime: moment(selectedRow?.endTime),
      })
      console.log('editing', isEditing)
      console.log('selectedRow', selectedRow)
    
  }, [isEditing, selectedRow, setFormData]);

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        boxShadow: [
          'none',
          'none',
          '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
        ],
      }}>
      <CardHeader
        sx={{ py: 0 }}
        title={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography>Edit</Typography>
            <IconButton
              aria-label="close"
              sx={{
                color: '#09121F',
              }}
              onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        }
      />
      <CardContent>
        <TextField
          name="task"
          fullWidth
          multiline
          value={formData.task}
          onChange={onChange}
          sx={{
            background: appColor.gray50,
            '& .MuiOutlinedInput-root': {
              outline: 'none',
              borderRadius: '0.5rem',
              border: `1px solid ${appColor.gray300}`,
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
              '&:hover': {
                borderColor: 'transparent',
              },
            },
          }}
          inputProps={{
            style: {
              height: '8.75rem',
            },
          }}
        />
        <Box>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ display: 'flex', gap: 1, mt: '1rem' }}>
              <DatePicker
                value={formData.date}
                onChange={(newValue: string | any) => {
                  console.log('date', newValue);
                  setFormData({ ...formData, date: newValue });
                }}
                slotProps={{
                  inputAdornment: {
                    position: 'start',
                    sx: {
                      '& .MuiIconButton-root': {
                        p: 0,
                      },
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    padding: '0.625rem 1rem',
                    outline: 'none',
                    borderRadius: '0.5rem',
                    border: `1px solid ${appColor.gray300}`,
                    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                    color: appColor.gray500,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    lineHeight: '1.25rem',
                    height: '2.51rem',
                  },
                }}
              />
              <TimePicker
                value={formData.startTime}
                onChange={(newValue: string | any) =>
                  setFormData({ ...formData, startTime: newValue })
                }
                slotProps={{
                  inputAdornment: {
                    position: 'start',
                    sx: {
                      '& .MuiIconButton-root': {
                        p: 0,
                      },
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    padding: '0.625rem 1rem',
                    outline: 'none',
                    borderRadius: '0.5rem',
                    border: `1px solid ${appColor.gray300}`,
                    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                    color: appColor.gray500,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    lineHeight: '1.25rem',
                    height: '2.51rem',
                  },
                }}
              />
              <TimePicker
                value={formData.endTime}
                onChange={(newValue: string | any) =>
                  setFormData({ ...formData, endTime: newValue })
                }
                slotProps={{
                  inputAdornment: {
                    position: 'start',
                    sx: {
                      '& .MuiIconButton-root': {
                        p: 0,
                      },
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    padding: '0.625rem 1rem',
                    outline: 'none',
                    borderRadius: '0.5rem',
                    border: `1px solid ${appColor.gray300}`,
                    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                    color: appColor.gray500,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    lineHeight: '1.25rem',
                    height: '2.51rem',
                  },
                }}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem' }}>
          <BellIcon />
          <Typography sx={{ mr: 'auto', ml: '0.5rem' }}>
            10 Minute before
          </Typography>
          <IconButton size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: '2.16rem',
            gap: '0.75rem',
          }}>
          <Button
            variant="outlined"
            sx={{
              width: '10.16rem',
              height: '2.44rem',
              minWidth: 0,
              color: appColor.gray700,
              fontFamily: 'Inter',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '0.625rem 1.125rem',
              borderRadius: '0.5rem',
              border: `1px solid ${appColor.gray300}`,
              background: '#FFF',
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            }}>
            Delete
          </Button>
          <LoadingButton
            variant="contained"
            loading={isEditing ? isLoadingUpdate : isLoading}
            onClick={onSubmit}
            sx={{
              width: '10.16rem',
              height: '2.44rem',
              color: '#fff',
              fontFamily: 'Inter',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '0.625rem 1.125rem',
              borderRadius: '0.5rem',
              border: `1px solid ${appColor.gray300}`,
              background: appColor.primary,
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            }}>
           {isEditing ? 'Save' : 'Add'}
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddEditTodo;
