import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, ToggleButtonGroup, ToggleButton, Typography, IconButton 
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export const AddTaskModal = ({ open, onClose }) => {
  const [priority, setPriority] = useState('Medium');
//   const [status, setStatus] = useState('Not Started');

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      scroll="paper" 
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "rounded-[24px] !shadow-2xl" 
      }}
    >
      {/* Header */}
      <DialogTitle className="flex justify-between items-center px-8 py-5 border-b border-slate-50">
        <Typography variant="h6" className="font-bold text-slate-800">Add New Task</Typography>
        <IconButton onClick={onClose} className="text-slate-400">
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      </DialogTitle>

      {/* Scrollable Content */}
      <DialogContent className="p-8 space-y-6 overflow-y-auto">
        {/* Task Title */}
        <Box>
          <Typography className="text-sm font-bold text-slate-600 mb-2 text-center">
            Task Title <span className="text-red-500">*</span>
          </Typography>
          <TextField 
            fullWidth 
            placeholder="Enter task title"
            variant="outlined"
            slotProps={{
              input: { className: "rounded-xl border-2 border-emerald-500" }
            }}
          />
        </Box>

        {/* Description */}
        <Box>
          <Typography className="text-sm font-bold text-slate-600 mb-2 text-center">Description</Typography>
          <TextField 
            fullWidth 
            multiline 
            rows={4} 
            placeholder="Add more details..."
            variant="outlined"
            className="rounded-xl"
          />
        </Box>

        {/* Due Date */}
        <Box>
          <Typography className="text-sm font-bold text-slate-600 mb-2 text-center">
            Due Date <span className="text-red-500">*</span>
          </Typography>
          <TextField 
            fullWidth 
            defaultValue="01 / 12 / 2026"
            InputProps={{
              endAdornment: <FontAwesomeIcon icon={faCalendarAlt} className="text-slate-400" />
            }}
          />
        </Box>

        {/* Priority Selection */}
        <Box>
          <Typography className="text-sm font-bold text-slate-600 mb-3 text-center">
            Priority <span className="text-red-500">*</span>
          </Typography>
          <ToggleButtonGroup
            value={priority}
            exclusive
            onChange={(e, val) => val && setPriority(val)}
            fullWidth
            className="gap-4"
          >
            {['High', 'Medium', 'Low'].map((p) => (
              <ToggleButton 
                key={p} 
                value={p}
                className={`py-4 rounded-xl border !border-slate-200 capitalize font-bold
                  ${priority === p ? '!border-2 !border-orange-400 !bg-orange-50 !text-orange-600' : ''}`}
              >
                {p}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </DialogContent>

      {/* Fixed Actions */}
      <DialogActions className="p-8 flex gap-4 border-t border-slate-50">
        <Button 
          onClick={onClose} 
          className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 normal-case"
        >
          Cancel
        </Button>
        <Button 
          variant="contained"
          className="flex-1 py-4 bg-[#059669] hover:bg-[#047857] text-white rounded-xl font-bold normal-case shadow-lg"
        >
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};