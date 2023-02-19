import React, { useState, useEffect } from 'react';
import { Link, useParams } from '@modern-js/runtime/router';
import axios from 'axios';
import type { MenuProps } from 'antd';
import { Avatar, Divider, List, Menu, Skeleton, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import './index.scss';

const items: MenuProps['items'] = [
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

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ArticleList = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ArticleListData>([]);
  const [current, setCurrent] = useState('recommend');
  const { search } = useParams();

  const loadMoreData = (callback?: (response: ArticleListData) => void) => {
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .get<ArticleListData>('http://localhost:8080/api/getArticleList', {
        params: {
          current,
          query: search,
          result: 10,
          offset: data.length,
        },
      })
      .then(function (response) {
        console.info(response.data);
        if (callback) {
          callback(response.data);
        } else {
          setData([...data, ...response.data]);
        }
        setLoading(false);
      })
      .catch(function (_error) {
        // console.warn(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
    setFlag(true);
  }, []);

  useEffect(() => {
    console.info(search);
    if (flag) {
      setData([]);
      loadMoreData(response => {
        setData(response);
      });
    }
  }, [search]);

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
    setData([]);
    loadMoreData(response => {
      setData(response);
    });
  };

  return (
    <div className="page-container">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div style={{ marginTop: '10px' }} className="list-container">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 100}
          loader={
            <div style={{ padding: '10px 10px 16px' }}>
              <Skeleton avatar paragraph={{ rows: 4 }} active />
            </div>
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
          {data.length !== 0 && (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={data}
              renderItem={item => (
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
                    title={
                      <Link to={`/article-detail/${item.id}`}>
                        {item.title}
                      </Link>
                    }
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

export default ArticleList;
