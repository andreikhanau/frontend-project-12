import React, {useState} from 'react';
import { useGetChannelsQuery } from '../store/api';
import { PlusSquare } from 'react-bootstrap-icons';
import { Container, Row, Col, Nav, Button, Card } from "react-bootstrap";
import AddChannelModal from './AddChannelModal';

const ChannelsSidebar = ({ onSelectChannel, activeId }) => {
  const { data: channels, isLoading, error } = useGetChannelsQuery();

  //modal logic
  const [showAddModal, setShowAddModal] = useState(false);

  if (isLoading) return <div className="p-3">Loading channels...</div>;
  if (error) return <div className="p-3 text-danger">Error loading channels</div>;
  if (!channels || channels.length === 0) return <div className="p-3">No channels available</div>;

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light h-100 d-flex flex-column">
      {/* Header: "Каналы" + plus button */}
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 py-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          aria-label="Добавить канал"
          title="Добавить канал"
          onClick={() => setShowAddModal(true)}
        >
          <PlusSquare width={20} height={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>

    {/* Channels list */}
      <Nav variant="pills" className="flex-column">
        {channels.map((ch) => (
          <Nav.Item key={ch.id}>
            <Nav.Link
                active={activeId === ch.id}
                onClick={() => onSelectChannel(ch.id)}
                className="text-start w-100"
              >
                #{ch.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav> {/* Channels list end*/}
      {/* Add Channel Modal */}
      <AddChannelModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={(newChannel) => onSelectChannel(newChannel.id)}/>
    </div>
  );
};

export default ChannelsSidebar;