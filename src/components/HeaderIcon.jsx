import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DesignContext } from '../context/DesignContext'
import { useNavigate } from 'react-router-dom';
import { useDeleteLabelMutation } from '../services/taskApis';
import toast from 'react-hot-toast';

function HeaderIcon({ icon, id, label }) {
  const [deleteLabel, { isLoading }] = useDeleteLabelMutation();
  const { setSettingsPopup } = useContext(DesignContext);
  const navigate = useNavigate();

  const deleteLabelHandler = async () => {
    try {
      const result = await deleteLabel(label).unwrap();
      toast.success(result?.msg, {
        style: {
          background: "#1f2937",
          color: "#f3f4f6",
          fontSize: "14px",
          padding: "15px 20px",
          border: "1px solid #374151",
        },
      });
      navigate('/labels');
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

  const handler = () => {
    switch (id) {
      case 1:
        navigate('/create-task');
        break;
      case 2:
        setSettingsPopup(true);
        break;
      case 3:
        const isConfirm = confirm('Are you sure want to delete the label?');
        if (isConfirm) {
          deleteLabelHandler()
        } else {
          return;
        }
        break;
    }
  }

  return (
    <div onClick={handler} className={`h-11 w-11 flex justify-center items-center border bg-gradient-to-l from-gray-800 to-gray-900 border-gray-800 rounded-full hover:cursor-pointer transition-all active:scale-90 ${id === 2 && 'max-lg:hidden'}`}>
      {
        (id === 3 && isLoading) ? (
          <div className='h-5 w-5 border-[2px] border-t-green-500 border-r-green-500 border-b-green-500 border-l-transparent animate-spin rounded-full'></div>
        ) : (
          <FontAwesomeIcon
            icon={icon}
            className='text-lg text-gray-200'
          />
        )
      }
    </div>
  )
}

export default HeaderIcon
