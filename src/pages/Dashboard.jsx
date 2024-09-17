import React from "react";
import Overview from "../components/Overview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import Task from "../components/Task";
import { Line } from "react-chartjs-2";
import { dailySummuryOptions } from "../utils/chartData";
import { useDateFormatter } from "../hooks/useDateFormatter";
import Title from "../components/Title";
import { useChangeToAllCompletedMutation, useGetTasksAndLabelsQuery } from "../services/taskApis";
import {
  faListCheck,
  faBarsProgress,
  faSquareCheck,
  faSquareMinus,
  faPen,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import DashboardSkeleton from "../components/Skeleton/DashboardSkeleton";
import toast from "react-hot-toast";

const getTotalTaskNumber = (data, status, date) => {
  if (date) {
    return data?.tasks?.filter((task) => task?.status === status && useDateFormatter(new Date(task?.createdAt)) === useDateFormatter(new Date()))?.length;
  }
  return data?.tasks?.filter((task) => task?.status === status)?.length;
}

function Dashboard() {
  const { data, isLoading } = useGetTasksAndLabelsQuery();
  const [changeToAllCompleted] = useChangeToAllCompletedMutation()

  const TodayLabels = data?.labels?.filter((label) => label?.isRegular !== true && useDateFormatter(new Date(label?.createdAt)) === useDateFormatter(new Date()))?.length

  const dailySummuryData = {
    labels: ['New', 'Running', 'Completed', 'Canceled', 'Label'],
    datasets: [
      {
        label: 'Daily Summury',
        data: [
          getTotalTaskNumber(data, 'New', true),
          getTotalTaskNumber(data, 'Running', true),
          getTotalTaskNumber(data, 'Completed', true),
          getTotalTaskNumber(data, 'Canceled', true),
          TodayLabels
        ],
        fill: false,
        borderColor: '#9ca3af',
        backgroundColor: '#9ca3af',
        tension: 0.5,
      },
    ],
  };

  const overviewSections = [
    {
      id: 1,
      icon: faPen,
      title: "Total Task",
      number: data?.tasks?.length <= 9 ? '0' + data?.tasks?.length : data?.tasks?.length,
      today: data?.tasks?.filter((task) => useDateFormatter(new Date(task?.createdAt)) === useDateFormatter(new Date())).length <= 9 ? '0' + data?.tasks?.filter((task) => useDateFormatter(new Date(task?.createdAt)) === useDateFormatter(new Date())).length : data?.tasks?.filter((task) => useDateFormatter(new Date(task?.createdAt)) === useDateFormatter(new Date()))?.length
    },
    {
      id: 2,
      icon: faListCheck,
      title: "Total New",
      number: getTotalTaskNumber(data, 'New') <= 9 ? '0' + getTotalTaskNumber(data, 'New') : getTotalTaskNumber(data, 'New'),
      today: getTotalTaskNumber(data, 'New', true) <= 9 ? '0' + getTotalTaskNumber(data, 'New', true) : getTotalTaskNumber(data, 'New', true)
    },
    {
      id: 3,
      icon: faBarsProgress,
      title: "Total Running",
      number: getTotalTaskNumber(data, 'Running') <= 9 ? '0' + getTotalTaskNumber(data, 'Running') : getTotalTaskNumber(data, 'Running'),
      today: getTotalTaskNumber(data, 'Running', true) <= 9 ? '0' + getTotalTaskNumber(data, 'Running', true) : getTotalTaskNumber(data, 'Running', true)
    },
    {
      id: 4,
      icon: faSquareCheck,
      title: "Total Completed",
      number: getTotalTaskNumber(data, 'Completed') <= 9 ? '0' + getTotalTaskNumber(data, 'Completed') : getTotalTaskNumber(data, 'Completed'),
      today: getTotalTaskNumber(data, 'Completed', true) <= 9 ? '0' + getTotalTaskNumber(data, 'Completed', true) : getTotalTaskNumber(data, 'Completed', true)
    },
    {
      id: 5,
      icon: faSquareMinus,
      title: "Total Canceled",
      number: getTotalTaskNumber(data, 'Canceled') <= 9 ? '0' + getTotalTaskNumber(data, 'Canceled') : getTotalTaskNumber(data, 'Canceled'),
      today: getTotalTaskNumber(data, 'Canceled', true) <= 9 ? '0' + getTotalTaskNumber(data, 'Canceled', true) : getTotalTaskNumber(data, 'Canceled', true)
    },
    {
      id: 6,
      icon: faTags,
      title: "Total Labels",
      number: data?.labels?.filter((label) => label?.name !== 'Regular').length <= 9 ? '0' + data?.labels?.filter((label) => label?.name !== 'Regular').length : data?.labels?.filter((label) => label?.name !== 'Regular')?.length,
      today: TodayLabels <= 9 ? '0' + TodayLabels : TodayLabels
    },
  ];
  const tasks = data?.tasks?.filter(task => task?.status === 'Running' && useDateFormatter(new Date(task?.createdAt)) === useDateFormatter(new Date()));

  const completedAllRunningHandler = async () => {
    try {
      const result = await changeToAllCompleted().unwrap();
      toast.success(result?.msg, {
        style: {
          background: "#1f2937",
          color: "#f3f4f6",
          fontSize: "14px",
          padding: "15px 20px",
          border: "1px solid #374151",
        },
      });
    } catch (err) {
      toast.error(err?.data?.msg, {
        style: {
          background: "#1f2937",
          color: "#f3f4f6",
          fontSize: "14px",
          padding: "15px 20px",
          border: "1px solid #374151",
        },
      });
    }
  }

  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="p-3">
      <Title title={"Taskboom"} />
      {/* Dashboard overview section */}
      <div className="grid grid-cols-3 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2">
        {overviewSections.map((item, index) => {
          return (
            <Overview
              key={index}
              title={item.title}
              number={item.number}
              today={item.today}
            />
          );
        })}
      </div>
      {/* Dashboard today tasks and graph section */}
      <div className="flex mt-3 gap-3 max-lg:flex-col">
        {/* Dashboard today tasks section */}
        <div className="w-[418px] select-none max-lg:w-full">
          {/* Today tasks header section */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Today Running</h2>
            <div onClick={completedAllRunningHandler} className="h-10 w-10 border border-gray-900 active:bg-gray-800 active:border-gray-700 hover:cursor-pointer grid place-items-center rounded-full transition-all">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-lg text-gray-200"
              />
            </div>
          </div>
          {/* Today tasks content section */}
          <div className="mt-3 flex flex-col divide-y divide-gray-700 max-h-[600px] border overflow-y-scroll hideScrollbar bg-gray-800 border-gray-700 rounded-xl">
            {
              tasks?.length <= 0 ? (
                <div className="w-full h-[400px] grid place-content-center">
                  <p className="text-[13px] text-gray-500 font-medium">No Running Tasks</p>
                </div>
              ) : (
                tasks
                  ?.map((task, index) => {
                    return (
                      <Task
                        key={index}
                        id={task._id}
                        title={task.title}
                        status={task.status}
                        label={task.label}
                        priority={task.priority}
                        created={task.createdAt}
                      />
                    );
                  })
              )
            }
          </div>
        </div>
        {/* Dashboard chart section */}
        <div className="chartSection border h-max bg-gray-800 bg-gradient-to-b from-gray-900 to-gray-800 border-gray-800 p-3 rounded-xl">
          <Line data={dailySummuryData} options={dailySummuryOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
