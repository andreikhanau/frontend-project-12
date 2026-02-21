import { useEffect, useRef, useState } from "react";
import { useSendMessageMutation } from "../store/api";

const MessageForm = ({ activeChannelId, username }) => {
  const [text, setText] = useState("");
  const [sendMessage, { isLoading, error }] = useSendMessageMutation();
  const inputRef = useRef(null);

  // When channel changes: clear input + focus
  useEffect(() => {
    setText("");
    inputRef.current?.focus();
  }, [activeChannelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = text.trim();
    if (!body || !activeChannelId) return;

    try {
      await sendMessage({ channelId: activeChannelId, body, username }).unwrap();
      setText(""); // clear after successful send
      inputRef.current?.focus();
    } catch {
      // error UI below will handle feedback
    }
  };

  const disabled = isLoading || !activeChannelId || !text.trim();

  return (
    <form onSubmit={handleSubmit} noValidate className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          ref={inputRef}
          name="body"
          aria-label="Новое сообщение"
          placeholder={activeChannelId ? "Введите сообщение..." : "Выберите канал..."}
          className="border-0 p-0 ps-2 form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading || !activeChannelId}
          autoComplete="off"
        />
        <button type="submit" className="btn btn-group-vertical" disabled={disabled}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-square"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>

      {error && (
        <div className="text-danger small mt-2">
          Не удалось отправить сообщение. Попробуйте ещё раз.
        </div>
      )}
    </form>
  );
};

export default MessageForm;