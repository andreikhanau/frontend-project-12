const MessagesList = ({ messages, activeChannelId }) => {
    const filtered = messages.filter(
      (m) => m.channelId === activeChannelId
    );
  
    return (
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {filtered.map((msg) => (
          <div key={msg.id} className="text-break mb-2">
            <b>{msg.username}</b>: {msg.body}
          </div>
        ))}
      </div>
    );
  };
  export default MessagesList;