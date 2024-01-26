import React from 'react'
import './layout.css';
import { Sidebar } from '../sidebar';
import { Topbar } from '../topbar';

export const Layout = ({currentpage , heading}) => {
    return (
        <>
            <Sidebar
                activePage={currentpage}
            />
            <Topbar title={heading} />
            
        </>
    )
}
