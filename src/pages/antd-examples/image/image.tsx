import { AntdComponents } from "../antd-components"
import { AntdImageBasic } from "./basic"
import { AntdImageControlledPreview } from "./controlled-preview"
import { AntdImageFallback } from "./fallback"
import { AntdImagePlaceholder } from "./placeholder"
import { AntdImagePreviewGroup } from "./preview-group"
import { AntdImagePreviewGroupVisible } from "./preview-group-visible"
import { AntdImagePreviewMask } from "./preview-mask"
import { AntdImagePreviewSrc } from "./previewSrc"

const components = [
{feature: "basic", component: <AntdImageBasic/>},
{feature: "controlledpreview", component: <AntdImageControlledPreview/>},
{feature: "fallback", component: <AntdImageFallback/>},
{feature: "placeholder", component: <AntdImagePlaceholder/>},
{feature: "previewgroupvisible", component: <AntdImagePreviewGroupVisible/>},
{feature: "previewgroup", component: <AntdImagePreviewGroup/>},
{feature: "previewmask", component: <AntdImagePreviewMask/>},
{feature: "previewsrc", component: <AntdImagePreviewSrc/>},]

export const AntdImage = () => {
  return <AntdComponents main="image" components={components}/>
}