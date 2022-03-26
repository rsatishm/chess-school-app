import { Modal, Carousel, Row, Col } from 'antd'
import { MobXProviderContext } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import { AnnouncementStore } from '../../stores/announcements'

import './announcements.less'
import { createRef, useContext } from 'react'
import { CarouselRef } from 'antd/lib/carousel'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

interface Props {
  announcementStore?: AnnouncementStore
}

const Announcements = ()=>{
  const {announcementStore} = useContext(MobXProviderContext)
  const location = useLocation()
  const isVisible = location.pathname != '/app/dashboard' && // don't show announcnments on dashboard
  announcementStore!.isVisible &&
  announcementStore!.loaded
  let carousel : CarouselRef

  const setCarousel = (carouselE: any) => {
    carousel = carouselE
    updateLastSeenAnnouncenmentIndex(
      announcementStore!.nextToBeShownIndex
    )
  }

  const next = () => {
    carousel!.next()
  }

  const prev = () => {
    carousel!.prev()
  }

  const closeAnnouncements = () => {
    announcementStore!.setVisible(false)
  }

  const updateLastSeenAnnouncenmentIndex = (index: number) => {
    const id = announcementStore!.announcements[index].fields.id
    announcementStore!.updateLastSeenAnnouncenmentId(id)
  }


  return (
    <Modal
      visible={isVisible}
      onCancel={closeAnnouncements}
      footer={null}
      centered={true}
    >
      {announcementStore!.loaded && (
        <Row>
          <Col span={3} className="announcement-prev" onClick={prev}>
            <LeftOutlined/>
          </Col>
          <Col span={18}>
            <h1 style={{ textAlign: 'center' }}>What's New</h1>
            <Carousel
              ref={setCarousel}
              className="announcements"
              afterChange={updateLastSeenAnnouncenmentIndex}
              initialSlide={announcementStore!.nextToBeShownIndex}
              infinite={false}
            >
              {announcementStore!.announcements.map(
                (item: any) => (
                  <div className="announcement" key={item.id}>
                    <h2 className="announcement__title">
                      {item.fields.title}
                    </h2>
                    <p className="announcement__text">
                      {item.fields.description}
                    </p>
                    {item.fields.image && (
                      <img
                        className="announcement__image"
                        src={item.fields.image[0].url}
                      />
                    )}
                  </div>
                )
              )}
            </Carousel>
          </Col>
          <Col span={3} className="announcement-next" onClick={next}>
            <RightOutlined />
          </Col>
        </Row>
      )}
    </Modal>
  )
}
export default Announcements