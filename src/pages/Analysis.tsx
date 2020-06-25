import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Row,
  Col,
  Statistic,
  Divider,
  List,
  Menu,
} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface AnimalResult {
  animal: string;
  count: number;
}

interface FruitResult {
  fruit: string;
  count: number;
}

interface ColorResult {
  color: string;
  count: number;
}

interface TemperatureResult {
  temperature: string;
  count: number;
}

interface WebsiteResult {
  website: string;
  count: number;
}

interface RatingResult {
  rating: string;
  count: number;
}

interface SurveyResult {
  animal?: AnimalResult[];
  color?: ColorResult[];
  fruit?: FruitResult[];
  temperature?: TemperatureResult[];
  website?: WebsiteResult[];
  rating?: RatingResult[];
}

const AnalysisPage = () => {
  const [surveyResult, setSurveyResult] = useState<SurveyResult>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<SurveyResult>(
        'http://localhost:3001/analysis',
      );
      setSurveyResult(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="analysis-page">
      <Layout className="layout">
        <Layout.Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">See Survey</Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Title>Survey Analysis</Title>
            {surveyResult?.animal && (
              <>
                <Row>
                  <Col span={24}>
                    <Title level={3}>Animals</Title>
                  </Col>
                </Row>
                <Row>
                  {surveyResult.animal.map((a) => (
                    <Col span={8} key={a.animal}>
                      <Statistic title={a.animal} value={a.count} />
                    </Col>
                  ))}
                </Row>
                <Divider />{' '}
              </>
            )}
            {surveyResult?.color && (
              <>
                <Row>
                  <Col span={24}>
                    <Title level={3}>Color</Title>
                  </Col>
                </Row>
                <Row>
                  {surveyResult.color.map((a) => (
                    <Col span={8} key={a.color}>
                      <Statistic title={a.color} value={a.count} />
                    </Col>
                  ))}
                </Row>
                <Divider />
              </>
            )}
            {surveyResult?.fruit && (
              <>
                <Row>
                  <Col span={24}>
                    <Title level={3}>Fruit</Title>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <List
                      bordered
                      dataSource={surveyResult?.fruit}
                      renderItem={(item) => (
                        <List.Item>
                          {item.fruit}: {item.count}
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
                <Divider />
              </>
            )}
            {surveyResult?.temperature && (
              <>
                <Row>
                  <Col span={24}>
                    <Title level={3}>Temperature</Title>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <List
                      bordered
                      dataSource={surveyResult?.temperature}
                      renderItem={(item) => (
                        <List.Item>
                          {item.temperature} degrees: {item.count}
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
                <Divider />
              </>
            )}
            {surveyResult?.website && (
              <>
                <Row>
                  <Col span={24}>
                    <Title level={3}>Websites</Title>
                  </Col>
                </Row>
                <Row>
                  {surveyResult.website.map((a) => (
                    <Col span={8} key={a.website}>
                      <Statistic title={a.website} value={a.count} />
                    </Col>
                  ))}
                </Row>
                <Divider />{' '}
              </>
            )}
            {surveyResult?.rating && (
              <>
                <Row>
                  <Col span={24}>
                    <Title level={3}>Survey Rating</Title>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <List
                      bordered
                      dataSource={surveyResult?.rating}
                      renderItem={(item) => (
                        <List.Item>
                          {item.rating} stars: {item.count} people
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
                <Divider />
              </>
            )}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          Crafted By Yonglin
        </Layout.Footer>
      </Layout>
    </div>
  );
};

export default AnalysisPage;
