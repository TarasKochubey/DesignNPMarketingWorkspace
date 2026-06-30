import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Campaigns } from "./pages/Campaigns";
import { CampaignBuilder } from "./pages/CampaignBuilder";
import { SinglePageCampaignBuilder } from "./pages/SinglePageCampaignBuilder";
import { CampaignDetails } from "./pages/CampaignDetails";
import { Audiences } from "./pages/Audiences";
import { CashbackCategoryManager } from "./pages/CashbackCategoryManager";
import { Partners } from "./pages/Partners";
import { ReferralProgram } from "./pages/ReferralProgram";
import { ReferralHistory } from "./pages/ReferralHistory";
import DevUIKit from "./pages/DevUIKit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        index: true, 
        element: <Navigate to="/campaigns" replace /> 
      },
      { 
        path: "campaigns", 
        children: [
          {
            index: true,
            element: <Campaigns />
          },
          {
            path: "new",
            element: <CampaignBuilder />
          },
          {
            path: "new-single",
            element: <SinglePageCampaignBuilder />
          },
          {
            path: "edit/:id",
            element: <CampaignBuilder />
          },
          {
            path: "edit-single/:id",
            element: <SinglePageCampaignBuilder />
          },
          {
            path: ":id",
            element: <CampaignDetails />
          },
        ]
      },
      { 
        path: "audiences", 
        element: <Audiences /> 
      },
      { 
        path: "cashback-categories", 
        element: <CashbackCategoryManager /> 
      },
      {
        path: "partners",
        element: <Partners />
      },
      {
        path: "referral",
        children: [
          { index: true, element: <ReferralProgram /> },
          { path: "history", element: <ReferralHistory /> },
        ]
      },
      { 
        path: "dev-ui-kit", 
        element: <DevUIKit /> 
      },
    ],
  },
]);