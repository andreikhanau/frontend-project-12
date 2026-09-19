import { useEffect} from 'react';
import ChannelsSideBar from '../components/getChannels';
import { useChannelsQuery, useMessagesQuery } from '../store/apiQueries';
import NavBar from '../components/navBar';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ChatHeader from '../components/chatHeader';
import MessageForm from '../components/messageForm';
import MessagesList from '../components/messages';
import { useAuthStore } from '../store/authStore';
import useUIStateStore from '../store/uiState';
import ChannelSocketSync from '../sockets/ChannelSocketSync';
import MessageSocketSync from '../sockets/MessageSocketSync';

function App() {
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  //logout handler end

  // Fetch channels and manage active channel state
  const { data: channels = [] } = useChannelsQuery();
  const { data: messages = [] } = useMessagesQuery();
  const { activeChannelId, setActiveChannelId } = useUIStateStore();

  const messageCount = messages.filter(
    (m) => m.channelId === activeChannelId
    ).length;

  useEffect(() => {
    if (!activeChannelId && channels.length) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, activeChannelId, setActiveChannelId]);
  
  return (
    <div className="h-100 d-flex flex-column bg-white">
      <ChannelSocketSync />
      <MessageSocketSync />
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
