import { Button, notification } from 'antd';
import { MobXProviderContext, observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
import { Route, Routes, BrowserRouter, useLocation, useNavigationType, useNavigate } from 'react-router-dom';
import { CoachApp } from './pages/coach-app/coach-app';
import { PublicAnalysisBoard } from './pages/common-pages/analysis-board/public-analysis-board';
import Login from './pages/login/login';
import NotFound from './pages/not-found/not-found';
import { ResetPassword } from './pages/reset-password/reset-password';
import { Signup } from './pages/signup/signup';
import { StudentApp } from './pages/student-app/student-app';
import { useSignupStore } from './stores/signup';
import { useUserStore } from './stores/user';

const App = observer(()=>{
  console.log("in app");
  const {userStore, mixpanelStore, invitationStore} = useContext(MobXProviderContext)
  const location = useLocation();
  const navigate = useNavigate();

  const close = (inviteId: any) => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.'
    )
    invitationStore.rejectInvitation(inviteId)
  }

  const handleAcceptInviteOk = (invitationDetails: any) => {
    console.log('Accepted Invitation ', invitationDetails)
    invitationStore!.acceptInvitation(invitationDetails)
    navigate('/app/game-area')
  }

  const openNotification = (inviteId: any, invitation: any) => {
    const inviteModelId = 'rematch'
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          notification.close(inviteModelId)
          handleAcceptInviteOk(invitation)
        }}
      >
        Accept Invite
      </Button>
    )

    notification.open({
      message: 'Invitation from ' + invitation.inviteeName,
      description: `Wants to play a ${
        invitation.time
      } minute game. You play : ${invitation.color.toUpperCase()}`,
      placement: 'topRight',
      btn,
      key: inviteModelId,
      duration: 0,
      onClose: () => {
        close(inviteModelId)
      }
    })
  }

  const closeNotification = (key: any, invitation: any) => {
    notification.close(key)
  }

  useEffect(()=>{

    mixpanelStore!.init({
      uuid: userStore!.uuid,
      username: userStore!.username,
      role: userStore!.role,
      firstname: userStore!.firstname,
      lastname: userStore!.lastname
    })

    invitationStore!.onNewInvitation(openNotification)
    invitationStore!.onDeleteInvitation(closeNotification)


    if (location.pathname === '/') {
      // do nothing
    }

    if (location.pathname.match(/^\/public-board.*/gi)) {
      // Allow public game view without login
    } else if (
      location.pathname.match(/^\/app.*/gi) &&
      !userStore!.isLoggedIn
    ) {
      // Protect the app routes
      navigate('/login')
    } else if (
      !location.pathname.match(/^\/app.*/gi) &&
      userStore!.uuid
    ) {
      // Already logged in
      navigate('/app')
    }
  });

  useEffect(()=>{
    mixpanelStore!.getMixpanel() &&
        mixpanelStore!.getMixpanel()
          .track('navigate', { path: location.pathname })
  }, [location.pathname])

  const InnerApp = (() => {
    if (userStore!.role === 'student') {
      return <StudentApp/>
    }
    if (userStore!.role === 'coach') {
      console.log("Route to " + userStore!.role)
      return <CoachApp/>
    }
  })()


  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/app/*" element={InnerApp}/>
        <Route
        path="/public-board"
        element={<PublicAnalysisBoard/>}
      />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    );
})

export default App;
