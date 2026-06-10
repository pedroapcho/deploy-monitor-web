* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f4f6fb;
  color: #101828;
  font-family: Inter, Arial, Helvetica, sans-serif;
}

button, textarea, input {
  font: inherit;
}

button {
  cursor: pointer;
}

.login-screen {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, .16), transparent 32%),
    #f4f6fb;
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, .08);
}

.login-card h1 {
  margin: 0 0 4px;
}

.login-card p {
  margin: 0 0 20px;
  color: #667085;
}

.login-card input {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid #d0d5dd;
  border-radius: 14px;
  margin-bottom: 12px;
}

.login-card button {
  width: 100%;
  padding: 13px 14px;
  border: 0;
  border-radius: 14px;
  background: #101828;
  color: white;
  font-weight: 700;
}

.login-card span {
  display: block;
  margin-top: 12px;
  font-size: 12px;
  color: #98a2b3;
}

.app {
  min-height: 100vh;
  padding: 18px;
}

.topbar {
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.topbar h1 {
  margin: 0;
  font-size: 24px;
}

.topbar p {
  margin: 4px 0 0;
  color: #667085;
}

.ghost {
  border: 1px solid #d0d5dd;
  background: white;
  color: #101828;
  border-radius: 12px;
  padding: 10px 14px;
}

.grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 18px;
  height: calc(100vh - 104px);
}

.left {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

.card, .preview-card, .proposal {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 14px 44px rgba(15, 23, 42, .045);
}

.card h2, .preview-card h2, .proposal h2 {
  margin: 0 0 12px;
  font-size: 16px;
}

textarea {
  width: 100%;
  height: 132px;
  resize: vertical;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid #d0d5dd;
  outline: none;
}

textarea:focus, input:focus {
  border-color: #2563eb;
}

.primary {
  width: 100%;
  margin-top: 12px;
  padding: 13px 14px;
  border: 0;
  border-radius: 14px;
  background: #2563eb;
  color: white;
  font-weight: 700;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.actions button {
  padding: 12px;
  border: 1px solid #d0d5dd;
  background: #f9fafb;
  border-radius: 14px;
}

button:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.card p {
  margin: 8px 0;
  color: #475467;
}

.history {
  flex: 1;
  overflow: auto;
}

.history-item {
  padding: 12px 0;
  border-bottom: 1px solid #eef2f7;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history-item span, .history-item small, .muted {
  color: #667085;
  font-size: 13px;
}

.main {
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(360px, 1fr) auto;
  gap: 18px;
}

.preview-card {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.preview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
}

.preview-head h2 {
  margin: 0;
}

.preview-head input {
  width: min(520px, 65%);
  padding: 11px 12px;
  border: 1px solid #d0d5dd;
  border-radius: 14px;
}

.preview-frame {
  flex: 1;
  min-height: 0;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  overflow: hidden;
  background: #0b1020;
}

.preview-frame iframe {
  width: 100%;
  height: 100%;
  border: 0;
  background: white;
}

.empty {
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  color: #98a2b3;
}

.proposal {
  max-height: 340px;
  overflow: auto;
}

.proposal p {
  color: #475467;
}

pre {
  white-space: pre-wrap;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  padding: 12px;
  border-radius: 14px;
  overflow: auto;
  font-size: 12px;
  line-height: 1.45;
}

details {
  margin-top: 10px;
}

summary {
  cursor: pointer;
  font-weight: 700;
}

.warning {
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
  padding: 10px 12px;
  border-radius: 14px;
}

.error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 10px 12px;
  border-radius: 14px;
}

@media (max-width: 900px) {
  .app {
    padding: 14px;
  }

  .topbar {
    height: auto;
    align-items: flex-start;
    flex-direction: column;
  }

  .grid {
    height: auto;
    grid-template-columns: 1fr;
  }

  .main {
    grid-template-rows: auto auto;
  }

  .preview-frame {
    height: 62vh;
  }

  .preview-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .preview-head input {
    width: 100%;
  }
}
