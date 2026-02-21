import { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAddChannelMutation } from '../store/api';
import { useTranslation } from 'react-i18next';

const AddChannelModal = ({ show, onClose, onCreated }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [createChannel, { isLoading, error}] = useAddChannelMutation();
  const inputRef = useRef(null);

  useEffect(() => {
          if (show) {
            setName('');
            // small delay to ensure focus after modal mount
            setTimeout(() => inputRef.current?.focus(), 50);
          }
    }, [show]);

  const handleSubmit = async (e) => {
          e.preventDefault();
          const trimmed = name.trim();
          if (!trimmed) return;

          try {
            const newChannel = await createChannel({ name: trimmed }).unwrap();
            // newChannel => { id, name, removable }
            onCreated?.(newChannel);
            onClose();
          } catch {
            // error is handled by RTKQ state; you could also show a toast
          }
    };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.addModalTitle')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder={t('channels.channelName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            aria-label={t('channels.channelName')}
            autoComplete="off"
          />
          {error ? (
            <div className="text-danger mt-2">
              {t('channels.createError')}
            </div>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={isLoading || !name.trim()}>
            {t('common.submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddChannelModal;
