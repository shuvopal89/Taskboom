import React from 'react'
import { useGetTasksAndLabelsQuery, useIsAddToBottomMutation, useIsExpandMutation, useIsRedirectMutation } from '../services/taskApis';
import toast from 'react-hot-toast';

function SwitchItem({ id, title, value, bgActive, bgInactive, circleActive, circleInactive }) {
    const { refetch } = useGetTasksAndLabelsQuery();
    const [isAddToBottom] = useIsAddToBottomMutation();
    const [isExpand] = useIsExpandMutation();
    const [isRedirect] = useIsRedirectMutation();

    const handleSwitch = async () => {
        try {
            switch (id) {
                case 1:
                    await isAddToBottom({ value: !value }).unwrap();
                    refetch();
                    break;
                case 2:
                    await isExpand({ value: !value }).unwrap();
                    break;
                case 3:
                    await isRedirect({ value: !value }).unwrap();
                    break;
            }
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
        <div className='flex items-center justify-between py-[15px]'>
            <p className='text-[13px] font-normal text-zinc-200'>{title}</p>
            <div onClick={handleSwitch} className={`w-[39px] h-[23px] px-[2px] rounded-full flex items-center ${value ? bgActive : bgInactive} hover:cursor-pointer`}>
                <div className={`w-[19px] h-[19px] rounded-full switchCircle ${value ? 'switchCircleActive' : 'switchCircleInactive'} ${value ? circleActive : circleInactive}`}></div>
            </div>
        </div>
    )
}

export default SwitchItem
