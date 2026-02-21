import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import ChannelsSideBar from '../components/getChannels';
import { useGetChannelsQuery } from '../store/api';
import NavBar from '../components/navBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; 
import { Container } from 'react-bootstrap';
import ChatHeader from '../components/chatHeader';
import MessageForm from '../components/messageForm';
import MessagesList from '../components/messages';
import { useGetMessagesQuery } from '../store/api';

function App() {
  const username = useSelector((state) => state.auth.username);// get current username from Redux
  // Logout handler
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());   // updates Redux + clears localStorage
    navigate('/login');   // redirects to login page
  };
  //logout handler end

  // Fetch channels and manage active channel state
  const { data: channels = []} = useGetChannelsQuery();
  const { data: messages = [] } = useGetMessagesQuery();
  const [activeChannelId, setActiveChannelId] = useState(null);
  const messageCount = messages.filter(
    (m) => m.channelId === activeChannelId
    ).length;

  useEffect(() => {
    if (!activeChannelId && channels.length) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, activeChannelId]); 
  
  useEffect(() => {
    if (activeChannelId) {
      console.log(activeChannelId);
      console.log(username);
    }
  }, [activeChannelId, username]);
  // Fetch channels and manage active channel state end



  return (
    <div className="h-100 d-flex flex-column bg-white">
      <NavBar onLogout={handleLogout} />

      {/* Main content area */}
      <Container className="h-100 shadow-sm">
        <div className="row h-100 flex-md-row">

            {/* Sidebar left (channels) */}
            <ChannelsSideBar 
              activeId={activeChannelId}
              onSelectChannel={setActiveChannelId} 
            />{/* Sidebar left (channels) */}

          {/* Right pane (messages, input ...) */}
          <div className="col d-flex flex-column px-0">

            <ChatHeader
              channelName={
                channels.find((ch) => ch.id === activeChannelId)?.name || ''
                }
                messageCount={messageCount}
            />
              <MessagesList
                messages={messages}
                activeChannelId={activeChannelId}
              />
            <div className="mt-auto p-3">
              <MessageForm 
                activeChannelId={activeChannelId} 
                username={username} 
              />
            </div>
          </div>{/* Right pane end */}

        </div>
      </Container>
    </div>
  );
}

export default App
