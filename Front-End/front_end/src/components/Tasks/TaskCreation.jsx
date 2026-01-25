import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, ToggleButtonGroup, ToggleButton, Typography, IconButton 
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, useFormik } from 'formik';
import * as Yup from "yup";
import { useTasks } from '../../API/Context/TasksContext';
import { toast } from 'react-toastify';


export const AddTaskModal = ({ open, onClose }) => {
//   const [status, setStatus] = useState('Not Started');
console.log("open=>",open)
const {addTask,Error}=useTasks()
 const taskSchema=Yup.object({
    title:Yup.string().required("Title is required"),
    description:Yup.string().required("Description is required"),
    dueDate:Yup.date().required("Due Date is required").min(new Date(), "Due Date must be in the future"),
    priority:Yup.string().required("Priority is required"),
  })
  const formik=useFormik({
    initialValues:{
      title:"",
      description:"",
      dueDate:"",
      priority:"",
      
    },
    validationSchema:taskSchema,
    onSubmit:(values)=>handleAddTask(values)
  })
 
  const success=()=>toast.success("task added successfully")
  const error=()=>toast.error("task not added")
  const handleAddTask= async(values)=>
  {
    console.log("taskValues=>",values)
     await addTask(values);
     if(Error)
      error();
    else
      success();
      onClose();
  }
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
     <form onSubmit={formik.handleSubmit}>
      <DialogContent className="p-8 space-y-6 overflow-y-auto">
        {/* Task Title */}
        <Box>
          <Typography className="text-sm font-bold text-slate-600 mb-2 text-center">
            Task Title <span className="text-red-500">*</span>
          </Typography>
          <TextField 
          name='title'
            fullWidth 
            placeholder="Enter task title"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            slotProps={{
              input: { className: "rounded-xl border-2 border-emerald-500" }
            }}
          />
          {formik.errors.title&&formik.touched.title?
          <p className="text-red-500 text-sm">{formik.errors.title}</p>:null}
        </Box>

        {/* Description */}
        <Box>
          <Typography className="text-sm font-bold text-slate-600 mb-2 text-center">Description</Typography>
          <TextField 
          name='description'
            fullWidth 
            multiline 
            rows={4} 
            placeholder="Add more details..."
            variant="outlined"
            className="rounded-xl"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.errors.description&&formik.touched.description?
          <p className="text-red-500 text-sm">{formik.errors.title}</p>:null}
        </Box>

        {/* Due Date */}
        <Box>
          <Typography className="text-sm font-bold text-slate-600 mb-2 text-center">
            Due Date <span className="text-red-500">*</span>
          </Typography>
          <TextField 
          name='dueDate'
          type='date'
            fullWidth 
            defaultValue={new Date().toISOString().split('T')[0]}
            InputProps={{
              endAdornment: <FontAwesomeIcon icon={faCalendarAlt} className="text-slate-400" />
            }}
             value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
            {formik.errors.dueDate&&formik.touched.dueDate?
          <p className="text-red-500 text-sm">{formik.errors.dueDate}</p>:null}
        </Box>


        {/* Priority Selection */}
        <Box>
          <Typography className="text-sm font-bold text-slate-600 mb-3 text-center">
            Priority <span className="text-red-500">*</span>
          </Typography>
          <ToggleButtonGroup
          name='priority'
            value={formik.values.priority}
            exclusive
            onChange={(event,newPriority)=>{
              if(newPriority!=null)
                formik.setFieldValue("priority",newPriority)
            }}
            onBlur={(event,newPriority)=>{
              if(newPriority!=null)
                formik.setFieldTouched("priority",true)
            }}
            fullWidth
            className="gap-4"
          >
            {['High', 'Medium', 'Low'].map((p) => (
              <ToggleButton 
                key={p} 
                value={p}
                className={`py-4 rounded-xl border border-slate-200! capitalize font-bold
                  ${formik.values.priority === p ? 'border-2! border-orange-400! bg-orange-50! text-orange-600!' : ''}`}
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
         type='submit'
          variant="contained"
          className="flex-1 py-4 bg-[#059669] hover:bg-[#047857] text-white rounded-xl font-bold normal-case shadow-lg"
        >
          Create Task
        </Button>
      </DialogActions>
</form>
    </Dialog>
  );
};