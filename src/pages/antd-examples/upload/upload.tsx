import { AntdComponents } from "../antd-components"
import { AntdUploadAvatar } from "./avatar"
import { AntdUploadBasic } from "./basic"
import { AntdUploadDirectory } from "./directory"
import { AntdUploadMaxCount } from "./max-count"
import { AntdUploadAliyunOss } from "./upload-with-aliyun-oss"
import { AntdUploadManually } from "./upload-manually"
import { AntdUploadPngOnly } from "./upload-png-only"

const components = [
{feature: "avatar", component: <AntdUploadAvatar/>},
{feature: "basic", component: <AntdUploadBasic/>},
{feature: "directory", component: <AntdUploadDirectory/>},
{feature: "maxcount", component: <AntdUploadMaxCount/>},
{feature: "uploadmanually", component: <AntdUploadManually/>},
{feature: "uploadpngonly", component: <AntdUploadPngOnly/>},
{feature: "uploadwithaliyunoss", component: <AntdUploadAliyunOss/>}]

export const AntdUpload = () => {
  return <AntdComponents main="upload" components={components}/>
}