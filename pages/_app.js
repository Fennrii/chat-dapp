
import '../app/Styles/globals.css';
import { ChatProvider } from "../app/Context/ChatContext";
import { NavBar } from "../app/Components/index"

const MyApp = ({ Component, pageProps }) => (
    <div>
        <ChatProvider>
            <NavBar />
            <Component {...pageProps} />
        </ChatProvider>
    </div>
);

export default MyApp;