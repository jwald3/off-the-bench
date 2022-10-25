import DrawerAppBar from "./Appbar";
import React, { ReactNode } from "react";
import Footer from "./Footer";

interface Props {
    children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
    return (
        <div className="content">
            <DrawerAppBar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
