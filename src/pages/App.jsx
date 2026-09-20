import { useEffect} from 'react';
import ChannelsSideBar from '../components/channelsBar.jsx';
import { useChannelsQuery, useMessagesQuery } from '../api/apiQueries.js';
import NavBar from '../components/navBar';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ChatHeader from '../components/chatHeader';
import MessageForm from '../components/messageForm';
import MessagesList from '../components/messages';
import { useAuthStore, useUIStateStore } from '../stores/useStores.js';
import ChannelSocketSync from '../sockets/ChannelSocketSync';
import MessageSocketSync from '../sockets/MessageSocketSync';

function App({ socket }) {
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
    const activeChannelExists = channels.some(
      (channel) => channel.id === activeChannelId
    );

    if (channels.length && (!activeChannelId || !activeChannelExists)) {
      setActiveChannelId(channels[0].id);
    } else if (!channels.length && activeChannelId) {
      setActiveChannelId(null);
    }
  }, [channels, activeChannelId, setActiveChannelId]);
  
  return (
    <div className="h-100 d-flex flex-column bg-white">
      <ChannelSocketSync socket={socket} />
      <MessageSocketSync socket={socket} />
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
