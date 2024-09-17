import React, { useContext } from 'react'
import { DesignContext } from '../../context/DesignContext'
import { useDeleteAccountMutation } from '../../services/taskApis';
import toast from 'react-hot-toast';

function DeleteAccountPopup() {
  const { deleteAccountPopup, setDeleteAccountPopup, setDeletePopup } = useContext(DesignContext);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const handler = (e) => e.target.classList.contains('parent') && setDeleteAccountPopup(false);

  const accountDeleteHandler = async () => {
    try {
      const result = await deleteAccount().unwrap();
      toast.success(result?.msg, {
        style: {
          background: "#1f2937",
          color: "#f3f4f6",
          fontSize: "14px",
          padding: "15px 20px",
          border: "1px solid #374151",
        },
      });
      localStorage.removeItem('_token');
      setDeleteAccountPopup(false);
      setDeletePopup(false);
      document.location = '/auth/login';
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

  return (
    <div className='w-full z-20 h-screen fixed top-0 parent bg-gray-900/70' onClick={handler}>
      <div className={`${deleteAccountPopup ? 'scaleAnimShow' : ''} border max-w-[400px] border-gray-700 bg-gray-800 p-6 absolute -top-0 -right-0 -bottom-0 -left-0 m-auto flex flex-col justify-between max-md:justify-start`}>

        {/* <div>
          s
        </div> */}

        <div className='flex justify-center flex-col items-center gap-3'>
          <img className='w-36' src="warning-3d.png" alt="" />
          <p className='text-xl font-semibold text-gray-200'>Permanently Account Deletion.</p>
          <p className='text-xs text-center text-gray-400'>Once you delete your account all your activities (tasks, labels) would be deleted and never undo.</p>
        </div>

        <div className='flex items-center gap-2 mt-8'>
          <button onClick={() => setDeleteAccountPopup(false)} className='text-[13px] w-full border border-gray-700 active:border-gray-600 transition-all active:bg-gray-700 text-gray-200 py-2 px-4 rounded-full font-medium'>Cancel</button>
          <button onClick={accountDeleteHandler} className='text-[13px] grid place-content-center w-full bg-red-500 hover:bg-red-600 text-gray-200 py-[10px] px-4 rounded-full font-medium'>
            {
              isLoading ? (
                <div className="h-[19px] w-[19px] border-[2px] border-t-red-500 border-gray-950 animate-spin rounded-full"></div>
              ) : (
                <span>Delete</span>
              )
            }
          </button>
        </div>

      </div>
    </div>
  )
}

export default DeleteAccountPopup
