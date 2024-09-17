import { createContext, useState } from "react";

export const DesignContext = createContext();

export const DesignContextProvider = ({ children }) => {
    const [dashboardAccountPopup, setDashboardAccountPopup] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);
    const [createLabelPopup, setCreateLabelPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [googleAuth, setGoogleAuth] = useState(false);
    const [showTaskPopup, setShowTaskPopup] = useState(false);
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);

    return (
        <DesignContext.Provider value={{
            dashboardAccountPopup, setDashboardAccountPopup,
            logoutPopup, setLogoutPopup,
            createLabelPopup, setCreateLabelPopup,
            deletePopup, setDeletePopup,
            settingsPopup, setSettingsPopup,
            googleAuth, setGoogleAuth,
            showTaskPopup, setShowTaskPopup,
            isShowSearch, setIsShowSearch,
            deleteAccountPopup, setDeleteAccountPopup
        }}>
            {children}
        </DesignContext.Provider>
    )
}