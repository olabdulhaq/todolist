import React, { Dispatch, SetStateAction } from 'react'
import moment from 'moment';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { appColor } from '../../constants/color';
import { CalendarIcon, ClockIcon } from '../../icons';
import { TasksProps } from '../../types';
import { LoadingButton } from '@mui/lab';

interface IProps {
  onClose: () => void
  onEdit: () => void
  selectedRow: TasksProps | null
  setIsEditing: Dispatch<SetStateAction<boolean>>
  onDelete: () => void
  isLoadingDelete: boolean
}

const TodoDetails = ({onClose, onEdit, selectedRow, setIsEditing, isLoadingDelete, onDelete}:IProps) => {
  return (
    <Card
            elevation={0}
            sx={{
              boxShadow:
                '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
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
                    onClick={onClose}
                    >
                    <CloseIcon />
                  </IconButton>
                </Box>
              }
            />
            <CardContent>
              <Typography
                sx={{
                  mb: '2rem',
                  color: appColor.grayNormal,
                  fontFamily: 'Satoshi',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  lineHeight: '120%',
                }}>
                {selectedRow?.task}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.56rem',
                }}>
                <Stack direction="row" gap="0.5rem">
                  <CalendarIcon />
                  <span
                    style={{
                      color: appColor.grayNormal,
                      fontSize: '1rem',
                      fontWeight: 500,
                      lineHeight: '120%',
                    }}>
                    {moment(selectedRow?.date).format('Do MMMM, YYYY')}
                  </span>
                </Stack>
                <Stack direction="row" gap="0.5rem">
                  <ClockIcon />
                  <span
                    style={{
                      color: appColor.grayNormal,
                      fontSize: '1rem',
                      fontWeight: 500,
                      lineHeight: '120%',
                    }}>
                    {`${moment(selectedRow?.startTime).format('h:mm')} - ${moment(selectedRow?.endTime).format('h:mm A')}`}
                  </span>
                </Stack>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: '2.16rem',
                  gap: '0.75rem',
                }}>
                <LoadingButton
                  variant="outlined"
                  loading={isLoadingDelete}
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
                  }}
                  onClick={onDelete}
                  >
                  Delete
                </LoadingButton>
                <Button
                  variant="contained"
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
                  }}
                  onClick={() => {
                    onEdit()
                    onClose()
                    setIsEditing(true)
                  }}
                  >
                  Edit
                </Button>
              </Box>
            </CardContent>
          </Card>
  )
}

export default TodoDetails