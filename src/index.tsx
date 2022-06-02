import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loginStore } from './stores/login';
import { signupStore } from './stores/signup';
import { Provider } from 'mobx-react';
import { userStore } from './stores/user';
import { studentsGroupsStore } from './stores/students-groups';
import { academyStore } from './stores/academy';
import { preferencesStore } from './stores/preferences';
import { BrowserRouter } from 'react-router-dom';
import { studentAssignmentStore } from './stores/student-assignment';
import { announcementStore } from './stores/announcements';
import { ratingSystemStore } from './stores/rating-system';
import { invitationStore } from './stores/invitation-store';
import { syncedGameStore } from './stores/synced-game';
import { liveGameStore } from './stores/live-game';
import { analysisBoardStore } from './stores/analysis-board-store';
import { gameboxDatabaseStore } from './stores/gamebox-database';
import { gameboxDatabaseGameStore } from './stores/gamebox-database-game';
import { gameHistoryStore } from './stores/game-history-store';
import { tournamentViewStore } from './stores/tournament-view';
import { studentTournamentStore } from './stores/student-tournaments';
import { publicProblembaseStore } from './stores/public-problembase';
import { publicGamebaseStore } from './stores/public-gamebase';
import { problembaseContentStore } from './stores/problembase-content';
import { problemSolveStore } from './stores/problem-solve';
import { privateProblembaseStore } from './stores/private-problembase';
import { analyticsStore } from './stores/analytics';
import { analyzerStore } from './stores/analyzer';
import { baseContentStore } from './stores/base-content';
import { coachAssignmentStore } from './stores/coach-assignment';
import { coachAssignmentCompletionDetailsStore } from './stores/coach-assignment-completion-details';
import { coachNetworkStore } from './stores/coach-network';
import { coachTournamentStore } from './stores/coach-tournaments';
import { createTournamentFormStore } from './stores/create-tournament-form';
import { engineStore } from './stores/engine';
import { exerciseStore } from './stores/exercise';
import { gamebaseContentStore } from './stores/gamebase-content';
import { gameboxGamePreviewStore } from './stores/gamebox-game-preview';
import { liveGamePreviewStore } from './stores/live-game-preview';
import { mixpanelStore } from './stores/mixpanel';
import { paymentPlanStore } from './stores/payment-plan';
import { paymentSubscriptionStore } from './stores/payment-subscription';
import { practiceStore } from './stores/practice';
import { privateGamebaseStore } from './stores/private-gamebase';
import { localeStore } from './stores/locale';

const stores = {
  signupStore,
  loginStore,
  userStore,
  localeStore,
  studentsGroupsStore,
  academyStore,
  preferencesStore,
  studentAssignmentStore,
  announcementStore,
  ratingSystemStore,
  invitationStore,
  syncedGameStore,
  liveGameStore,
  analysisBoardStore,
  gameboxDatabaseStore,
  gameboxDatabaseGameStore,
  gameHistoryStore,
  tournamentViewStore,
  studentTournamentStore,
  publicProblembaseStore,
  publicGamebaseStore,
  problembaseContentStore,
  problemSolveStore,
  privateProblembaseStore,
  privateGamebaseStore,
  practiceStore,
  paymentSubscriptionStore,
  paymentPlanStore,
  mixpanelStore,
  liveGamePreviewStore,
  gameboxGamePreviewStore,
  gamebaseContentStore,
  exerciseStore,
  engineStore,
  createTournamentFormStore,
  coachTournamentStore,
  coachNetworkStore,
  coachAssignmentStore,
  coachAssignmentCompletionDetailsStore,
  baseContentStore,
  analyzerStore,
  analyticsStore
}

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
