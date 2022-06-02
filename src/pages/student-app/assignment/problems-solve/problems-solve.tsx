import * as React from 'react'
import * as R from 'ramda'
import Measure from 'react-measure'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { Button, Tag, Alert } from 'antd'
import { toJS } from 'mobx'
import { BaseContentStore } from '../../../../stores/base-content'
import { ProblemSolveStore } from '../../../../stores/problem-solve'
import { ConfiguredChessboard } from '../../../../components/chessboard/configured-chessboard'
import './problems-solve.less'
import { StudentAssignmentStore } from '../../../../stores/student-assignment'
import { CheckCircleOutlined, ClockCircleOutlined, DoubleLeftOutlined, DoubleRightOutlined, ExceptionOutlined, LoadingOutlined } from '@ant-design/icons'
import { ChessTypes } from '../../../../types'
import * as Chess from 'chess.js'
import * as ProblemReader from '../../../../ProblemReader/ProblemReader'
import * as Util from '../../../../utils/Util'

const pad = (digit: number): string =>
  digit <= 9 ? '0' + digit : digit.toString()

const secondsToTime = (seconds: number): string =>
  pad(Math.floor(seconds / 60 / 60)) +
  ':' +
  pad(Math.floor(seconds / 60) % 60) +
  ':' +
  pad(seconds % 60)

const extractMoves = (attemptMovesPgn: string) =>
  attemptMovesPgn.split('\n\n')[1] || ''

const getSideToMove = (fen: ChessTypes.FEN) =>
  fen.split(' ')[1] as ChessTypes.Side

interface Props {
  assignment: any
  problemUuids: string[]
}

interface State {
  allSolved: boolean
  showCongrats: boolean
  boardSize: number
  fen: string
  interactionMode: 'NONE' | 'MOVE'
  orientation: 'w' | 'b'
  time: number
  status: string
  moves: string
  currentPbmIndex: number
}

export const ProblemsSolve = (props: Props) => {
  const { baseContentStore, problemSolveStore, studentAssignmentStore } = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    allSolved: false,
    showCongrats: true,
    boardSize: 0,
    fen: '',
    orientation: 'w',
    interactionMode: 'NONE',
    time: 0,
    status: '',
    moves: '',
    currentPbmIndex: 0
  })

  let interval: any | null = null
  let problemReader: ProblemReader.ProblemReader | null = null
  //let chess = new Chess()

  const ChessJS = typeof Chess === 'function' ? Chess : Chess.Chess
  const chess = new ChessJS()

  let attempt: any = {
    problemId: '',
    exerciseId: '',
    status: '',
    moves: '',
    timeTaken: ''
  }

  React.useEffect(() => {
    setTimeout(() => {
      console.log('Next unsolved')
      loadNextUnsolvedProblem(
        state.currentPbmIndex,
        props.assignment
      )
    }, 2000)
  }, [state.status])

  React.useEffect(()=>{
    props.problemUuids.forEach((uuid: string) => {
      baseContentStore!.load(uuid)
    })
    problemSolveStore!.load(props.assignment.uuid)
    loadNextUnsolvedProblem(0, props.assignment)
    studentAssignmentStore!.loadCompletionDetails(
      props.assignment.uuid
    )
    return ()=>stopTimer()
  }, []
  )

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  
  function tick() {
    updateState({ time: state.time + 1 })
  }

  function startTimer() {
    if (!interval) {
      updateState({ interactionMode: 'MOVE' })
      interval = setInterval(() => tick(), 1000)
    }
  }

  function stopTimer() {
    if (interval) {
      updateState({ interactionMode: 'NONE' })
      clearInterval(interval)
      interval = null
    }
  }

  function readProblem(uuid: string) {
    startTimer()
    problemReader = problemSolveStore!.getProblemReader(uuid)
    problemReader!.getStatusStream().subscribe((status: any) => {
      if (status.nextMove) {
        setTimeout(() => {
          chess.move(status.nextMove as string)
          updateState({
            fen: chess.fen(),
            status: 'correct',
            moves: chess.pgn()
          })
        }, 300)
      }
      if (status.solved) {
        setTimeout(() => {
          stopTimer()
          handleSubmit('solved', state.moves)
          studentAssignmentStore!.setSolved(
            props.assignment.uuid,
            uuid
          )

          // check if all solved
          const completionDetails = (studentAssignmentStore!
            .completionDetails as any)[props.assignment.uuid]
          if (
            completionDetails.details.length ===
            props.problemUuids.length &&
            R.all((d: any) => d.solved, completionDetails.details)
          ) {
            updateState({ allSolved: true })
          } else {
            updateState({ status: 'solved' })
          }
        }, 300)
      }
    })
  }

  function loadProblem(index: number, assignment: any) {
    stopTimer()
    updateState({ currentPbmIndex: index, fen: '' })
    attempt.exerciseId = assignment.exerciseId
    attempt.problemId = props.problemUuids[index]
    const completionDetails = studentAssignmentStore!
      .completionDetails[assignment.uuid]
    if (completionDetails.details.length > 0) {
      const solvedCompletionDetail = R.find(
        (ad: any) => ad.problemId === attempt.problemId && ad.solved,
        completionDetails.details
      )

      if (solvedCompletionDetail) {
        updateState({
          status: 'solved',
          time: 0,
          moves: solvedCompletionDetail.moves
        })
      } else {
        updateState({ status: '', time: 0, moves: '' })
        readProblem(attempt.problemId)
      }
    } else {
      updateState({ status: '', time: 0, moves: '' })
      readProblem(attempt.problemId)
    }
  }

  function loadPrevUnsolvedProblem(index: number, assignment: any) {
    if (index < 0) {
      return
    }

    const completionDetails = studentAssignmentStore!
      .completionDetails[assignment.uuid]
    for (let i = index; i >= 0; i--) {
      const problemId = props.problemUuids[i]
      if (completionDetails.details.length > 0) {
        const solved = R.find(
          (ad: any) => ad.problemId === problemId && ad.solved,
          completionDetails.details
        )
        if (!solved) {
          loadProblem(i, assignment)
          return
        }
      } else {
        loadProblem(i, assignment)
        return
      }
    }

    // check if all solved
    if (
      completionDetails.details.length === props.problemUuids.length &&
      R.all((d: any) => d.solved, completionDetails.details)
    ) {
      updateState({ allSolved: true })
    }
  }

  function loadNextUnsolvedProblem(index: number, assignment: any) {
    if (index >= props.problemUuids.length) {
      return
    }

    const completionDetails = studentAssignmentStore!
      .completionDetails[assignment.uuid]
    for (let i = index; i < props.problemUuids.length; i++) {
      const problemId = props.problemUuids[i]
      if (completionDetails.details.length > 0) {
        const solved = R.find(
          (ad: any) => ad.problemId === problemId && ad.solved,
          completionDetails.details
        )
        if (!solved) {
          loadProblem(i, assignment)
          return
        }
      } else {
        loadProblem(i, assignment)
        return
      }
    }

    // check if all solved
    if (
      completionDetails.details.length === props.problemUuids.length &&
      R.all((d: any) => d.solved, completionDetails.details)
    ) {
      updateState({ allSolved: true })
    }
  }

  async function handleSubmit(status: string, moves: string) {
    attempt.status = status
    attempt.moves = moves
    attempt.timeTaken = state.time
    await problemSolveStore!.submit(
      props.assignment.uuid,
      attempt
    )
  }

  const  handleViewProblems = (e: any) => {
    updateState({ showCongrats: false })
    loadProblem(0, problemSolveStore!.assignment)
  }

  const handleMove = (move: ChessTypes.ChessJSVerboseMove) => {
    chess.move(move)
    if (
      problemReader!.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion
          ? (move.promotion.toLowerCase() as ChessTypes.PromotionPiece)
          : undefined
      })
    ) {
      updateState({
        fen: chess.fen(),
        status: 'correct',
        moves: chess.pgn()
      })
    } else {
      updateState({ status: 'incorrect' })
      handleSubmit('unsolved', chess.pgn())
      chess.undo()
      setTimeout(() => {
        updateState({ status: '' })
      }, 2000)
    }
  }

  const renderErrorState = () => {
    return (
      <div className="problems-solve">
        <div className="inner">
          <div className="error-state container">
            <ExceptionOutlined />
            <p className="exception-text">
              {problemSolveStore!.error}.
            </p>
            <span className="action-text">
              <Button
                danger
                onClick={() =>
                  problemSolveStore!.load(props.assignment.uuid)
                }
              >
                Retry
              </Button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  const renderLoadingState = () => {
    return (
      <div className="problems-solve">
        <div className="inner">
          <div className="loading-state container">
            <LoadingOutlined spin={true} />
            <p className="exception-text">Loading</p>
          </div>
        </div>
      </div>
    )
  }

  if (state.allSolved && state.showCongrats) {
    return (
      <div className="problems-solve">
        <div className="all-solved">
          <h4>Congrats!</h4>
          <CheckCircleOutlined />
          <h4>You have solved all the problems!</h4>

          <Button
            size="large"
            type="primary"
            onClick={handleViewProblems}
          >
            View Problems
          </Button>
        </div>
      </div>
    )
  }

  const problem = baseContentStore!.content[
    props.problemUuids[state.currentPbmIndex]
  ]

  if (problemSolveStore!.error) {
    return renderErrorState()
  }

  if (
    !problem ||
    problem.loading ||
    problemSolveStore!.loading ||
    !studentAssignmentStore!.completionDetails[
    props.assignment.uuid
    ] ||
    studentAssignmentStore!.completionDetails[
      props.assignment.uuid
    ].loading
  ) {
    return renderLoadingState()
  }

  if (state.fen === '') {
    chess.load(problem.content!.startFen || Util.DEFAULT_START_FEN)
    updateState({
      fen: problem.content!.startFen || Util.DEFAULT_START_FEN,
      orientation: getSideToMove(
        problem.content!.startFen || Util.DEFAULT_START_FEN
      )
    })
  }

  return (
    <div className="problems-solve">
      <Measure
        bounds={true}
        onResize={contentRect =>
          updateState({ boardSize: contentRect.bounds!.width - 25 })
        }
      >
        {({ measureRef }) => {
          return (
            <div ref={measureRef} className="left">
              <div style={{ border: '2px solid #000' }}>
                <ConfiguredChessboard
                  fen={
                    state.fen ||
                    problem.content!.startFen ||
                    Util.DEFAULT_START_FEN
                  }
                  interactionMode={state.interactionMode}
                  width={state.boardSize}
                  height={state.boardSize}
                  onMove={handleMove}
                  orientation={state.orientation}
                />
              </div>
            </div>
          )
        }}
      </Measure>
      <div className="right">
        <div className="problems">
          <Button
            disabled={state.currentPbmIndex === 0 && true}
            onClick={() =>
              loadProblem(
                state.currentPbmIndex - 1,
                problemSolveStore!.assignment
              )
            }
          >
            <DoubleLeftOutlined />
          </Button>
          <div>
            <h4>{state.currentPbmIndex + 1}</h4>(
            {state.currentPbmIndex + 1}/{props.problemUuids.length}){' '}
            {state.orientation === 'w' ? 'White' : 'Black'} to Play
          </div>
          <Button
            disabled={
              state.currentPbmIndex ===
              props.problemUuids.length - 1 && true
            }
            onClick={() =>
              loadProblem(
                state.currentPbmIndex + 1,
                problemSolveStore!.assignment
              )
            }
          >
            <DoubleRightOutlined />
          </Button>
        </div>
        <div className="timer">
          <div className="clock">
            <ClockCircleOutlined /> {secondsToTime(state.time)}
          </div>
          {state.status !== '' && (
            <Tag
              style={{ cursor: 'not-allowed' }}
              color={
                state.status === 'solved'
                  ? '#52c41a'
                  : state.status === 'incorrect'
                    ? '#f5222d'
                    : '#108ee9'
              }
            >
              {state.status.toUpperCase()}
            </Tag>
          )}
        </div>
        <div className="moves">{extractMoves(state.moves)}</div>
      </div>
    </div>
  )
}