import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { useParams, useModel } from '@umijs/max';
import { Avatar, Input, List, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
// @ts-ignore
import Display from '@/components/Editor/Display.js';
import {
  getArticleDetail,
  getArticleCommentsList,
  addArticleComment,
} from '@/services/article/ArticleController';

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
  const { initialState } = useModel('@@initialState');
  const [articleData, setArticleData] = useState<ArticleDetailData>({});
  const [commentData, setCommentData] = useState<ReviewData>([]);
  const { id } = useParams();

  const getData = async () => {
    if (id) {
      const _articleData = await getArticleDetail(id);
      console.log(_articleData);
      setArticleData(_articleData.data);
      const _commentsListData = await getArticleCommentsList(id);
      setCommentData(_commentsListData.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const commitComment = (e: BaseSyntheticEvent) => {
    if (id) {
      addArticleComment(id, e.target.value);
    }
  };

  return (
    <div className="flex max-w-screen-lg mx-auto">
      <div className="flex-none w-4/6 mr-5">
        <div className="bg-white p-10 pb-5">
          <Title>{articleData.title}</Title>
          <img className="w-full" alt="logo" src={articleData.img} />
          <Display />
        </div>
        <div className="mt-5 p-8 pb-3 bg-white">
          <div>
            <Title level={3} style={{ margin: '0 0 24px' }}>
              Reviews
            </Title>
            <div className="flex pl-3 pr-5">
              <Avatar
                className="flex-none mr-5"
                size={54}
                src={initialState?.avatar}
              />
              <TextArea
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
                dataSource={commentData}
                renderItem={(item) => (
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
      <div className="flex-1">
        <div className="bg-white mb-5 h-80" />
        <div className="bg-white mb-5 h-80" />
      </div>
    </div>
  );
};

export default ArticleDetail;
