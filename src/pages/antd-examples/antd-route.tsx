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
import { AntdCarousel } from "./carousel/carousel";
import { AntdDatePicker } from "./date-picker/datepicker";
import { AntdDescriptions } from "./descriptions/descriptions";
import { AntdForm } from "./form/form";
import { AntdGrid } from "./grid/grid";
import { AntdImage } from "./image/image";
import { AntdLayout } from "./layout/layout";
import { AntdModal } from "./modal/modal";
import { AntdPageHeader } from "./page-header/page-header";
import { AntdSelect } from "./select/select";
import { AntdSkeleton } from "./skeleton/skeleton";
import { AntdSpace } from "./space/space";
import { AntdStatistic } from "./statistic/statistic";
import { AntdSteps } from "./steps/steps";
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
    <Route
      path="/carousel/*"
      element={<AntdCarousel/>}
    />    
    <Route
      path="/form/*"
      element={<AntdForm/>}
    />       
    <Route
      path="/layout/*"
      element={<AntdLayout/>}
    />      
    <Route
      path="/space/*"
      element={<AntdSpace/>}
    />  
    <Route
      path="/descriptions/*"
      element={<AntdDescriptions/>}
    />     
    <Route
      path="/datepicker/*"
      element={<AntdDatePicker/>}
    />          
    <Route
      path="/grid/*"
      element={<AntdGrid/>}
    />      
    <Route
      path="/select/*"
      element={<AntdSelect/>}
    /> 
    <Route
      path="/statistic/*"
      element={<AntdStatistic/>}
    />          
    <Route
      path="/skeleton/*"
      element={<AntdSkeleton/>}
    />   
    <Route
      path="/modal/*"
      element={<AntdModal/>}
    /> 
    <Route
      path="/image/*"
      element={<AntdImage/>}
    />   
    <Route
      path="/steps/*"
      element={<AntdSteps/>}
    />                
  </Routes>

}