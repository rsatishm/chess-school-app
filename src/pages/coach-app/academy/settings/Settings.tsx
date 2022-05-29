import { useContext, useEffect } from 'react'
import { Col, Row, Checkbox } from 'antd'
import { UserStore } from '../../../../stores/user'
import { MobXProviderContext } from 'mobx-react'
import { AcademyStore } from '../../../../stores/academy'
import _ from 'lodash'
import { RatingSystemStore } from '../../../../stores/rating-system'
import RatingSystem from '../../../../types/RatingSystem'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

export const Settings = () => {
  const { ratingSystemStore } = useContext(MobXProviderContext)
  useEffect(() => {
    ratingSystemStore.load()
  })

  const handleRatingSystemChange = (ratingSystem: RatingSystem) => async (
    event: CheckboxChangeEvent
  ) => {
    if (event.target.checked) {
      ratingSystemStore.add(ratingSystem.id)
    } else {
      ratingSystemStore.remove(ratingSystem.id)
    }
  }
  const {
    availableRatingSystems: allRatingSystems,
    ratingSystems,
    loading
  } = ratingSystemStore
  const ratingSystemIds = ratingSystems.map((r: any) => r.id)

  return (
    <div className="settings inner">
      <div className="container">
        <div style={{ marginBottom: '.5rem' }}>Rating Systems</div>
        <Row>
          {allRatingSystems.map((s: any) => (
            <Col key={s.id} span={24}>
              <Checkbox
                value={s.id}
                disabled={loading}
                checked={ratingSystemIds.includes(s.id)}
                onChange={handleRatingSystemChange(s)}
              >
                {s.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}