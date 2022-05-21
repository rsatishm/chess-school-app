import { AntdComponents } from "../antd-components"
import { AntdFormAdavancedSearch } from "./advanced-search"
import { AntdFormBasic } from "./basic"
import { AntdFormCol24Debug } from "./col-24-debug"
import { AntdFormComplexFormControl } from "./complex-form-control"
import { AntdFormControlHooks } from "./control-hooks"
import { AntdFormControlRef } from "./control-ref"
import { AntdFormCustomizedFormControls } from "./customized-form-controls"
import { AntdFormDepDebug } from "./dep-debug"
import { AntdFormDisabledInputDebug } from "./disabled-input-debug"
import { AntdFormDynamicFormItemsComplex } from "./dynamic-form-items-complex"
import { AntdFormDynamicFormItemsNoStyle } from "./dynamic-form-items-no-style"
import { AntdFormDynamicFormItem } from "./dynamic-form-item"
import { AntdFormDynamicFormItems } from "./dynamic-form-items"
import { AntdFormDynamicRule } from "./dynamic-rule"
import { AntdFormInModal } from "./form-in-modal"
import { AntdFormGlobalState } from "./global-state"
import { AntdFormContext } from "./form-context"
import { AntdFormInlineLogin } from "./inline-login"
import { AntdFormLabelDebug } from "./label-debug"
import { AntdFormLayoutCanWrap } from "./layout-can-wrap"
import { AntdFormLayout } from "./layout"


const components = [
{feature: "advancedsearch", component: <AntdFormAdavancedSearch/>},
{feature: "basic", component: <AntdFormBasic/>},
{feature: "col24debug", component: <AntdFormCol24Debug/>},
{feature: "complexformcontrol", component: <AntdFormComplexFormControl/>},
{feature: "controlhooks", component: <AntdFormControlHooks/>},
{feature: "controlref", component: <AntdFormControlRef/>},
{feature: "customizedformcontrols", component: <AntdFormCustomizedFormControls/>},
{feature: "depdebug", component: <AntdFormDepDebug/>},
{feature: "disabledinputdebug", component: <AntdFormDisabledInputDebug/>},
{feature: "dynamicformitem", component: <AntdFormDynamicFormItem/>},
{feature: "dynamicformitemscomplex", component: <AntdFormDynamicFormItemsComplex/>},
{feature: "dynamicformitemsnostyle", component: <AntdFormDynamicFormItemsNoStyle/>},
{feature: "dynamicformitems", component: <AntdFormDynamicFormItems/>},
{feature: "dynamicrule", component: <AntdFormDynamicRule/>},
{feature: "formcontext", component: <AntdFormContext/>},
{feature: "forminmodal", component: <AntdFormInModal/>},
{feature: "globalstate", component: <AntdFormGlobalState/>},
{feature: "inlinelogin", component: <AntdFormInlineLogin/>},
{feature: "labeldebug", component: <AntdFormLabelDebug/>},
{feature: "layoutcanwrap", component: <AntdFormLayoutCanWrap/>},
{feature: "layout", component: <AntdFormLayout/>},]

export const AntdForm = () => {
  return <AntdComponents main="form" components={components}/>
}