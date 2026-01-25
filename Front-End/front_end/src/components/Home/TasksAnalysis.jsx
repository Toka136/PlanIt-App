import React from 'react';
import { useTasks } from '../../API/Context/TasksContext';

const TasskAnalysis = () => {
 

  const {tasks}=useTasks();
  const Completionrate=(tasks?.filter((task) => task.status === "Completed").length / tasks.length) * 100
  const overDueTasks=tasks?.filter((task) => new Date(task.dueDate) < new Date()).length
 const priorities = [
    { label: 'High Priority', count: tasks?.filter((task) => task.priority === "High").length, color: 'bg-red-500' },
    { label: 'Medium Priority', count: tasks?.filter((task) => task.priority === "Medium").length, color: 'bg-orange-500' },
    { label: 'Low Priority', count: tasks?.filter((task) => task.priority === "Low").length, color: 'bg-emerald-500' },
  ];
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-sans text-slate-700">
      {/* Task Statistics Header */}
      <h2 className="text-xl font-semibold mb-8 text-slate-900">Task Statistics</h2>

      {/* Completion Rate Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-slate-500 font-medium text-lg">Completion Rate</span>
          <span className="text-slate-800 font-semibold text-lg">{Completionrate}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500 rounded-full" 
            style={{ width:`${Completionrate}%` }}
          ></div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="mb-8">
        <h3 className="text-slate-500 font-medium text-lg mb-4">Priority Breakdown</h3>
        <div className="space-y-4">
          {priorities.map((item) => (
            <div key={item.label} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-slate-600 text-lg">{item.label}</span>
              </div>
              <span className="text-slate-900 font-medium text-lg">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overdue Tasks Box */}
      <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 mb-10 flex justify-between items-center">
        <div>
          <h4 className="text-slate-800 text-lg font-medium">Overdue Tasks</h4>
          <p className="text-slate-500">Tasks past their due date</p>
        </div>
        <span className="text-red-700 text-2xl font-semibold">{overDueTasks}</span>
      </div>

      {/* Recent Activity */}
      <div>
        <h6 className="text-slate-500 font-medium text-[20px] mb-16 text-start ">Recent Activity</h6>
        <div className="space-y-8">
          {/* {activities.map((activity) => (
            <div key={activity.title} className="flex gap-4">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activity.dotColor}`}></div>
              <div>
                <h5 className="text-slate-800 text-[16px] font leading-tight text-start">{activity.title}</h5>
                <p className="text-slate-400 font-normal text-sm text-start">{activity.status}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default TasskAnalysis;