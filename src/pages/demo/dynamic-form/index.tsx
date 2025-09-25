import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons'
import {
  Checkbox,
  DatePicker,
  Form,
  FormItem,
  Input,
  InputNumber,
  NumberPicker,
  Radio,
  Reset, 
  Select,
  Submit,
  Switch
} from '@formily/antd-v5'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Alert,
  Button,
  Divider,
  message,
  Space,
  Tabs,
  Tag
} from 'antd'
import { useState } from 'react'
import { DynamicSelect } from './components/DynamicSelect'
import {
  FieldTypeSelector,
  FORM_TEMPLATES,
  getFieldType
} from './components/FormConfig'
import styles from './index.less'


// 创建 SchemaField 组件
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    InputTextArea: Input.TextArea,
    Select,
    DatePicker,
    Switch,
    RadioGroup: Radio.Group,
    CheckboxGroup: Checkbox.Group,
    InputNumber,
    NumberPicker,
    DynamicSelect
  },
})

// 默认表单 Schema
const DEFAULT_SCHEMA = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入用户名'
      }
    },
    email: {
      type: 'string',
      title: '邮箱',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入邮箱'
      }
    }
  }
}

export default () => {
  const [form] = useState(() => createForm())
  const [schema, setSchema] = useState(DEFAULT_SCHEMA)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [formData, setFormData] = useState<any>({})
  const [_activeTab, _setActiveTab] = useState('preview')

  // 处理表单提交
  const handleSubmit = async (values: any) => {
    try {
      console.log('表单数据:', values)
      setFormData(values)
      message.success('表单提交成功！')
    } catch (_error) {
      message.error('提交失败，请重试')
    }
  }

  // 选择模板
  const handleSelectTemplate = (templateId: string) => {
    const template = FORM_TEMPLATES.find(t => t.id === templateId)
    if (template) {
      // 重置表单实例
      form.reset()
      form.notify('*', 'onReset')

      // 清空提交数据
      setFormData({})

      // 更新schema
      setSchema(template.schema)
      setSelectedTemplate(templateId)
      message.success(`已选择模板: ${template.name}`)
    }
  }

  // 添加新字段
  const handleAddField = () => {
    const fieldName = `field_${Object.keys(schema.properties).length + 1}`
    const newSchema = {
      ...schema,
      properties: {
        ...schema.properties,
        [fieldName]: {
          type: 'string',
          title: '新字段',
          required: false,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入'
          }
        }
      }
    }
    setSchema(newSchema)
  }

  // 删除字段
  const handleRemoveField = (fieldName: string) => {
    const { [fieldName]: _removed, ...remaining } = schema.properties
    const newSchema = {
      ...schema,
      properties: remaining
    }
    setSchema(newSchema)
  }

  // 更新字段配置
  const handleUpdateField = (fieldName: string, updates: any) => {
    const newSchema = {
      ...schema,
      properties: {
        ...schema.properties,
        [fieldName]: {
          ...schema.properties[fieldName],
          ...updates
        }
      }
    }
    setSchema(newSchema)
  }

  // 导出 Schema
  const handleExportSchema = () => {
    const dataStr = JSON.stringify(schema, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = 'form-schema.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    message.success('Schema 已导出')
  }

  // 导入 Schema
  const handleImportSchema = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          try {
            const importedSchema = JSON.parse(e.target.result)
            setSchema(importedSchema)
            setSelectedTemplate('')
            message.success('Schema 导入成功')
          } catch (_error) {
            message.error('Schema 格式错误')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  // 复制 Schema
  const handleCopySchema = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(schema, null, 2))
      message.success('Schema 已复制到剪贴板')
    } catch (_error) {
      message.error('复制失败')
    }
  }

  // 重置表单
  const handleReset = () => {
    setSchema(DEFAULT_SCHEMA)
    setSelectedTemplate('')
    form.reset()
    setFormData({})
    message.success('表单已重置')
  }

  // 模板分类标签颜色
  const getCategoryColor = (category: string) => {
    const colors = {
      user: 'blue',
      product: 'green',
      survey: 'orange',
      custom: 'purple'
    }
    return colors[category as keyof typeof colors] || 'default'
  }

  // 获取分类中文名
  const getCategoryName = (category: string) => {
    const names = {
      user: '用户',
      product: '商品',
      survey: '调查',
      custom: '自定义'
    }
    return names[category as keyof typeof names] || category
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Formily 动态表单构建器</h1>
        <p className={styles.subtitle}>
          基于 Formily 2.x 和 Ant Design v5 的动态表单生成器，支持实时预览和条件联动
        </p>
      </div>

      <div className={styles.content}>
        {/* 配置面板 */}
        <div className={styles.configPanel}>
          <h3 className={styles.sectionTitle}>表单模板</h3>
          <div className={styles.templateGrid}>
            {FORM_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className={`${styles.templateCard} ${
                  selectedTemplate === template.id ? styles.selected : ''
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className={styles.templateName}>{template.name}</div>
                <div className={styles.templateDesc}>{template.description}</div>
                <Tag color={getCategoryColor(template.category)} className={styles.templateCategory}>
                  {getCategoryName(template.category)}
                </Tag>
              </div>
            ))}
          </div>

          <Divider />

          <h3 className={styles.sectionTitle}>字段管理</h3>
          <div className={styles.fieldEditor}>
            {Object.entries(schema.properties).map(([fieldName, fieldConfig]: [string, any]) => (
              <div key={fieldName} className={styles.fieldEditor}>
                <div className={styles.fieldHeader}>
                  <span className={styles.fieldName}>{fieldConfig.title || fieldName}</span>
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveField(fieldName)}
                    danger
                  />
                </div>
                <div className={styles.fieldForm}>
                  <div className={styles.formRow}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#666' }}>字段标题</label>
                      <Input
                        size="small"
                        value={fieldConfig.title}
                        onChange={(e) => handleUpdateField(fieldName, { title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#666' }}>字段类型</label>
                      <FieldTypeSelector
                        value={fieldConfig.type}
                        onChange={(type) => {
                          const fieldType = getFieldType(type)
                          if (fieldType) {
                            handleUpdateField(fieldName, {
                              type,
                              'x-component': fieldType.component,
                              'x-component-props': fieldType.defaultProps
                            })
                          }
                        }}
                      />
                    </div>
                  </div>
                  {fieldConfig.type === 'select' && (
                    <div className={styles.formRowFull}>
                      <label style={{ fontSize: '12px', color: '#666' }}>选项配置</label>
                      <DynamicSelect
                        value={fieldConfig.enum}
                        onChange={(enumValue) => handleUpdateField(fieldName, { enum: enumValue })}
                      />
                    </div>
                  )}
                  <div className={styles.formRowFull}>
                    <label style={{ fontSize: '12px', color: '#666' }}>
                      <input
                        type="checkbox"
                        checked={fieldConfig.required || false}
                        onChange={(e) => handleUpdateField(fieldName, { required: e.target.checked })}
                      /> 必填字段
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.addFields}>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddField}
                className={styles.addFieldButton}
              >
                添加字段
              </Button>
            </div>
          </div>
        </div>

        {/* 预览面板 */}
        <div className={styles.previewPanel}>
          <div className={styles.previewActions}>
            <h3 className={styles.sectionTitle}>表单预览</h3>
            <Space>
              <Button size="small" icon={<CopyOutlined />} onClick={handleCopySchema}>
                复制 Schema
              </Button>
              <Button size="small" icon={<DownloadOutlined />} onClick={handleExportSchema}>
                导出 Schema
              </Button>
              <Button size="small" icon={<UploadOutlined />} onClick={handleImportSchema}>
                导入 Schema
              </Button>
              <Button size="small" danger onClick={handleReset}>
                重置
              </Button>
            </Space>
          </div>

          <Form
            form={form}
            layout="vertical"
            onAutoSubmit={handleSubmit}
            className={styles.dynamicForm}
          >
            <SchemaField schema={schema} />
            <div style={{ marginTop: 24 }}>
              <Space>
                <Submit block size="large">
                  提交表单
                </Submit>
                <Reset size="large">
                  重置表单
                </Reset>
              </Space>
            </div>
          </Form>
        </div>

        {/* 数据面板 */}
        <div className={styles.dataPanel}>
          <h3 className={styles.sectionTitle}>数据展示</h3>

          <Tabs
            defaultActiveKey="form"
            size="small"
            items={[
              {
                key: 'form',
                label: '表单数据',
                children: Object.keys(formData).length > 0 ? (
                  <div className={styles.dataDisplay}>
                    <div className={styles.dataSection}>
                      <div className={styles.dataLabel}>提交的数据：</div>
                      <div className={styles.dataContent}>
                        {JSON.stringify(formData, null, 2)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Alert
                    message="暂无数据"
                    description="提交表单后，数据将显示在这里"
                    type="info"
                    showIcon
                  />
                ),
              },
              {
                key: 'schema',
                label: 'Schema 配置',
                children: (
                  <div className={styles.jsonDisplay}>
                    {JSON.stringify(schema, null, 2)}
                  </div>
                ),
              },
            ]}
          />

          <Divider />

          <div className={styles.actionButtons}>
            <Button type="primary" size="small" icon={<EyeOutlined />} block>
              查看文档
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}