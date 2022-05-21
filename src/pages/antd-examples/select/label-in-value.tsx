import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
}

export const AntdSelectLabelInValue = ()=><Select
labelInValue
defaultValue={{ value: 'lucy' }}
style={{ width: 120 }}
onChange={handleChange}
>
<Option value="jack">Jack (100)</Option>
<Option value="lucy">Lucy (101)</Option>
</Select>