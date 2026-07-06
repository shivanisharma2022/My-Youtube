import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import store from "./utils/appStore";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,     // parent, as header and sidebar does not change on route change
    children: [            // children, will go where outlet is placed as main container and watch page change on route change
      {
        path: "/",
        element: <MainContainer />, 
      },
      {
        path: "watch",
        element: <WatchPage />,
      }
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;