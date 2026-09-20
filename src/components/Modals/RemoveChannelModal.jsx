import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../api/apiQueries.js';
import { notifications } from '@mantine/notifications';

const RemoveChannelModal = ({ channel, show, onClose, onRemoved }) => {
  const { t } = useTranslation();
  const { mutateAsync: removeChannel, isPending: isLoading, error } =
    useRemoveChannelMutation();

  const handleRemove = async () => {
    try {
      await removeChannel(channel.id);
      notifications.show({
        title: t('channels.removeModalTitle'),
        message: t('channels.removedSuccessfully'),
        color: 'green',
      });
      onClose();
      onRemoved?.(channel.id);
    } catch {
      // The mutation error is displayed below.
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeModalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('channels.removeConfirmation', { name: channel?.name })}
        {error && <div className="text-danger mt-2">{t('channels.removeError')}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          {t('common.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={isLoading}>
          {isLoading ? t('common.loading') : t('common.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
