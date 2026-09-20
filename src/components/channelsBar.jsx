import { useState } from 'react';
import { useChannelsQuery } from '../api/apiQueries.js';
import { ChevronDown, PlusSquare } from 'react-bootstrap-icons';
import { Dropdown, Nav } from 'react-bootstrap';
import AddChannelModal from './Modals/AddChannelModal.jsx';
import RenameChannelModal from './Modals/RenameChannelModal.jsx';
import RemoveChannelModal from './Modals/RemoveChannelModal.jsx';
import { useTranslation } from 'react-i18next';
import { useUIStateStore } from '../stores/useStores.js';

const ChannelsSidebar = ({ onSelectChannel, activeId }) => {
  const { t } = useTranslation();
  const { data: channels, isLoading, error } = useChannelsQuery();
  const [channelToRename, setChannelToRename] = useState(null);
  const [channelToRemove, setChannelToRemove] = useState(null);

  //modal logic
  const {showAddModal, setShowAddModal} = useUIStateStore();

  if (isLoading) return <div className="p-3">{t('channels.loading')}</div>;
  if (error) return <div className="p-3 text-danger">{t('channels.loadError')}</div>;

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light h-100 d-flex flex-column">
      {/* Header: "Каналы" + plus button */}
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 py-4">
        <b>{t('channels.title')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          aria-label="+"
          title={t('channels.add')}
          onClick={() => setShowAddModal(true)}
        >
          <PlusSquare width={20} height={20} />
          <span className="visually-hidden">{t('channels.add')}</span>
        </button>
      </div>

    {/* Channels list */}
      <Nav variant="pills" className="flex-column">
        {channels.length === 0 ? (
          <div className="p-3">{t('channels.empty')}</div>
        ) : channels.map((ch) => (
          <Nav.Item
            key={ch.id}
            className={`d-flex align-items-center channel-row${
              activeId === ch.id ? ' active' : ''
            }`}
          >
            <Nav.Link
                onClick={() => onSelectChannel(ch.id)}
                className="text-start flex-grow-1 channel-link"
              >
                # {ch.name}
            </Nav.Link>
            {ch.removable && (
              <Dropdown onClick={(event) => event.stopPropagation()}>
                <Dropdown.Toggle
                  variant="link"
                  className="p-2 border-0 channel-toggle"
                  aria-label={t('channels.manage')}
                  title={t('channels.manage')}
                >
                  <ChevronDown className="channel-chevron" size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setChannelToRename(ch)}>
                    {t('channels.rename')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => setChannelToRemove(ch)}
                  >
                    {t('channels.remove')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav.Item>
        ))}
      </Nav> {/* Channels list end*/}
      {/* Add Channel Modal */}
      <AddChannelModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        channels={channels}
        onCreated={(newChannel) => onSelectChannel(newChannel.id)}/>
      <RenameChannelModal
        channel={channelToRename}
        channels={channels}
        show={Boolean(channelToRename)}
        onClose={() => setChannelToRename(null)}
      />
      <RemoveChannelModal
        channel={channelToRemove}
        show={Boolean(channelToRemove)}
        onClose={() => setChannelToRemove(null)}
        onRemoved={(removedId) => {
          if (activeId === removedId) {
            const nextChannel = channels.find((channel) => channel.id !== removedId);
            onSelectChannel(nextChannel?.id ?? null);
          }
        }}
      />
    </div>
  );
};

export default ChannelsSidebar;
