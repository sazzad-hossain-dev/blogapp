"use client";

import { store } from "@/lib/store";
import { Provider } from "react-redux";

export default function StoreProvider({ children }) {
    // useEffect(() => {
    //     const loadUser = () => {
    //         let storedUserData = JSON.parse(cookies().get("userData"));
    //         store.dispatch(setUserDetails(storedUserData));
    //     };
    //     loadUser();
    // }, []);
    return <Provider store={store}>{children}</Provider>;
}
