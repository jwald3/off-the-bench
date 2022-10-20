import DrawerAppBar from "./Appbar";
import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    // any props that come into the component
}

const Layout = ({ children, ...props }: Props) => {
    return (
        <div className="content">
            <DrawerAppBar />
            {children}
        </div>
    );
};

export default Layout;
