import React from 'react';
import { Row, Col, UncontrolledCarousel, Card, CardHeader, CardBody } from 'reactstrap';
import PrefaceText from './preface';
import GeneralInfoText from './general-info';

import styles from './style.scss';

// images
import img1 from './car1.jpg';
import img2 from './car2.jpg';
import img3 from './car3.jpg';

const items = [
  {
    src: img1,
    altText: 'Tảo mộ tết 2013',
    caption: 'Mộ phần chi trưởng họ Trần Văn',
    header: 'Tảo mộ 2013'
  },
  {
    src: img3,
    altText: 'Nhà thờ tổ',
    caption: 'Nhà thờ tổ họ Trần Văn hiện ở nhà ông Trần Văn Phương, tộc trưởng chi thứ nhất',
    header: 'Nhà thờ tổ'
  },
  {
    src: img2,
    altText: 'Thăm mộ bà Hoàng Thị Loan',
    caption: 'Các cụ trong họ thăm mộ bà Hoàng Thị Loan, thân sinh chủ tịch Hồ Chí Minh',
    header: 'Thăm mộ bà Hoàng Thị Loan'
  }
];

const HomePage = () => (
  <div style={{ paddingBottom: 20 }}>
    <Row>
      <Col md="5" style={{ marginTop: 10 }}>
        <Card style={{ height: '100%' }}>
          <CardHeader className={styles.cardTitle}>Thông tin chung</CardHeader>
          <CardBody>
            <GeneralInfoText />
          </CardBody>
        </Card>
      </Col>
      <Col md="7" style={{ marginTop: 10 }}>
        <Card style={{ height: '100%' }}>
          <CardHeader className={styles.cardTitle}>Hình ảnh</CardHeader>
          <CardBody>
            <UncontrolledCarousel items={items} />
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Card style={{ marginTop: 10 }}>
      <CardHeader className={styles.cardTitle}>Lời nói đầu</CardHeader>
      <CardBody>
        <PrefaceText />
      </CardBody>
    </Card>
  </div>
);

export default HomePage;
