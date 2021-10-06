/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Buttons from "views/Components/Buttons.js";
import GridSystem from "views/Components/GridSystem.js";
import Panels from "views/Components/Panels.js";
import SweetAlert from "views/Components/SweetAlertPage.js";
import Notifications from "views/Components/Notifications.js";
import Icons from "views/Components/Icons.js";
import Typography from "views/Components/Typography.js";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard/Wizard.js";
import RegularTables from "views/Tables/RegularTables.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import ReactTables from "views/Tables/ReactTables.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import VectorMap from "views/Maps/VectorMap.js";
import Charts from "views/Charts.js";
import Calendar from "views/Calendar.js";
import UserPage from "views/Pages/UserPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";

import CompanyInfo from "components/CompanyInfo";
import CreateOrder from "components/CreateOrder/Order.js";
import ContactInfo from "components/ContactInfo";
import Home from "components/Home";
import VisitOrder from "components/VisitOrder";
import CreateProduct from "components/CreateProduct";

var routes = [
  {
    path: "/home",
    layout: "/admin",
    name: "Home",
    icon: "nc-icon nc-chart-pie-35",
    component: Home,
  },
  {
    path: "/companyinfo",
    layout: "/admin",
    name: "Company Info",
    icon: "nc-icon nc-chart-pie-35",
    component: CompanyInfo,
  },
  {
    path: "/contactinfo",
    layout: "/admin",
    name: "Contact Info",
    icon: "nc-icon nc-chart-pie-35",
    component: ContactInfo,
  },
  {
    path: "/createproduct",
    layout: "/admin",
    name: "Create Product",
    icon: "nc-icon nc-chart-pie-35",
    component: CreateProduct,
  },
  {
    path: "/tabs",
    layout: "/admin",
    name: "Create Order",
    icon: "nc-icon nc-chart-pie-35",
    component: CreateOrder,
  },
  {
    path: "/visitorder",
    layout: "/admin",
    name: "Orders",
    icon: "nc-icon nc-chart-pie-35",
    component: VisitOrder,
  },
   
];
export default routes;
