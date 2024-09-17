import React, { useContext, useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { headerIcons } from '../utils/utils';
import HeaderIcon from './HeaderIcon';
import { DesignContext } from '../context/DesignContext';
import ShowProfile from './ShowProfile';
import Logo from './Logo';
import { useSearchQuery } from '../services/taskApis';
import SearchTask from './SearchTask';

function RightHeaderSection() {
    const [searchInput, setSearchInput] = useState("");
    const [debounce, setDebounce] = useState(searchInput);
    const searchRef = useRef(null);
    const searchBoxRef = useRef(null);
    const { setDashboardAccountPopup, isShowSearch, setIsShowSearch } = useContext(DesignContext);

    useEffect(() => {
        const callingTimeHandler = setTimeout(() => {
            setDebounce(searchInput);
        }, 400)

        return () => clearTimeout(callingTimeHandler);
    }, [searchInput])

    const { data, isFetching } = useSearchQuery({ name: searchInput }, { skip: !debounce });

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchRef.current && !searchRef.current.contains(event.target) &&
                searchBoxRef.current && !searchBoxRef.current.contains(event.target)
            ) {
                setIsShowSearch(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex items-center justify-between p-3 border-b bg-gray-900 border-gray-800 select-none'>
            {/* Right header search section (Left container) */}
            <div className='hidden max-md:block'>
                <Logo />
            </div>
            <div className='relative max-md:hidden'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input autoComplete='off' onFocus={() => setIsShowSearch(true)} ref={searchRef} className='text-sm font-medium border bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-800 w-[500px] max-[1100px]:w-[400px] py-3 rounded-full outline-none pl-10 pr-[91px] focus:border-gray-700 placeholder:text-gray-500 caret-gray-500' name='search' type="text" placeholder='Search tasks' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                </form>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className='text-sm text-gray-200 absolute top-[16px] left-4'
                />
                {
                    isShowSearch && (
                        <div ref={searchBoxRef} className='w-full max-h-[395px] rounded-xl border bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700 absolute top-[50px] overflow-y-scroll hideScrollbar'>
                            {
                                isFetching ? (
                                    <div className='flex items-center justify-center h-72'>
                                        <div className="h-[18px] w-[18px] border-[2.8px] border-t-green-500 border-r-green-500 border-b-green-500 border-l-transparent animate-spin rounded-full"></div>
                                    </div>
                                ) : (
                                    (data?.searchTasks?.length <= 0 && !data?._as) ? (
                                        <div className='h-72 grid place-content-center'>
                                            <p className="text-[13.5px] text-center py-36 text-gray-500 font-mediun">No Tasks Found</p>
                                        </div>
                                    ) : (
                                        data?.searchTasks?.map((searchTask, index) => {
                                            return (
                                                <SearchTask
                                                    key={index}
                                                    id={searchTask?._id}
                                                    title={searchTask?.title}
                                                    createdAt={searchTask?.createdAt}
                                                />
                                            )
                                        })
                                    )

                                )
                            }
                        </div>
                    )
                }
            </div>
            {/* Right header options section (Right container) */}
            <div className='flex items-center gap-3 max-md:gap-2'>
                {
                    headerIcons.map((item, index) => <HeaderIcon key={index} id={item.id} icon={item.icon} />)
                }
                <div className='hover:cursor-pointer' onClick={() => setDashboardAccountPopup(true)}>
                    <div className='border bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-800 rounded-full flex justify-between items-center gap-3 py-1 pl-[5px] pr-3 max-md:p-0'>
                        <ShowProfile isHidden={true} />
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className='text-gray-200 text-xs max-md:hidden'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightHeaderSection;
