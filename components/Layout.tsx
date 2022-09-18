import DrawerAppBar from "./Appbar";

const Layout = ({ children }) => {
    return (
        <div className="content">
            <DrawerAppBar />
            {children}
        </div>
    );
};

export default Layout;
