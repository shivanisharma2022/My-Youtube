import Header from "./components/Header.js";
import Body from "./components/Body.js";
import { Provider } from "react-redux";
import store from "./utils/appStore.js";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Body />
      </div>
    </Provider>
  );
}

export default App;
