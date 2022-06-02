import * as React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'

import './profile.less'

import { UserStore } from '../../../stores/user'
import { ChangeName } from '../change-name/change-name'
import { useContext, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export const Profile = observer(()=>{
  const {userStore} = useContext(MobXProviderContext)
  useEffect(()=>userStore!.loadProfile())

  if (userStore!.profileLoading) {
    return (
      <div className="profile section">
        <LoadingOutlined spin={true} />
      </div>
    )
  }

  const profile = userStore!.profile!
  return (
    <div className="profile section">
      <div className="subsection">
        <span className="firstname">{profile.firstname}</span>
        <span className="lastname">{profile.lastname}</span>
        <ChangeName />
      </div>
      <div className="subsection">
        <span className="username">{profile.username}</span>
      </div>
      <div className="subsection">
        <span className="email">{profile.email}</span>
      </div>
      {/* <div className="subsection">
        <span className="gender">
          {profile.gender === 'M' ? 'Male' : 'Female'}.
        </span>
        <span className="dob">Born on {profile.dateOfBirth}</span>
      </div> */}
    </div>
  )
})