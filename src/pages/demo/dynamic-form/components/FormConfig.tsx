import { Select, Tag } from 'antd';

const { Option } = Select;

// 表单字段类型定义
export interface FieldType {
  type: string;
  label: string;
  component: string;
  defaultProps?: Record<string, any>;
  validator?: (value: any) => string | null;
}

// 可用的字段类型
export const FIELD_TYPES: FieldType[] = [
  {
    type: 'string',
    label: '文本输入',
    component: 'Input',
    defaultProps: { placeholder: '请输入' },
  },
  {
    type: 'number',
    label: '数字输入',
    component: 'NumberPicker',
    defaultProps: { placeholder: '请输入数字' },
  },
  {
    type: 'select',
    label: '下拉选择',
    component: 'Select',
    defaultProps: { placeholder: '请选择' },
  },
  {
    type: 'radio',
    label: '单选',
    component: 'RadioGroup',
    defaultProps: { optionType: 'button' },
  },
  {
    type: 'checkbox',
    label: '多选',
    component: 'CheckboxGroup',
    defaultProps: {},
  },
  {
    type: 'switch',
    label: '开关',
    component: 'Switch',
    defaultProps: {},
  },
  {
    type: 'date',
    label: '日期选择',
    component: 'DatePicker',
    defaultProps: { placeholder: '请选择日期' },
  },
  {
    type: 'textarea',
    label: '多行文本',
    component: 'InputTextArea',
    defaultProps: {
      placeholder: '请输入',
      rows: 4,
    },
  },
  {
    type: 'password',
    label: '密码',
    component: 'Input.Password',
    defaultProps: { placeholder: '请输入密码' },
  },
];

// 表单模板定义
export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  schema: any;
  category: 'user' | 'product' | 'survey' | 'custom';
}

// 预设表单模板
export const FORM_TEMPLATES: FormTemplate[] = [
  {
    id: 'user-register',
    name: '用户注册',
    description: '基本的用户注册表单',
    category: 'user',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: '用户名',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入用户名',
          },
        },
        email: {
          type: 'string',
          title: '邮箱',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入邮箱',
          },
        },
        password: {
          type: 'string',
          title: '密码',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input.Password',
          'x-component-props': {
            placeholder: '请输入密码',
          },
        },
        role: {
          type: 'string',
          title: '用户角色',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            placeholder: '请选择角色',
          },
          enum: [
            { label: '普通用户', value: 'user' },
            { label: '管理员', value: 'admin' },
          ],
        },
      },
    },
  },
  {
    id: 'product-info',
    name: '商品信息',
    description: '商品基本信息表单',
    category: 'product',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: '商品名称',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入商品名称',
          },
        },
        price: {
          type: 'number',
          title: '价格',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入价格',
            min: 0,
            precision: 2,
            addonBefore: '¥',
            formatter: (value: string | number | undefined) => `${value || ''}`,
            parser: (value: string | undefined) =>
              value ? value.replace('¥', '').trim() : '',
          },
        },
        category: {
          type: 'string',
          title: '商品分类',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            placeholder: '请选择分类',
          },
          enum: [
            { label: '电子产品', value: 'electronics' },
            { label: '服装', value: 'clothing' },
            { label: '食品', value: 'food' },
          ],
        },
        inStock: {
          type: 'boolean',
          title: '是否有库存',
          required: false,
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
        },
      },
    },
  },
  {
    id: 'survey',
    name: '满意度调查',
    description: '用户满意度调查表单',
    category: 'survey',
    schema: {
      type: 'object',
      properties: {
        overallRating: {
          type: 'number',
          title: '整体满意度评分',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            placeholder: '请选择评分',
          },
          enum: [
            { label: '⭐', value: 1 },
            { label: '⭐⭐', value: 2 },
            { label: '⭐⭐⭐', value: 3 },
            { label: '⭐⭐⭐⭐', value: 4 },
            { label: '⭐⭐⭐⭐⭐', value: 5 },
          ],
        },
        recommend: {
          type: 'string',
          title: '是否推荐给朋友',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'RadioGroup',
          'x-component-props': {
            optionType: 'button',
          },
          enum: [
            { label: '非常愿意', value: 'very-likely' },
            { label: '比较愿意', value: 'likely' },
            { label: '一般', value: 'neutral' },
            { label: '不太愿意', value: 'unlikely' },
          ],
        },
        feedback: {
          type: 'string',
          title: '意见反馈',
          required: false,
          'x-decorator': 'FormItem',
          'x-component': 'InputTextArea',
          'x-component-props': {
            placeholder: '请输入您的意见和建议',
            rows: 4,
          },
        },
      },
    },
  },
];

// 获取字段类型组件
export const FieldTypeSelector = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder="选择字段类型"
      style={{ width: '100%' }}
    >
      {FIELD_TYPES.map((fieldType) => (
        <Option key={fieldType.type} value={fieldType.type}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{fieldType.label}</span>
            <Tag color="blue" style={{ fontSize: '10px' }}>
              {fieldType.component}
            </Tag>
          </div>
        </Option>
      ))}
    </Select>
  );
};

// 获取字段类型信息
export const getFieldType = (type: string): FieldType | undefined => {
  return FIELD_TYPES.find((ft) => ft.type === type);
};
