import { Layout, Button } from 'antd'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import * as jsEnv from 'browser-or-node'
import { useUserStore } from '../stores/user'

interface HeaderProps {
  showLoginButton?: boolean
}

export const Header = observer((props : HeaderProps)=>{
  const userStore = useUserStore();
  

  const isInCustomDomain = () => {
    if (jsEnv.isBrowser) {
      return !(window.location.hostname.indexOf('chesslang') >= 0)
    }
  
    return false
  }
  
  const right = (() => {
    if (userStore!.isLoggedIn) {
      return (
        <div className="right">
          {userStore!.username}&nbsp;
          <Link to="/app">
            <Button>App &rarr;</Button>
          </Link>
        </div>
      )
    }

    return (
      <div className="right">
        {props.showLoginButton && (
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
        )}
        {!isInCustomDomain() && (
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        )}
      </div>
    )
  })()

  return (
    <Layout className="header">
      <div className="wrapper">
        <div className="left">
          <div className="logo" />
        </div>
        {right}
      </div>
    </Layout>
  )
});
