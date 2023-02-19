import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import Editor from '../../components/Editor/Editor';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const ArticleEdit = () => {
  const [editor, setEditor] = useState();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  function onChange(editorState: any) {
    setEditor(editorState);
  }

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

  const onFinish = (values: any) => {
    console.info('Success:', values);
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/addArticle',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        title: values.title,
        description: values.description,
        cover: values.cover?.file.response.url,
        content: editor,
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.info('Failed:', errorInfo);
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '32px' }}>
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
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Cover" name="cover">
          <Upload
            action="http://localhost:8080/api/addArticleCover"
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

export default ArticleEdit;
