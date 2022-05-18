import { Breadcrumb } from 'antd';

export const AntdBreadcrumbSeparatorComp = ()=><Breadcrumb separator="">
<Breadcrumb.Item>Location</Breadcrumb.Item>
<Breadcrumb.Separator>:</Breadcrumb.Separator>
<Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item href="">Application List</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>An Application</Breadcrumb.Item>
</Breadcrumb>