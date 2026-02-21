import { useTranslation } from 'react-i18next';

const ChatHeader = ({ channelName, messageCount }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>#{channelName}</b>
      </p>
      <span className="text-muted">{t('chat.messages', { count: messageCount })}</span>
    </div>
  );
};

export default ChatHeader;
