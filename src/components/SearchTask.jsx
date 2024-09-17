import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useDateFormatter } from '../hooks/useDateFormatter'
import { DesignContext } from '../context/DesignContext';
import { ServerContext } from '../context/ServerContext';

const textSmaller = (text) => {
  if (text.length <= 45) return text;

  const sliced = text.slice(0, 45) + "...";
  return sliced;
}

function SearchTask({ id, title, createdAt }) {

  const { setShowTaskPopup, setIsShowSearch } = useContext(DesignContext);
  const { setClickSearchTaskId } = useContext(ServerContext);

  const searchTaskClickHandler = () => {
    setIsShowSearch(false);
    setClickSearchTaskId(id)
    setShowTaskPopup(true)
  }

  return (
    <div onClick={searchTaskClickHandler} className='px-4 py-3 hover:cursor-pointer hover:bg-gray-950 searchItem flex items-center justify-between'>
      <div className='flex items-center gap-4 text-gray-200'>
        <FontAwesomeIcon
          icon={faClock}
          className='text-ms'
        />
        <p className='text-[13px] font-medium'>{textSmaller(title)}</p>
      </div>
      <p className='text-xs text-gray-400 flex-shrink-0'>{useDateFormatter(new Date(createdAt))}</p>
    </div>
  )
}

export default SearchTask
