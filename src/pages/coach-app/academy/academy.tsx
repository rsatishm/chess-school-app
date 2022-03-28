import { Layout, Menu } from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { Route, useNavigate, useLocation, Routes, Navigate, useMatch, useRoutes, useSearchParams } from 'react-router-dom'

import './academy.less'

import { CreateAcademyForm } from './create-academy-form/create-academy-form'
import { AcademyStore } from '../../../stores/academy'
import { StudentsGroupsStore } from '../../../stores/students-groups'
import { useContext, useEffect } from 'react'
import { States } from '../../../components/states/states'
import { Students } from './students/students'

const { Content } = Layout

interface Props {
  academyStore?: AcademyStore
  studentsGroupsStore?: StudentsGroupsStore
}

export const Academy = observer(()=>{
  const {academyStore, studentsGroupsStore} = useContext(MobXProviderContext)
  const academy = academyStore!.academy
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch("/*");

  console.log("match on: " + JSON.stringify(match))
  
  useEffect(()=>{
    console.log("Load academies")
    academyStore!.load()
    studentsGroupsStore!.load()
  }, [academyStore, studentsGroupsStore])

  if (
    academyStore!.loading ||
    studentsGroupsStore!.loading
  ) {
    console.log("still loading")
    return (
      <Content className="academy content">
        <div className="inner">
          <States type="loading" />
        </div>
      </Content>
    )
  } else {
    console.log("Both academies and students loaded");
  }

  const handleMenuClick = (link: string) => () => {
    navigate("/app/academy" + link)
  }

  const handleRetry = ()=> {
    academyStore!.load()
    studentsGroupsStore!.load()
  }

  if (
    academyStore!.error ||
    studentsGroupsStore!.error
  ) {
    console.log("Errors in fetching academies and students")
    return (      
      <Content className="academy content">
        <div className="inner">
          <States
            type="error"
            exceptionText={
              academyStore!.error ||
              studentsGroupsStore!.error
            }
            onClick={handleRetry}
          />
        </div>
      </Content>
    )
  }

  const getSelectedItem = () => {
    if (location.pathname.indexOf('/calendar') >= 0) {
      return 'calendar'
    }

    if (location.pathname.indexOf('/announcements') >= 0) {
      return 'announcements'
    }

    if (location.pathname.indexOf('/students') >= 0) {
      return 'students'
    }

    if (location.pathname.indexOf('/groups') >= 0) {
      return 'groups'
    }

    //if (this.props.location.pathname.indexOf('/integration') >= 0) {
    //  return 'integration'
    //}

    if (location.pathname.indexOf('/website') >= 0) {
      return 'website'
    }

    if (location.pathname.indexOf('/payment') >= 0) {
      return 'payment'
    }

    return ''
  }

  const Groups = ()=>{
    return <h1>Groups</h1>
  }

  const Website = ()=>{
    return <h1>Website</h1>
  }

  const Payment = ()=>{
    return <h1>Payment</h1>
  }

  const Settings = ()=>{
    return <h1>Settings</h1>
  }

  const renderAcademyPage = () => {
    console.log("renderAcademyPage " + location.pathname)
    return  <>
    <Menu mode="horizontal" selectedKeys={[getSelectedItem()]}>
      <Menu.Item key="students" onClick={handleMenuClick('/students')}>
        Students
      </Menu.Item>
      <Menu.Item key="groups" onClick={handleMenuClick('/groups')}>
        Groups
      </Menu.Item>
      <Menu.Item key="settings" onClick={handleMenuClick('/settings')}>
        Settings
      </Menu.Item>
    </Menu>
    <Routes>
      <Route
        path="/"
        element={<Students/>}
      />
       <Route
        path="/students"
        element={<Students/>}
      />
      <Route
        path="/groups"
        element={<Groups />}
      />
      <Route
        path="/website"
        element={<Website />}
      />
      <Route
        path="/payment"
        element={<Payment />}
      />
      <Route
        path="/settings"
        element={<Settings />}
      />
      <Route path={location.pathname} element={<Navigate replace to={location.pathname + '/students'} />} />
    </Routes>
    </>
  }

  return (
    <Content className="academy content">
{academy ? 
        renderAcademyPage() : (
        <div className="form-container">
          <CreateAcademyForm/>
        </div>
      )}
    </Content>
  )
})