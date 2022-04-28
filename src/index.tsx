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

const stores = {
  signupStore,
  loginStore,
  userStore,
  studentsGroupsStore,
  academyStore,
  preferencesStore,
  studentAssignmentStore,
  announcementStore,
  ratingSystemStore,
  invitationStore,
  syncedGameStore,
  liveGameStore
}

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
