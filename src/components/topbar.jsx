import React from 'react'
import { NotificationAdd, Person, Settings } from '@mui/icons-material'

export const Topbar = ({title}) => {
  return (
    <div className='topbar'>
        <div className="flex1">
            <div className="heading">
                <h2>{title}</h2>
            </div>
            <div className="icons">
                <div className="iconTopbar">
                    <NotificationAdd/>
                </div>
                <div className="iconTopbar">
                    <Settings/>
                </div>
                <div className="profile">
                    <p className="profilename">Navilla A.</p>
                    <p className="admin">Admin</p>
                </div>
                <div className="iconTopbar">
                    <Person/>
                </div>
            </div>
        </div>
    </div>
  )
}
