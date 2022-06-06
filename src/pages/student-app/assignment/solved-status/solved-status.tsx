import * as React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import { Button } from 'antd'

interface Props {
  assignmentUuid: string
  totalProblemCount: number
  onClick: (assignmentUuid: any) => any
}

export const SolvedStatus = observer((props: Props)=>{
  const {studentAssignmentStore} = React.useContext(MobXProviderContext)
  React.useEffect(()=>{
    studentAssignmentStore!.loadCompletionDetails(
      props.assignmentUuid
    )
  })
  const handleSolveClick = () => {
   props.onClick(props.assignmentUuid)
  }

  const loading =
  !studentAssignmentStore!.completionDetails[
    props.assignmentUuid
  ] ||
  studentAssignmentStore!.completionDetails[
    props.assignmentUuid
  ].loading

if (loading) {
  return (
    <Button style={{ cursor: 'default' }} size="small" disabled={loading}>
      Loading
    </Button>
  )
}

var solved = false
var details = studentAssignmentStore!.completionDetails[
  props.assignmentUuid
].details

if (details != null) {
  solved =
    details.length === props.totalProblemCount &&
    details.reduce((acc: any, status: any) => acc && status.solved, true)
} else {
  // FIXME: this is a quick fix to prevent going into "error loading page" state
  // Figure out why deatails is null
  console.log(
    'FATAL: completion details object should not be null. ( This is a quick fix. Please investigate further )'
  )
}

if (solved) {
  return (
    <Button
      style={{
        cursor: 'default',
        backgroundColor: '#52c41a',
        color: '#fefefe'
      }}
      size="small"
      onClick={handleSolveClick}
    >
      Solved
    </Button>
  )
}

return (
  <Button size="small" type="primary" onClick={handleSolveClick}>
    Solve
  </Button>
)
})