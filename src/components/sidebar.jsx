import React from 'react'
import logo from '../assets/logo.jpg'
import { AddCircle, Delete, Edit, Home } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const Sidebar = ({ activePage }) => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="logo">
                <div className="img">
                    <img src={logo} alt="img" />
                </div>
                <h2>Products</h2>

            </div>
            <div className={activePage === 'home' ? 'sectionbutton' : 'active'}>
                <div className="section">
                    <div className={activePage === 'home' ? 'activeIcon' : 'icon'}>
                        <Home fontSize='large' />
                    </div>
                    <div className='icontext'>
                        <p className={activePage === 'home' ? 'active' : ''} onClick={() => navigate('/')}>Home</p>
                    </div>
                </div>
            </div>
            <div className={activePage === 'addProduct' ? 'sectionbutton' : 'active'}>
                <div className="section">
                    <div className={activePage === 'addProduct' ? 'activeIcon' : 'icon'}>
                        <AddCircle fontSize='large' />
                    </div>
                    <div className='icontext'>
                        <p className={activePage === 'addProduct' ? 'active' : ''} onClick={() => navigate('/addproduct')}>Add Item</p>
                    </div>
                </div>
            </div>
            <div className={activePage === 'editProduct' ? 'sectionbutton' : 'active'}>
                <div className="section">
                    <div className={activePage === 'editProduct' ? 'activeIcon' : 'icon'}>
                        <Edit fontSize='large' />
                    </div>
                    <div className='icontext'>
                        <p className={activePage === 'editProduct' ? 'active' : ''} onClick={() => navigate('/editproduct')}>Edit Item</p>
                    </div>
                </div>
            </div>
            <div className={activePage === 'deleteProduct' ? 'sectionbutton' : 'active'}>
                <div className="section">
                    <div className={activePage === 'deleteProduct' ? 'activeIcon' : 'icon'}>
                        <Delete fontSize='large' />
                    </div>
                    <div className='icontext'>
                        <p className={activePage === 'deleteProduct' ? 'active' : ''} onClick={() => navigate('/deleteproduct')}>Delete Item</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
