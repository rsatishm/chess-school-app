import { Route, Routes } from "react-router-dom"
import { AntdAfflix } from "./afflix/afflix";
import { AntdAlert } from "./alert/alert";
import { AntdAnchor } from "./anchor/anchor";
import { AntdExamples } from "./antd-examples";
import { AntdAutoComplete } from "./auto-complete/auto-complete";
import { AntdAvatar } from "./avatar/avatar";
import { AntdBackTop } from "./back-top/back-top";
import { AntdBadge } from "./badge/badge";
import { AntdBreadcrumb } from "./breadcrumb/breadcrumb";
import { AntdButton } from "./button/button";
import { AntdCalendar } from "./calendar/calendar";
import { AntdPageHeader } from "./page-header/page-header";
import { AntdTable } from "./table/table";
import { AntdTabs } from "./tabs/tabs";
import { AntdTag } from "./tag/tag";
import { AntdTimePicker } from "./time-picker/timepicker";
import { AntdTimeline } from "./timeline/timeline";
import { AntdTransfer } from "./transfer/transfer";
import { AntdTree } from "./tree/tree";
import { AntdTreeSelect } from "./treeselect/treeselect";
import { AntdTypography } from "./typography/typography";
import { AntdUpload } from "./upload/upload";

export const AntdRoute = () => {

  return <Routes>
    <Route
      path="/*"
      element={<AntdExamples />}
    />
    <Route
      path="/pageheader/*"
      element={<AntdPageHeader />}
    />
    <Route
      path="/afflix/*"
      element={<AntdAfflix />}
    />
    <Route
      path="/alert/*"
      element={<AntdAlert />}
    />     
    <Route
      path="/anchor/*"
      element={<AntdAnchor />}
    />
    <Route
      path="/autoComplete/*"
      element={<AntdAutoComplete />}
    />
    <Route
      path="/avatar/*"
      element={<AntdAvatar/>}
    />
    <Route
      path="/backtop/*"
      element={<AntdBackTop/>}
    />
    <Route
      path="/badge/*"
      element={<AntdBadge/>}
    />
    <Route
      path="/breadcrumb/*"
      element={<AntdBreadcrumb/>}
    />
    <Route
      path="/button/*"
      element={<AntdButton/>}
    />
    <Route
      path="/calendar/*"
      element={<AntdCalendar/>}
    />
    <Route
      path="/upload/*"
      element={<AntdUpload/>}
    />
    <Route
      path="/tree/*"
      element={<AntdTree/>}
    />
    <Route
      path="/treeselect/*"
      element={<AntdTreeSelect/>}
    />
     <Route
      path="/transfer/*"
      element={<AntdTransfer/>}
    />
    <Route
      path="/timeline/*"
      element={<AntdTimeline/>}
    />
    <Route
      path="/timepicker/*"
      element={<AntdTimePicker/>}
    />
    <Route
      path="/typography/*"
      element={<AntdTypography/>}
    />
    <Route
      path="/tag/*"
      element={<AntdTag/>}
    />
    <Route
      path="/tabs/*"
      element={<AntdTabs/>}
    />
    <Route
      path="/table/*"
      element={<AntdTable/>}
    />
  </Routes>

}