import { AntdComponents } from "../antd-components"
import { AntdAutoCompleteBasic } from "./basic"
import { AntdAutoCompleteCertainCategory } from "./certain-category"
import { AntdAutoCompleteCustom } from "./custom"
import { AntdAutoCompleteFormDebug } from "./form-debug"
import { AntdAutoCompleteNonCaseSensitive } from "./non-case-sensitive"
import { AntdAutoCompleteOptions } from "./options"
import { AntdAutoCompleteStatus } from "./status"
import { AntdAutoCompleteUncertainCategory } from "./uncertain-category"


const components = [{feature: "basic", component: <AntdAutoCompleteBasic/>},
{feature: "certainCategory", component: <AntdAutoCompleteCertainCategory/>},
{feature: "custom", component: <AntdAutoCompleteCustom/>},
{feature: "formDebug", component: <AntdAutoCompleteFormDebug/>},
{feature: "nonCaseSenistive", component: <AntdAutoCompleteNonCaseSensitive/>},
{feature: "options", component: <AntdAutoCompleteOptions/>},
{feature: "status", component: <AntdAutoCompleteStatus/>},
{feature: "uncertainCategory", component: <AntdAutoCompleteUncertainCategory/>}]

export const AntdAutoComplete = () => {
  return <AntdComponents main="autocomplete" components={components}/>
}