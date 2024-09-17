import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { DesignContext } from '../context/DesignContext';

function DashboardAccountOption({ icon, title }) {
  const { setLogoutPopup, setDashboardAccountPopup, setSettingsPopup } = useContext(DesignContext);

  const handler = () => {
    setDashboardAccountPopup(false);
    switch (title) {
      case 'Settings':
        setSettingsPopup(true)
        break;
      case 'Logout':
        setLogoutPopup(true)
        setTimeout(() => {
          setLogoutPopup(false);
          localStorage.removeItem("_token");
          document.location = '/auth/login';
        }, 2000)
        break;
    }
  }

  return (
    <div onClick={handler} className={`${title === 'Settings' && 'hidden max-lg:block'} text-gray-200 hover:bg-gray-900 select-none`}>
      <div className='flex justify-between items-center p-4'>
        <div className='flex items-center gap-3'>
          <FontAwesomeIcon
            icon={icon}
            className='text-md'
          />
          <p className='text-[13px] font-normal'>{title}</p>
        </div>
        <FontAwesomeIcon
          icon={faAngleRight}
          className='text-sm'
        />
      </div>
    </div>
  )
}

export default DashboardAccountOption
