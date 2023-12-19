import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login } from "../pages";
import App from "../App";
import { LayoutMain } from "../Layout/LayoutMain";
import { RequestProcessing } from "../pages/RequestProcessing";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Login />,
        index: true,
      },
      {
        path: "/",
        element: <LayoutMain />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/request-processing",
            element: <RequestProcessing />,
          },
          {
            path: "/request-form",
            element: <RequestProcessing />,
          },
        ],
      },
    ],
  },
]);
