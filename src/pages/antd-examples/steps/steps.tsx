import { AntdComponents } from "../antd-components"
import { AntdStepsClickable } from "./clickable"
import { AntdStepsCustomizedProgressDot } from "./customized-progress-dot"
import { AntdStepsError } from "./error"
import { AntdStepsIcon } from "./icon"
import { AntdStepsNav } from "./nav"
import { AntdStepsProgress } from "./progress"
import { AntdStepsProgressDebug } from "./progress-debug"
import { AntdStepsProgressDot } from "./progress-dot"
import { AntdStepsSimple } from "./simple"
import { AntdStepsSmallSize } from "./small-size"
import { AntdStepsStepNext } from "./step-next"
import { AntdStesStepsInSteps } from "./steps-in-steps"
import { AntdStepsVertical } from "./vertical"
import { AntdStepsVerticalSmall } from "./vertical-small"


const components = [
{feature: "clickable", component: <AntdStepsClickable/>},
{feature: "customizedProgressDot", component: <AntdStepsCustomizedProgressDot/>},
{feature: "error", component: <AntdStepsError/>},
{feature: "icon", component: <AntdStepsIcon/>},
{feature: "nav", component: <AntdStepsNav/>},
{feature: "progressDebug", component: <AntdStepsProgressDebug/>},
{feature: "progressDot", component: <AntdStepsProgressDot/>},
{feature: "progress", component: <AntdStepsProgress/>},
{feature: "simple", component: <AntdStepsSimple/>},
{feature: "smallSize", component: <AntdStepsSmallSize/>},
{feature: "stepNext", component: <AntdStepsStepNext/>},
{feature: "stepsInSteps", component: <AntdStesStepsInSteps/>},
{feature: "verticalSmall", component: <AntdStepsVerticalSmall/>},
{feature: "vertical", component: <AntdStepsVertical/>}]

export const AntdSteps = () => {
  return <AntdComponents main="steps" components={components}/>
}