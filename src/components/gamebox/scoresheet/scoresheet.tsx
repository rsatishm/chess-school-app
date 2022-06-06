import React from 'react'
import { ChessTypes } from '../../../types'

import './scoresheet.less'

// TODO: Move this to chess lib
const getFullMoveNumber = (fen: string) => {
  return parseInt(fen ? fen.split(' ')[5] : '1', 10)
}

interface Props {
  mainline: ChessTypes.Variation
  currentPath: any
  onMoveClick: (path: any) => any
}

const Scoresheet = (props: Props)=>{
  const handleMoveClick = (path: any) => () => {
    props.onMoveClick(path)
  }

  const renderVariation = (variation: ChessTypes.Variation, prefixPath: any[]) => {
    if (!variation || variation.length === 0) {
      return null
    }
    const level = parseInt(Math.floor(prefixPath.length / 2).toFixed(0), 10)

    return (
      <div
        key={`variation-${prefixPath.toString()}`}
        className={'variation'}
        style={level > 0 ? { marginLeft: `${level}em` } : {}}
      >
        {level > 0 && '('}
        {variation.map((m: any, i: number) => {
          const textAnnotations = (m.annotations || []).filter(
            (a: any) => a.type === 'TEXT'
          )
          const movePath = [...prefixPath, i]
          return (
            <React.Fragment key={movePath.toString()}>
              <span
                className={
                  'move ' +
                  (movePath.toString() === props.currentPath.toString()
                    ? 'current'
                    : '')
                }
                style={level === 0 ? { fontWeight: 600 } : {}}
                onClick={handleMoveClick(movePath)}
              >
                <span className={'number'}>
                  {m.side === 'w' && getFullMoveNumber(m.fen) + '. '}
                  {i === 0 &&
                    m.side === 'b' &&
                    getFullMoveNumber(m.fen) - 1 + '... '}
                </span>
                {m.san}
              </span>
              {textAnnotations.length > 0 && (
                <span className={`text annotation`}>
                  ({(textAnnotations[0] as ChessTypes.TextAnnotation).body})
                </span>
              )}
              {m.variations && m.variations.length > 0 && (
                <div
                  key={`${m.path}-variation`}
                  className={'variationsContainer'}
                >
                  {m.variations.map((v: any, i: number) =>
                    renderVariation(v, [...movePath, 'variations', i])
                  )}
                </div>
              )}
            </React.Fragment>
          )
        })}
        {level > 0 && ')'}
      </div>
    )
  }

  return (
    <div className={'new-scoresheet'}>
      {props.mainline.length === 0 && (
        <span className={'noMoves'}>No moves to display</span>
      )}
      {renderVariation(props.mainline, [])}
    </div>
  )
}

export default Scoresheet