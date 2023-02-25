import React, { useState, useEffect } from 'react';
import { Link, useRequest } from '@umijs/max';
import { Avatar, Divider, List, Menu, Skeleton, Space } from 'antd';
import type { MenuProps } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import getArticleList from '@/services/article';

type ArticleListData = Array<{
  id: string;
  avatar: string;
  title: string;
  userName: string;
  description: string;
  likes: string;
  collections: string;
  comments: string;
  img: string;
}>;

const menuItems: MenuProps['items'] = [
  {
    label: 'Recommend',
    key: 'recommend',
  },
  {
    label: 'Latest',
    key: 'latest',
  },
  {
    label: 'Hot',
    key: 'hot',
  },
];

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const HomePage: React.FC = () => {
  const [menuCurrent, setMenuCurrent] = useState('recommend');
  const [articleListData, setArticleListData] = useState<ArticleListData>([]);

  const { loading, run } = useRequest(
    () => {
      return getArticleList({
        menuCurrent,
        size: 10,
        target: articleListData.length,
      });
    },
    {
      manual: true,
      onSuccess: (result) => {
        console.log(result);
        setArticleListData([...articleListData, ...result]);
      },
    },
  );

  useEffect(() => {
    run();
  }, []);

  const loadMoreData = () => {
    console.log(loading);
    if (loading) {
      return;
    }
    run();
  };

  const onMenuClick: MenuProps['onClick'] = (e) => {
    setMenuCurrent(e.key);
    setArticleListData([]);
    run();
  };

  return (
    <div
      className="w-full max-w-screen-lg  mx-auto bg-white"
      style={{ minWidth: '640px' }}
    >
      <Menu
        onClick={onMenuClick}
        selectedKeys={[menuCurrent]}
        mode="horizontal"
        items={menuItems}
      />
      <div className="px-5 pt-5">
        <InfiniteScroll
          dataLength={articleListData.length}
          next={loadMoreData}
          hasMore={articleListData.length < 100}
          loader={
            <div className="pt-5 px-5 pb-10">
              <Skeleton avatar paragraph={{ rows: 4 }} active />
            </div>
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
          {articleListData.length !== 0 && (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={articleListData}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText
                      icon={LikeOutlined}
                      text={item.likes}
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={StarOutlined}
                      text={item.comments}
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text={item.collections}
                      key="list-vertical-message"
                    />,
                  ]}
                  extra={<img width={272} alt="logo" src={item.img} />}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<Link to={`/detail/${item.id}`}>{item.title}</Link>}
                    description={item.userName}
                  />
                  {item.description}
                </List.Item>
              )}
            />
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomePage;
