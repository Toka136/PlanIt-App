import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faSearch, 
  faCalendarAlt, 
  faPen, 
  faTrash, 
  faXmark, 
  faCircleQuestion 
} from '@fortawesome/free-solid-svg-icons';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, ToggleButtonGroup, ToggleButton, Typography, IconButton 
} from '@mui/material';

const Task = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Example state based on your screenshots
  const [tasks] = useState([
    { id: 1, title: 'Prepare presentation slides', desc: 'Create slides for the quarterly review meeting', priority: 'High', date: 'Nov 29', status: 'In Progress' },
    { id: 2, title: 'Review pull requests', desc: 'Review and merge pending PRs from the team', priority: 'Medium', date: 'Nov 30', status: 'Not Started' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-slate-700">
      <div className="max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
            <p className="text-slate-500 mt-1">{tasks.length} active tasks</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-5 py-2.5 rounded-xl transition-all shadow-sm font-semibold"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-1 min-w-62.5">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <select className="border border-slate-200 rounded-xl px-4 py-2.5 bg-white outline-none min-w-[120px]">
            <option>All Tasks</option>
          </select>
          <select className="border border-slate-200 rounded-xl px-4 py-2.5 bg-white outline-none min-w-[140px]">
            <option>Sort by Date</option>
            <option>Sort by Priority</option>
          </select>
        </div>

        {/* List of Tasks */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>

      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
      
      {/* Help Bubble */}
      <button className="fixed bottom-8 right-8 bg-[#1e293b] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
      </button>
    </div>
  );
};

const TaskItem = ({ task }) => {
  const priorityStyle = {
    High: "bg-red-50 text-red-600 border-red-100",
    Medium: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex gap-5">
        {/* Status Circle */}
        <div className="mt-1">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${task.status === 'In Progress' ? 'border-blue-500' : 'border-slate-300'}`}>
            {task.status === 'In Progress' && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-slate-800 tracking-tight">{task.title}</h3>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-slate-400 hover:text-slate-600"><FontAwesomeIcon icon={faPen} size="sm" /></button>
              <button className="text-slate-400 hover:text-red-500"><FontAwesomeIcon icon={faTrash} size="sm" /></button>
            </div>
          </div>
          <p className="text-slate-500 mt-1 mb-4 leading-relaxed">{task.desc}</p>
          
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-4 py-1.5 rounded-full border ${priorityStyle[task.priority]}`}>
              {task.priority}
            </span>
            <span className="flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full bg-red-50 text-red-600">
              <FontAwesomeIcon icon={faCalendarAlt} /> {task.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

 const AddTaskModal = ({ open, onClose }) => {
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

export default Task;