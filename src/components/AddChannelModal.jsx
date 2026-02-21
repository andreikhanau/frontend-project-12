import { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAddChannelMutation } from '../store/api';

const AddChannelModal = ({ show, onClose, onCreated }) => {
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
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Имя канала"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            aria-label="Имя канала"
            autoComplete="off"
          />
          {error ? (
            <div className="text-danger mt-2">
              Не удалось создать канал. Попробуйте ещё раз.
            </div>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Отменить
          </Button>
          <Button type="submit" disabled={isLoading || !name.trim()}>
            Отправить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddChannelModal;