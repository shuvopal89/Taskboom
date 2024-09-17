import React, { useContext, useState } from 'react'
import { DesignContext } from '../../context/DesignContext'
import CreateButton from '../CreateButton';
import { useCreateLabelMutation } from '../../services/taskApis';
import toast from 'react-hot-toast';

function CreateLabelPopup() {
    const [label, setLabel] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { setCreateLabelPopup, createLabelPopup } = useContext(DesignContext);
    const [createLabel, { isLoading }] = useCreateLabelMutation();

    const handler = (e) => e.target.classList.contains('parent') && setCreateLabelPopup(false);

    const labelHandler = (e) => {
        if (!(e.target.value.length > 20)) {
            setLabel(e.target.value);
        }
    }

    const createLabelHandler = async () => {
        try {
            const result = await createLabel({ name: label }).unwrap();
            toast.success(result?.msg, {
                style: {
                    background: "#1f2937",
                    color: "#f3f4f6",
                    fontSize: "14px",
                    padding: "15px 20px",
                    border: "1px solid #374151",
                },
            });
            setErrorMsg("");
            setCreateLabelPopup(false);
        } catch (err) {
            setErrorMsg(err?.data?.msg);
        }
    }

    return (
        <div className='w-full z-20 h-screen fixed top-0 parent bg-gray-900/70' onClick={handler}>
            <div className={`max-w-[500px] h-max rounded-b-xl bg-gray-800 m-auto p-6 border-l border-r border-b border-gray-700 text-gray-200 gap-3 ${createLabelPopup ? 'scaleAnimShow' : ''}`}>

                <p className='text-md font-medium text-gray-200'>Create a label</p>
                <div className='relative'>
                    <input autoFocus onChange={labelHandler} className={`w-full p-4 bg-gray-900 text-sm mt-4 rounded-xl placeholder:text-gray-500 border-2 ${!errorMsg ? 'border-gray-700 focus:border-gray-500' : 'border-red-500'} outline-none caret-gray-500`} type="text" placeholder='Label name' value={label} />
                    {errorMsg && <p className='text-[13px] text-red-500 mt-2'>{errorMsg}</p>}
                    <p className={`text-[12px] font-medium absolute top-[34px] right-5 ${label.length >= 20 ? 'text-red-500' : 'text-gray-500'}`}>{`${label.length}/20`}</p>
                    <p className='text-xs mt-3 text-gray-400'>Label name cannot be changed after creation.</p>
                </div>
                <div className='mt-6'>
                    <CreateButton title='Create' width={'w-20'} handler={createLabelHandler} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}

export default CreateLabelPopup
