import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAddChannelMutation } from '../../api/apiQueries.js';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import leoProfanity from '../../locales/profanity.jsx';

const AddChannelModal = ({ show, onClose, onCreated, channels = [] }) => {
  const { t } = useTranslation();
  const { mutateAsync: createChannel, isPending: isLoading, error } =
    useAddChannelMutation();
  const inputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '' },
  });
  const name = watch('name', '');
  const { ref: registerRef, ...nameField } = register('name', {
    required: t('channels.channelNameRequired'),
    validate: {
      minLength: (value) =>
        value.trim().length >= 3 || t('channels.channelNameMinLength'),
      maxLength: (value) =>
        value.trim().length <= 20 || t('channels.channelNameMaxLength'),
      profanity: (value) =>
        !leoProfanity.check(value) || t('channels.channelNameProfanity'),
      unique: (value) =>
        !channels.some(
          (channel) => channel.name.trim().toLowerCase() === value.trim().toLowerCase()
        ) || t('channels.channelNameAlreadyExists'),
    },
  });

  useEffect(() => {
    if (show) {
      reset({ name: '' });
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [show, reset]);

  const onSubmit = async ({ name: channelName }) => {
    try {
      const newChannel = await createChannel({ name: channelName.trim() });
      notifications.show({
      title: t('channels.addModalTitle'),
      message: t('channels.createdSuccessfully'),
      color: 'green',
    });
      onCreated?.(newChannel);
      onClose();
    } catch {
      // The mutation error is displayed below.
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.addModalTitle')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            {...nameField}
            ref={(element) => {
              registerRef(element);
              inputRef.current = element;
            }}
            type="text"
            placeholder={t('channels.channelName')}
            disabled={isLoading || isSubmitting}
            aria-label={t('channels.channelName')}
            autoComplete="off"
            className={errors.name ? 'is-invalid' : ''}
          />
          {errors.name ? (
            <div className="text-danger mt-2">{errors.name.message}</div>
          ) : null}
          {error ? (
            <div className="text-danger mt-2">
              {t('channels.createError')}
            </div>
          ) : null}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading || isSubmitting}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={isLoading || isSubmitting || !name.trim()}>
            {t('common.submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddChannelModal;
