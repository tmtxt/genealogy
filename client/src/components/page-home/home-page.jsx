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

const items = [
  {
    src: img1,
    altText: 'Phần mộ chi trưởng',
    caption: 'Mộ phần chi trưởng họ Trần Văn sau cải tạo',
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
  },
  {
    src: img4,
    altText: 'Con cháu bà Trần Thị Tứ',
    caption: 'Bà Trần Thị Tứ, cùng con cháu ở Phan Thiết',
    header: 'Con cháu bà Trần Thị Tứ'
  },
  {
    src: img5,
    altText: 'Mừng thọ ông bà Trần Văn Phương',
    caption: 'Mừng thọ Ông bà Phương 80 tuổi năm 2009',
    header: 'Mừng thọ ông bà Trần Văn Phương'
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
