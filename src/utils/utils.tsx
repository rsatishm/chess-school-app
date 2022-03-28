import { FormattedMessage } from 'react-intl'

export var downloadPgn = (name: string, pgn: string, meta: any) => {
  downloadFile(name, getPgnWithMeta(pgn, meta))
}

export var getPgnWithMeta = (pgn: string, meta: any) => {
  let metaStr = ''
  for (var key in meta) {
    metaStr += `\n[${key} "${meta[key]}"]`
  }
  return `${metaStr}\n${pgn || ''}\n`
}

export var downloadFile = (name: string, contents: string) => {
  const file = new Blob([contents], { type: 'text/plain' })

  const element = document.createElement('a')
  element.href = URL.createObjectURL(file)
  element.download = `${name}.pgn`
  document.body.appendChild(element)
  element.click()
}

export function getFormattedMessage(id_: string, defaultMessage_: string): any {
  return <FormattedMessage id={id_} defaultMessage={defaultMessage_} />
}

export function getFormattedName(user: any) {
  if (user == null) {
    return null
  }
  return `${user.firstname}, ${user.lastname} (${user.username})`
}

export function formattedResult2(whiteScore: number, blackScore: number) {
  if (whiteScore == null || blackScore == null) {
    return '*'
  }

  if (whiteScore == 0 && blackScore == 0) {
    return '*'
  }

  function format(result: number) {
    return result == 0.5 ? '1/2' : result.toString()
  }

  return `${format(whiteScore)} - ${format(blackScore)}`
}

export function getTimeInSeconds(t: number) {
  return Math.floor(t / 1000)
}

export function formatTime(time: number) {
  return Math.floor(time / 60) + ':' + ('' + (time % 60)).padStart(2, '0')
}

export const DEFAULT_FEN: string =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
