import { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEditChannelMutation } from '../../api/apiQueries.js';
import { notifications } from '@mantine/notifications';
import leoProfanity from '../../locales/profanity.jsx';

const RenameChannelModal = ({ channel, channels = [], show, onClose }) => {
  const { t } = useTranslation();
  const { mutateAsync: editChannel, isPending: isLoading, error } =
    useEditChannelMutation();
  const inputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '' } });

  useEffect(() => {
    if (show && channel) {
      reset({ name: channel.name });
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [channel, reset, show]);

  const { ref: registerRef, ...nameField } = register('name', {
    required: t('channels.channelNameRequired'),
    validate: {
      minLength: (value) =>
        value.trim().length >= 3 || t('channels.channelNameMinLength'),
      maxLength: (value) =>
        value.trim().length <= 20 || t('channels.channelNameMaxLength'),
      unique: (value) =>
        !channels.some(
          (item) => item.id !== channel?.id
            && item.name.trim().toLowerCase() === value.trim().toLowerCase()
        ) || t('channels.channelNameAlreadyExists'),
      profanity: (value) =>
        !leoProfanity.check(value) || t('channels.channelNameProfanity'),
    },
  });

  const onSubmit = async ({ name }) => {
    try {
      await editChannel({ id: channel.id, name: name.trim() });
      notifications.show({
        title: t('channels.renameModalTitle'),
        message: t('channels.renamedSuccessfully'),
        color: 'green',
      });
      onClose();
    } catch {
      // The mutation error is displayed below.
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.renameModalTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            {...nameField}
            ref={(element) => {
              registerRef(element);
              inputRef.current = element;
            }}
            type="text"
            aria-label={t('channels.channelName')}
            placeholder={t('channels.channelName')}
            disabled={isLoading || isSubmitting}
            className={errors.name ? 'is-invalid' : ''}
            autoComplete="off"
          />
          {errors.name && <div className="text-danger mt-2">{errors.name.message}</div>}
          {error && <div className="text-danger mt-2">{t('channels.renameError')}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading || isSubmitting}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={isLoading || isSubmitting}>
            {t('common.submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RenameChannelModal;
