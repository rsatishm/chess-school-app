import * as React from 'react'
import { Select } from 'antd'
import { MobXProviderContext, observer } from 'mobx-react'

import './user.less'
import { BoardPrefs } from './board-prefs/board-prefs'
import { Profile } from './profile/profile'
import { ChangePassword } from './change-password/change-password'

const { Option } = Select

export const User = observer(()=>{
  const {userStore, localeStore} = React.useContext(MobXProviderContext)
  React.useEffect(()=>{
    userStore!.loadProfile()
  })
  const changeLanguage = (locale: string) => {
    localeStore!.setLocale(locale)
    window.location.reload()
  }

  function renderLanguageSettings() {
    return (
      <div className="section">
        <h2 className="my-2 text-base">Language</h2>
        <Select
          defaultValue={localeStore!.locale}
          style={{ width: 120 }}
          onChange={changeLanguage}
        >
          {localeStore!.languages.map((language: any) => {
            return (
              <Option
                key={language.lng}
                value={language.lng}
              >{`${language.nativeName} (${language.lng})`}</Option>
            )
          })}
        </Select>
      </div>
    )
  }

  return (
    // <Content className="content user">
    //   <div className="inner">
    //     <div className="container">
    //       <div className="actions">
    //         <ChangePassword />
    //       </div>
    //       <Profile />
    //       <BoardPrefs />
    //       <BrandPrefs />
    //       {this.renderLanguageSettings()}
    //     </div>
    //   </div>
    // </Content>
    <div className="w-full">
      <div className="flex items-center flex-wrap mx-4 mt-6 bg-scWhite rounded">
        <div className="w-full px-4 pt-3">
          <p className="text-sm">Settings</p>
        </div>
      </div>
      <div className="flex items-center flex-wrap mx-4 mt-2 bg-scWhite rounded">
        <div className="w-full px-4 py-2">
          <Profile />
          <div className="actions pb-4">
            <ChangePassword />
          </div>
        </div>
      </div>
      <div className="flex items-center flex-wrap mx-4 mt-2 bg-scWhite rounded">
        <div className="w-full px-4 py-2 h-full">
          <BoardPrefs />
          {/* {this.props.userStore!.role == 'coach' && <BrandPrefs />} */}
          <div className="my-2">{renderLanguageSettings()}</div>
        </div>
      </div>
    </div>
  )
})