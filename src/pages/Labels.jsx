import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Label from '../components/Label';
import { DesignContext } from '../context/DesignContext';
import Title from '../components/Title';
import { useGetTasksAndLabelsQuery } from '../services/taskApis';
import LabelSkeleton from '../components/Skeleton/LabelSkeleton';

function Labels() {
  const { setCreateLabelPopup } = useContext(DesignContext);
  const { data, isLoading } = useGetTasksAndLabelsQuery();

  if (isLoading) return <LabelSkeleton />

  return (
    <div className='p-3'>
      <Title title={"Taskboom - Labels"} />
      {/* Create label button */}
      <button onClick={() => setCreateLabelPopup(true)} className='flex items-center gap-2 text-gray-200 py-2 px-4 rounded-full border border-gray-800 active:scale-95 transition-all'>
        <FontAwesomeIcon
          icon={faPlus}
          className='text-lg text-gray-200'
        />
        <span className='text-[13px]'>Create label</span>
      </button>
      {/* All labels section */}
      <div className='grid grid-cols-4 gap-3 mt-3 select-none max-md:grid-cols-3 max-sm:grid-cols-2'>
        {
          data?.labels?.map((label, index) => <Label key={index} title={label?.name} />)
        }
      </div>
    </div>
  )
}

export default Labels