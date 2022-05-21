import { AntdComponents } from "../antd-components"
import { AntdSelectAutoToken } from "./automatic-tokenization"
import { AntdSelectBasic } from "./basic"
import { AntdSelectBigData } from "./big-data"
import { AntdSelectBordered } from "./bordered"
import { AntdSelectCoordinate } from "./coordinate"
import { AntdSelectCustomDropdownMenu } from "./custom-dropdown-menu"
import { AntdSelectCustomTagRender } from "./custom-tag-render"
import { AntdSelectDebug } from "./debug"
import { AntdSelectHideSelected } from "./hide-selected"
import { AntdSelectLabelInValue } from "./label-in-value"
import { AntdSelectMultiple } from "./multiple"
import { AntdSelectOptGroup } from "./optgroup"
import { AntdSelectOptionLabelProp } from "./option-label-prop"
import { AntdSelectPlacement } from "./placement"
import { AntdSelectResponsive } from "./responsive"
import { AntdSelectSearchBox } from "./search-box"
import { AntdSelectSelectUsers } from "./select-users"
import { AntdSelectSize } from "./size"


const components = [
{feature: "automatictokenization", component: <AntdSelectAutoToken/>},
{feature: "basic", component: <AntdSelectBasic/>},
{feature: "bigdata", component: <AntdSelectBigData/>},
{feature: "bordered", component: <AntdSelectBordered/>},
{feature: "coordinate", component: <AntdSelectCoordinate/>},
{feature: "customdropdownmenu", component: <AntdSelectCustomDropdownMenu/>},
{feature: "customtagrender", component: <AntdSelectCustomTagRender/>},
{feature: "debug", component: <AntdSelectDebug/>},
{feature: "hideselected", component: <AntdSelectHideSelected/>},
{feature: "labelinvalue", component: <AntdSelectLabelInValue/>},
{feature: "multiple", component: <AntdSelectMultiple/>},
{feature: "optgroup", component: <AntdSelectOptGroup/>},
{feature: "optionlabelprop", component: <AntdSelectOptionLabelProp/>},
{feature: "placement", component: <AntdSelectPlacement/>},
{feature: "responsive", component: <AntdSelectResponsive/>},
{feature: "searchbox", component: <AntdSelectSearchBox/>},
{feature: "size", component: <AntdSelectSize/>},]

export const AntdSelect = () => {
  return <AntdComponents main="select" components={components}/>
}