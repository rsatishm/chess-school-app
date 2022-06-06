
import { Button, Col, Form, Input, Layout, message, Row } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import pawnImage from '../../images/pawn.png'
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as jsEnv from 'browser-or-node'

import './login.less'
import liveLessons from '../../images/Live-lessons.png'
import solvePuzzles from '../../images/Solve-puzzles.png'
import playFeature from '../../images/play-feature.png'
import storeGames from '../../images/store-games.png'
import improveCalc from '../../images/blindbot.png'
import practicePositions from '../../images/practice-positions.png'
import { MobXProviderContext } from 'mobx-react';

interface LoginState {
    confirmDirty: boolean
    formFields: {
        username: string
        password: string
    }
    features: any[]
}

const Login = observer(() => {
    const {loginStore, userStore} = useContext(MobXProviderContext);
    const [form] = Form.useForm();
    let [loginState, setLoginState] = useState<LoginState>({
        confirmDirty: false,
        formFields: loginStore,
        features: [
            {
                image: playFeature,
                feature: 'playFeature',
                title: "Play with other students in the academy",
                points: [
                    "Within the online chess arena, you can play with other students anytime and improve your game. Games are recorded automatically for analysis"
                ]
            },
            {
                image: solvePuzzles,
                feature: 'solvePuzzles',
                title: "Solve tactics and improve your game",
                points: [
                    "We will provide you tailor-made homework puzzles to solve. Keeping solving them and unlock performance insights"
                ]
            },
            {
                image: liveLessons,
                feature: 'liveLessons',
                title: "Online coaching",
                points: [
                    "Rain or shine, stay connected with us anytime, anywhere. Collaboratively discuss plans and strategy remotely during tournaments.",
                    "Attend online classes with our renowned coaches."
                ]
            },
            {
                image: storeGames,
                feature: 'storeGames',
                title: "Store and share your tournament games",
                points: [
                    "Store your tournament games in the platform and share it with us for analysis"
                ]
            },
            {
                image: improveCalc,
                feature: 'improveCalc',
                title: "Improve your calculations with Blindfold Chess",
                points: [
                    "Play blindfold chess in multiple levels and visualise your calculations better during the game"
                ]
            },
            {
                image: practicePositions,
                feature: 'practicePositions',
                title: "Practice positions with engine",
                points: [
                    "Practice positions with the engine and improve your accuracy."
                ]
            }
        ]
    });
    const navigate = useNavigate();
    const refresh = () => {
        window.location.reload();
        console.log('refresh page')
      }

    const login = async () => {
        try {
          console.log("Call login api for " + loginState.formFields.username)  
          const response = await userStore
            .getApiCoreAxiosClient()!
            .post('identity/oauth/token', {              
              username: loginState.formFields.username,
              password: loginState.formFields.password,
              grant_type: 'password',
              client_id: 'default',
              client_secret: 'xyzfgh'
            })
          const { access_token, refresh_token } = response.data
          console.log("access token: " + access_token)
          if (access_token && refresh_token) {
            userStore.consumeTokens(access_token, refresh_token)
            //this.props.invitationStore.init()
            //this.props.liveGameStore.init()
            navigate('/app')
            //refresh()
          } else {
            throw new Error('Server Error')
          }
        } catch (e) {
            message.error(e + "Server Error");
            /*
          if (e.response && e.response.status === 400) {
            message.error(
              <FormattedMessage
                id="login.log_in_area.invalid_creds"
                defaultMessage="Invalid Credentials"
              />
            )
          } else {
            message.error(
              <FormattedMessage
                id="login.log_in_area.server_error"
                defaultMessage="Server Error"
              />
            )
          }
          */
        }        
    }

    let handleSubmit = (v : any) => {
        form.validateFields().then((values) => {
            console.log(values)
            console.log("Copy form fields into state");
            setLoginState((prevState) => {
                return {
                    ...prevState,
                    confirmDirty: !prevState.confirmDirty,
                    formFields: { ...values }
                }
            });
        });
        return false;
    };

    useEffect(() => {
        if (loginState.confirmDirty) {
        // send login request
        console.log("Login details changed, lets try login for " + loginState.formFields.username)
        login()
        }
    }, [loginState.formFields]);

    useEffect(() => {
        if (loginStore.complete === true) {
            console.log("login is comlete so redirect to app")
            navigate('/app')
        }
        document
            .querySelector('meta[name="viewport"]')!
            .setAttribute('content', 'width=device-width, initial-scale=1.0');

        return () => {
            document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
        }
    }, [loginStore.complete])

    let isInCustomDomain = () => {
        if (jsEnv.isBrowser) {
            return !(window.location.hostname.indexOf('localhost') >= 0)
        }

        return false
    }

    return (<Layout className="page login">
        <Layout.Header />
        <Layout.Content className="content">
            <div className="wrapper">
                <Row
                    justify="space-around"
                    style={{ margin: '2rem 1rem' }}
                >
                    <Col md={{ span: 12, order: 0 }} xs={{ span: 24, order: 1 }}>
                        <img className="auto-center" src={pawnImage} />
                        <Row style={{ marginTop: '1rem' }}>
                            <Col md={8} xs={24}>
                                <h2 className="hero-point text-center">
                                    Learn
                                </h2>
                            </Col>
                            <Col md={8} xs={24}>
                                <h2 className="hero-point text-center">
                                    Measure
                                </h2>
                            </Col>
                            <Col md={8} xs={24}>
                                <h2 className="hero-point text-center">
                                    Improve
                                </h2>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form layout="vertical" form={form} className="login-form" onFinish={handleSubmit}>
							{loginStore.error && (
                                <p className="error-message">
                                    {loginStore.error}
                                </p>
                            )}                            
                            <Form.Item
                                name="username"
                                label="Username or Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "username is required"
                                    }
                                ]}
                                initialValue={loginStore.username}>
                                {
                                    <Input
                                        placeholder="Username or Email"
                                        autoComplete="Username"
                                        size="large"
                                    />
                                }
                            </Form.Item>
                            <Form.Item
                            name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: "password is required"
                                    }
                                ]}
                                initialValue={loginStore.password}
                            >
                                {
                                    <Input.Password
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        size="large"
                                    />
                                }
                            </Form.Item>
                            <Form.Item className="submit-button-container">
                                <Button size="large" type="primary" htmlType="submit" block>
                                    Log in
                                </Button>
                                <div className="login-help">
                                    <p>
                                        Forgot Password?
                                        <Link to="/reset-password">
                                            Reset
                                        </Link>
                                    </p>
                                    {!isInCustomDomain() && (
                                        <p>
                                            Don't have an account?
                                            <Link to="/signup">Sign Up</Link>
                                        </p>
                                    )}
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

                {loginState.features.map(
                    ({ feature, title, image, points }, index) => (
                        <Row className="feature" key={index}>
                            <Col
                                className="feature-image"
                                md={{ span: 12, order: index % 2 == 0 ? 1 : 0 }}
                                xs={24}
                            >
                                <img className="auto-center" src={image} alt={title} />
                            </Col>
                            <Col className="feature-content" md={12} xs={24}>
                                <h2>{title}</h2>
                                {points.map((point: any, i: number) => (
                                    <p key={i}>{point}</p>
                                ))}
                            </Col>
                        </Row>
                    )
                )}
            </div>
        </Layout.Content>
    </Layout>)
})
export default Login;