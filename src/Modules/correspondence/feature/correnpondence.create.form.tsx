import { Form, Input, Select, Switch, Button, Upload } from 'antd';
import { CreateCorrespondenceDTO } from '../types';
import styled from 'styled-components';

interface CreateCorrespondenceFormProps {
  onSubmit: (values: CreateCorrespondenceDTO) => void;
  loading?: boolean;
}

const StyledForm = styled(Form)`
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0.75rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-weight: bold;
  border-radius: 6px;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
`;

const StyledInput = styled(Input)`
  border-radius: 6px;
  font-size: 14px;
  padding: 6px 10px;
  border: 1px solid #d9d9d9;
  transition: all 0.2s ease;

  &:hover, &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const StyledTextArea = styled(Input.TextArea)`
  border-radius: 6px;
  font-size: 14px;
  padding: 6px 10px;
  border: 1px solid #d9d9d9;
  transition: all 0.2s ease;

  &:hover, &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 6px !important;
    height: 34px !important;
    padding: 2px 10px !important;
  }
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: #1890ff;
  }
`;

const StyledUpload = styled(Upload)`
  .ant-upload-list-item {
    margin-top: 8px;
  }
`;

export const CreateCorrespondenceForm: React.FC<CreateCorrespondenceFormProps> = ({
  onSubmit,
  loading
}) => {
  const [form] = Form.useForm();

  return (
    <StyledForm form={form} layout="vertical" onFinish={onSubmit as (values: unknown) => void}>
      <FormRow>
        <StyledFormItem name="sender" label="فرستنده" rules={[{ required: true, message: 'لطفا فرستنده را وارد کنید' }]} style={{ flex: '1 1 calc(25% - 0.5625rem)' }}>
          <StyledInput />
        </StyledFormItem>
        <StyledFormItem name="receiver_internal" label="گیرنده داخلی" style={{ flex: '1 1 calc(25% - 0.5625rem)' }}>
          <StyledInput />
        </StyledFormItem>
        <StyledFormItem name="receiver_external" label="گیرنده خارجی" style={{ flex: '1 1 calc(25% - 0.5625rem)' }}>
          <StyledInput />
        </StyledFormItem>
        <StyledFormItem name="subject" label="موضوع" rules={[{ required: true, message: 'لطفا موضوع را وارد کنید' }]} style={{ flex: '1 1 calc(25% - 0.5625rem)' }}>
          <StyledInput />
        </StyledFormItem>
      </FormRow>

      <FormRow>
        <StyledFormItem name="kind_of_correspondence" label="نوع مکاتبه" style={{ flex: '1 1 calc(20% - 0.6rem)' }}>
          <StyledSelect>
            <Select.Option value="request">درخواست</Select.Option>
            <Select.Option value="response">پاسخ</Select.Option>
            <Select.Option value="letter">نامه</Select.Option>
          </StyledSelect>
        </StyledFormItem>
        <StyledFormItem name="confidentiality_level" label="سطح محرمانگی" style={{ flex: '1 1 calc(20% - 0.6rem)' }}>
          <StyledSelect>
            <Select.Option value="normal">عادی</Select.Option>
            <Select.Option value="confidential">محرمانه</Select.Option>
            <Select.Option value="secret">سری</Select.Option>
          </StyledSelect>
        </StyledFormItem>
        <StyledFormItem name="priority" label="اولویت" style={{ flex: '1 1 calc(20% - 0.6rem)' }}>
          <StyledSelect>
            <Select.Option value="normal">عادی</Select.Option>
            <Select.Option value="immediate">فوری</Select.Option>
            <Select.Option value="urgent">خیلی فوری</Select.Option>
          </StyledSelect>
        </StyledFormItem>
        <StyledFormItem name="authority_type" label="نوع اختیار" style={{ flex: '1 1 calc(20% - 0.6rem)' }}>
          <StyledSelect>
            <Select.Option value="new">جدید</Select.Option>
            <Select.Option value="old">قدیمی</Select.Option>
          </StyledSelect>
        </StyledFormItem>
        <StyledFormItem name="reference" label="مراجع" style={{ flex: '1 1 calc(20% - 0.6rem)' }}>
          <StyledSelect mode="multiple">
            <Select.Option value="1">مرجع 1</Select.Option>
            <Select.Option value="2">مرجع 2</Select.Option>
          </StyledSelect>
        </StyledFormItem>
      </FormRow>

      <StyledFormItem name="text" label="متن مکاتبه" rules={[{ required: true, message: 'لطفا متن مکاتبه را وارد کنید' }]}>
        <StyledTextArea rows={3} />
      </StyledFormItem>

      <FormRow>
        <StyledFormItem name="is_internal" label="مکاتبه داخلی" valuePropName="checked" style={{ flex: '1 1 calc(25% - 0.5625rem)' }}>
          <StyledSwitch />
        </StyledFormItem>
        <StyledFormItem name="binding" label="الزام‌آور" valuePropName="checked" style={{ flex: '1 1 calc(25% - 0.5625rem)' }}>
          <StyledSwitch />
        </StyledFormItem>
        <StyledFormItem name="draft" label="پیش‌نویس" valuePropName="checked" style={{ flex: '1 1 calc(25% - 0.5625rem)' }}>
          <StyledSwitch defaultChecked />
        </StyledFormItem>
        <StyledFormItem name="published" label="منتشر شده" valuePropName="checked" style={{ flex: '1 1 calc(25% - 0.5625rem)' }}>
          <StyledSwitch />
        </StyledFormItem>
      </FormRow>

      <StyledFormItem name="attachments" label="پیوست‌ها">
        <StyledUpload
          name="file"
          action="/upload.do"
          listType="picture"
          multiple
        >
          <Button >انتخاب فایل</Button>
        </StyledUpload>
      </StyledFormItem>

      <StyledButton type="primary" htmlType="submit" loading={loading}>
        ایجاد مکاتبه
      </StyledButton>
    </StyledForm>
  );
}; 

export default CreateCorrespondenceForm;