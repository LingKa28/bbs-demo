import { useState } from 'react';
import { Button, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
// @ts-ignore
import Editor from '@/components/Editor/Editor.js';
import addArticle from '@/services/article/addArticle';

const { TextArea } = Input;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const EditPage = () => {
  const [editor, setEditor] = useState();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');

  function onChange(editorState: any) {
    setEditor(editorState);
  }

  const onFinish = (values: any) => {
    console.info('Form submit success:', values);
    addArticle(
      values.title,
      values.description,
      values.cover?.file.response.url,
      editor,
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.info('Form submit failed:', errorInfo);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleChange: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    console.info(file.response?.url);
    setFileList(newFileList);
  };

  const handleCancel = () => setPreviewOpen(false);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-16 bg-white">
      <Form
        name="articleData"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input your article's title!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your article's description!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item label="Cover" name="cover">
          <Upload
            action="/api/article/addCover"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item label="Main" name="main" rules={[{ required: true }]}>
          <Editor onChange={onChange} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button
            style={{ width: '250px' }}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default EditPage;
