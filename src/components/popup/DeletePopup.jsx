import React, { useContext } from 'react'
import { DesignContext } from '../../context/DesignContext'
import { useDeleteTaskMutation } from '../../services/taskApis';
import toast from 'react-hot-toast';
import { ServerContext } from '../../context/ServerContext';

function DeletePopup() {
  const { deletePopup, setDeletePopup } = useContext(DesignContext);
  const { clickTaskId } = useContext(ServerContext)
  const handler = (e) => e.target.classList.contains('parent') && setDeletePopup(false);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation()

  const deleteHandler = async () => {
    try {
      const result = await deleteTask(clickTaskId).unwrap();
      toast.success(result?.msg, {
        style: {
          background: "#1f2937",
          color: "#f3f4f6",
          fontSize: "14px",
          padding: "15px 20px",
          border: "1px solid #374151",
        },
      });
      setDeletePopup(false)
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
      <div className={`${deletePopup ? 'scaleAnimShow' : ''} border-b rounded-b-xl max-w-96 border-l border-r border-gray-700 bg-gray-800 m-auto p-6 text-gray-200`}>

        <p className='text-md font-bold'>Are you sure want to delete?</p>
        <p className='text-xs mt-2 text-gray-400'>Once you delete a task then you never undo it.</p>
        <div className='flex items-center gap-2 mt-8'>
          <button onClick={() => setDeletePopup(false)} className='text-[13px] w-full border border-gray-700 active:border-gray-600 transition-all active:bg-gray-700 text-gray-200 py-2 px-4 rounded-full font-medium'>Cancel</button>
          <button onClick={deleteHandler} className='text-[13px] grid place-content-center w-full bg-red-500 hover:bg-red-600 text-gray-200 py-[10px] px-4 rounded-full font-medium'>
            {
              isLoading ? (
                <div className="h-[20px] w-[20px] border-[2px] border-t-red-500 border-gray-950 animate-spin rounded-full"></div>
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

export default DeletePopup
