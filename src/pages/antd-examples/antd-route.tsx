import { Col, Layout, List, Row } from "antd"
import { Link, Route, Routes } from "react-router-dom"
import { AntdAfflix } from "./afflix/afflix";
import { AntdAlert } from "./alert/alert";
import { AntdAnchor } from "./anchor/anchor";
import { AntdExamples } from "./antd-examples";
import { AntdAutoComplete } from "./auto-complete/auto-complete";
import { AntdAvatar } from "./avatar/avatar";
import { AntdBackTop } from "./back-top/back-top";
import { AntdBadge } from "./badge/badge";
import { AntdPageHeaderActions } from "./page-header/actions";
import { AntdPageHeaderBasic } from "./page-header/basic";
import { AntdPageHeader } from "./page-header/page-header";

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
  </Routes>

}