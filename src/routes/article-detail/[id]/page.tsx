import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { useParams } from '@modern-js/runtime/router';
import axios from 'axios';
import { Avatar, Input, List, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import Display from '../../../components/Editor/display';

const { Title } = Typography;
const { TextArea } = Input;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
type ArticleDetailData = {
  title?: string;
  img?: string;
  content?: string;
};

type ReviewData = Array<{
  avatar: string;
  userName: string;
  content: string;
  likes: string;
  collections: string;
  comments: string;
}>;

const ArticleDetail = () => {
  const [data, setData] = useState<ArticleDetailData>({});
  const [reviewData, setReviewData] = useState<ReviewData>([]);
  const { id } = useParams();
  const [, setEditor] = useState();

  const getReviewData = () => {
    axios
      .get('http://localhost:8080/api/getArticleReviewList')
      .then(function (response) {
        // console.info(response.data);
        setReviewData(response.data);
      })
      .catch(function (_error) {
        // console.warn(error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/getArticleDetail', {
        params: {
          id,
        },
      })
      .then(function (response) {
        // console.info(response.data.data);
        setData(response.data.data);
      })
      .catch(function (_error) {
        // console.warn(error);
      });

    getReviewData();
  }, []);

  function onChange(editorState: any) {
    setEditor(editorState);
  }

  const commitComment = (e: BaseSyntheticEvent) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/addArticleComment',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        comment: e.target.value,
      },
    });
    getReviewData();
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 auto', width: '70%', marginRight: '16px' }}>
        <div style={{ backgroundColor: '#fff', padding: '32px' }}>
          <Title style={{ margin: '0 0 16px' }}>{data.title}</Title>
          {/* <List
              itemLayout="horizontal"
              dataSource={dataa}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            /> */}
          <img
            style={{ width: '100%', marginInline: 'auto' }}
            alt="logo"
            src={data.img}
          />
          <Display onChange={onChange} />
        </div>
        <div
          style={{
            margin: '16px 0',
            padding: '0 24px',
            minHeight: '200px',
            backgroundColor: '#fff',
          }}
        >
          <div style={{ paddingTop: '24px' }}>
            <Title level={3} style={{ margin: '0 0 24px' }}>
              Reviews
            </Title>
            <div style={{ display: 'flex' }}>
              <Avatar
                style={{ marginRight: '16px' }}
                size={54}
                src="https://s3.bmp.ovh/imgs/2023/02/19/dcef2bd09376cc71.jpg"
              />
              <TextArea
                style={{ minHeight: '80px', width: '550px' }}
                placeholder="Enter comments (Press enter to send)"
                rows={3}
                onPressEnter={commitComment}
              />
            </div>
            <div style={{ paddingTop: '24px' }}>
              <Title level={3} style={{ margin: '0 0 0' }}>
                All Reviews
              </Title>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={reviewData}
                renderItem={item => (
                  <List.Item
                    key={item.userName}
                    actions={[
                      <IconText
                        icon={StarOutlined}
                        text={item.likes}
                        key="list-vertical-star-o"
                      />,
                      <IconText
                        icon={LikeOutlined}
                        text={item.collections}
                        key="list-vertical-like-o"
                      />,
                      <IconText
                        icon={MessageOutlined}
                        text={item.comments}
                        key="list-vertical-message"
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<div>{item.userName}</div>}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 auto' }}>
        <div
          style={{
            backgroundColor: '#fff',
            marginBottom: '16px',
            height: '300px',
          }}
        />
        <div
          style={{
            backgroundColor: '#fff',
            marginBottom: '16px',
            height: '300px',
          }}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
