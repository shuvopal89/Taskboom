import React, { useContext } from 'react'
import { DesignContext } from '../../context/DesignContext'
import ShowProfile from '../ShowProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { dashboardAccountOptions } from '../../utils/utils';
import DashboardAccountOption from '../DashboardAccountOption';

function DashboardAccountPopup() {
  const { setDashboardAccountPopup, setSettingsPopup } = useContext(DesignContext)
  const handler = (e) => e.target.classList.contains('parent') && setDashboardAccountPopup(false);
  return (
    <div className='w-full z-20 h-screen absolute top-0 parent hover:cursor-pointer' onClick={handler}>
      <div className='w-72 h-max float-end rounded-xl border border-gray-700 bg-gray-800 mt-16 mr-5 pb-3'>

        {/* Dashboard account popup header */}
        <div className='border-b border-gray-700'>
          <div onClick={() => {
            setSettingsPopup(true);
            setDashboardAccountPopup(false);
          }} className='flex justify-between items-center hover:bg-gray-900 p-2 rounded-lg m-2 select-none'>
            <ShowProfile isHidden={false} />
            <FontAwesomeIcon
              icon={faAngleRight}
              className='text-gray-200 mr-1 text-sm'
            />
          </div>
        </div>

        {/* Dashboard account options section */}
        <div className='flex flex-col mt-2'>
          {
            dashboardAccountOptions.map((item, index) => {
              return (
                <DashboardAccountOption
                  key={index}
                  icon={item.icon}
                  title={item.title}
                />
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default DashboardAccountPopup
