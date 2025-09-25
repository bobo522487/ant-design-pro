import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';

const { Option } = Select;

interface DynamicSelectProps {
  value?: Array<{ label: string; value: any }>;
  onChange?: (value: Array<{ label: string; value: any }>) => void;
  placeholder?: string;
  allowAdd?: boolean;
  style?: React.CSSProperties;
}

export const DynamicSelect: React.FC<DynamicSelectProps> = ({
  value = [],
  onChange,
  placeholder = '请选择或添加选项',
  allowAdd = true,
  style = {},
}) => {
  const handleAdd = () => {
    const newValue = [
      ...value,
      {
        label: `选项 ${value.length + 1}`,
        value: `option-${value.length + 1}`,
      },
    ];
    onChange?.(newValue);
  };

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange?.(newValue);
  };

  const handleLabelChange = (index: number, newLabel: string) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], label: newLabel };
    onChange?.(newValue);
  };

  const handleValueChange = (index: number, newValue: string) => {
    const updatedValue = [...value];
    updatedValue[index] = { ...updatedValue[index], value: newValue };
    onChange?.(updatedValue);
  };

  return (
    <div style={style}>
      <div style={{ marginBottom: 8 }}>
        <Button
          type="dashed"
          onClick={handleAdd}
          icon={<PlusOutlined />}
          size="small"
          disabled={!allowAdd}
        >
          添加选项
        </Button>
      </div>

      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        {value.map((option, index) => (
          <div
            key={`${option.label}-${option.value}-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
              padding: 8,
              border: '1px solid #d9d9d9',
              borderRadius: 4,
            }}
          >
            <Select
              value={option.label}
              onChange={(newLabel) =>
                handleLabelChange(index, newLabel as string)
              }
              placeholder="选项标签"
              style={{ flex: 1 }}
              size="small"
              showSearch
              allowClear
            >
              <Option value="是">是</Option>
              <Option value="否">否</Option>
              <Option value="同意">同意</Option>
              <Option value="不同意">不同意</Option>
              <Option value="满意">满意</Option>
              <Option value="不满意">不满意</Option>
            </Select>

            <span style={{ color: '#999', fontSize: 12 }}>=</span>

            <Select
              value={option.value}
              onChange={(newValue) =>
                handleValueChange(index, newValue as string)
              }
              placeholder="选项值"
              style={{ flex: 1 }}
              size="small"
              showSearch
              allowClear
            >
              <Option value="yes">yes</Option>
              <Option value="no">no</Option>
              <Option value="agree">agree</Option>
              <Option value="disagree">disagree</Option>
              <Option value="satisfied">satisfied</Option>
              <Option value="unsatisfied">unsatisfied</Option>
            </Select>

            <Button
              type="text"
              size="small"
              icon={<MinusCircleOutlined />}
              onClick={() => handleRemove(index)}
              style={{ color: '#ff4d4f' }}
            />
          </div>
        ))}

        {value.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              color: '#999',
              padding: '20px',
              border: '1px dashed #d9d9d9',
              borderRadius: 4,
            }}
          >
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};
