import _ from 'lodash';
import React from 'react';
import { Row, Col, UncontrolledCarousel, Card, CardHeader, CardBody } from 'reactstrap';
import PrefaceText from './preface';
import GeneralInfoText from './general-info';

import styles from './style.scss';

// images
import img1 from './car1.jpg';
import img2 from './car2.jpg';
import img3 from './car3.jpg';
import img4 from './car4.jpg';
import img5 from './car5.jpg';

const getImg = num => _.get(window, ['__SERVER_DATA__', 'carousel', `image${num}`]);
const getText = num => _.get(window, ['__SERVER_DATA__', 'carousel', `header${num}`]);
const items = [
  {
    src: getImg(1) || img1,
    altText: getText(1) || 'Phần mộ chi trưởng',
    header: getText(1) || 'Phần mộ chi trưởng',
    caption: ''
  },
  {
    src: getImg(2) || img2,
    altText: getText(2) || 'Thăm mộ bà Hoàng Thị Loan',
    header: getText(2) || 'Thăm mộ bà Hoàng Thị Loan',
    caption: ''
  },
  {
    src: getImg(3) || img3,
    altText: getText(3) || 'Nhà thờ tổ',
    header: getText(3) || 'Nhà thờ tổ',
    caption: ''
  },
  {
    src: getImg(4) || img4,
    altText: getText(4) || 'Con cháu bà Trần Thị Tứ',
    header: getText(4) || 'Con cháu bà Trần Thị Tứ',
    caption: ''
  },
  {
    src: getImg(5) || img5,
    altText: getText(5) || 'Mừng thọ ông bà Trần Văn Phương',
    header: getText(5) || 'Mừng thọ ông bà Trần Văn Phương',
    caption: ''
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
