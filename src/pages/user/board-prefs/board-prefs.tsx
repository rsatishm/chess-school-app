import { MobXProviderContext, observer } from 'mobx-react'
import { Checkbox } from 'antd'

import './board-prefs.less'

import { PreferencesStore } from '../../../stores/preferences'
import { useContext, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export const BoardPrefs = observer(()=>{
  const {preferencesStore} = useContext(MobXProviderContext)
  useEffect(()=>{
    preferencesStore!.load()
  })
  const handleTheme = (theme: string) => () => {
    preferencesStore!.save({
      ...preferencesStore!.preferences,
      'com.chesslang.boardTheme': theme
    })
  }

  const handleCoordinatesToggle = () => {
    const coordinates =
      preferencesStore!.preferences[
        'com.chesslang.boardCoordinates'
      ] || 'Y'
    preferencesStore!.save({
      ...preferencesStore!.preferences,
      'com.chesslang.boardCoordinates': coordinates === 'Y' ? 'N' : 'Y'
    })
  }

  if (
    preferencesStore!.loading &&
    !preferencesStore!.hasData
  ) {
    return (
      <div className="board-prefs section">
        <h2 className="my-2 text-base">Board Preference</h2>
        <LoadingOutlined spin={true} />
      </div>
    )
  }

  const selected =
    preferencesStore!.preferences['com.chesslang.boardTheme'] ||
    'brown'
  const coordinates =
    preferencesStore!.preferences[
      'com.chesslang.boardCoordinates'
    ] || 'Y'

  return (
    <div
      className={`board-prefs section ${
        preferencesStore!.loading ? 'loading' : ''
      }`}
    >
      <h2 className="my-2 text-base">Board Preference</h2>
      {PreferencesStore.BOARD_THEME_CHOICES.map(([light, dark, name]) => (
        <div
          className={`choice ${name === selected ? 'selected' : ''}`}
          key={name}
          onClick={handleTheme(name)}
        >
          <span className="light" style={{ backgroundColor: light }} />
          <span className="dark" style={{ backgroundColor: dark }} />
        </div>
      ))}
      <div style={{ marginTop: 12 }}>
        <Checkbox
          checked={coordinates === 'Y'}
          onChange={handleCoordinatesToggle}
        >
          Coordinates
        </Checkbox>
      </div>
      <div className="loading-overlay" />
    </div>
  )
})