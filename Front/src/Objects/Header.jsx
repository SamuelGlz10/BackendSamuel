import React from 'react'
import { Link } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';

const Header = ({isLogin, logout}) => {
    return (
        <div>
            <header className="app-header">
                {isLogin && <ResponsiveAppBar logout={logout} />}
            </header>
        </div>
    );
};

export default Header;