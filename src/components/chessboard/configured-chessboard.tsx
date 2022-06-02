import { observer } from 'mobx-react'
import * as R from 'ramda'
import { PreferencesStore, usePreferenceStore } from '../../stores/preferences'
import { Chessboard, ChessboardProps } from './Chessboard'

export const ConfiguredChessboard = observer((props: ChessboardProps) => {
  const preferencesStore = usePreferenceStore()
  const getColors = (theme: string) => {
    const themeTuple = R.find(
      ts => ts[2] === theme,
      PreferencesStore.BOARD_THEME_CHOICES
    )
    return themeTuple || PreferencesStore.BOARD_THEME_CHOICES[0]
  }
  const theme =
    (preferencesStore && preferencesStore!.preferences['com.chesslang.boardTheme']) ||
    'brown'
  const [lightSquareColor, darkSquareColor] = getColors(theme)

  const coordinates =
    props.width < 250 || props.height < 250
      ? 'N'
      : (preferencesStore && preferencesStore!.preferences[
      'com.chesslang.boardCoordinates'
      ] )|| 'N'

  return (
    <Chessboard
      lightSquareColor={lightSquareColor}
      darkSquareColor={darkSquareColor}
      coordinates={coordinates === 'Y'}
      {...props}
    />
  )
})
