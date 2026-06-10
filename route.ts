'use client';

import { useEffect, useMemo, useState } from 'react';

type ChangeFile = {
  path: string;
  content: string;
};

type Task = {
  id: string;
  instruction: string;
  createdAt: string;
  status: string;
  summary: string;
  steps: string[];
  files: ChangeFile[];
  warnings: string[];
  error?: string;
};

const DEFAULT_PREVIEW = process.env.NEXT_PUBLIC_PREVIEW_URL || '';

export default function Page() {
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState('');
  const [instruction, setInstruction] = useState('');
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_PREVIEW);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const savedLogin = localStorage.getItem('dm-core-login');
    const savedTasks = localStorage.getItem('dm-core-tasks');
    if (savedLogin === 'true') setIsLogged(true);
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem('dm-core-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!isLogged) return;
    fetch('/api/status')
      .then((r) => r.json())
      .then((data) => {
        setStatus(data);
        if (data.previewUrl) setPreviewUrl(data.previewUrl);
      })
      .catch(() => {});
  }, [isLogged]);

  const latest = useMemo(() => tasks[0], [tasks]);

  async function login() {
    setBusy(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!res.ok) throw new Error('Password incorrecto');

      localStorage.setItem('dm-core-login', 'true');
      setIsLogged(true);
    } catch (err: any) {
      alert(err.message);
    }
    setBusy(false);
  }

  async function runEngine() {
    if (!instruction.trim()) return;

    setBusy(true);
    try {
      const res = await fetch('/api/engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');

      const task: Task = {
        id: crypto.randomUUID(),
        instruction,
        createdAt: new Date().toLocaleString(),
        status: data.status,
        summary: data.result.summary,
        steps: data.result.steps || [],
        files: data.result.files || [],
        warnings: data.result.warnings || []
      };

      setTasks((prev) => [task, ...prev]);
      setInstruction('');
    } catch (err: any) {
      setTasks((prev) => [{
        id: crypto.randomUUID(),
        instruction,
        createdAt: new Date().toLocaleString(),
        status: 'Error',
        summary: 'El motor falló',
        steps: [],
        files: [],
        warnings: [],
        error: err.message
      }, ...prev]);
    }
    setBusy(false);
  }

  async function applyChanges() {
    if (!latest?.files?.length) return;

    setBusy(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: latest.files, message: `Deploy Monitor: ${latest.instruction.slice(0, 70)}` })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');

      setTasks((prev) => prev.map((task, index) => index === 0 ? { ...task, status: 'GitHub actualizado' } : task));
    } catch (err: any) {
      setTasks((prev) => prev.map((task, index) => index === 0 ? { ...task, status: 'Error', error: err.message } : task));
    }
    setBusy(false);
  }

  async function deploy() {
    setBusy(true);
    try {
      const res = await fetch('/api/deploy', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');

      setTasks((prev) => prev.map((task, index) => index === 0 ? { ...task, status: 'Deploy disparado' } : task));
    } catch (err: any) {
      setTasks((prev) => prev.map((task, index) => index === 0 ? { ...task, status: 'Error', error: err.message } : task));
    }
    setBusy(false);
  }

  if (!isLogged) {
    return (
      <main className="login-screen">
        <section className="login-card">
          <h1>Deploy Monitor Core</h1>
          <p>Acceso privado</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />
          <button onClick={login} disabled={busy}>{busy ? 'Entrando...' : 'Entrar'}</button>
          <span>Password demo: demo123</span>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <h1>Deploy Monitor Core</h1>
          <p>Web core · iPhone PWA · Windows navegador · Mac app después</p>
        </div>
        <button
          className="ghost"
          onClick={() => {
            localStorage.removeItem('dm-core-login');
            setIsLogged(false);
          }}
        >
          Salir
        </button>
      </header>

      <section className="grid">
        <aside className="left">
          <section className="card">
            <h2>Instrucción</h2>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Ejemplo: agrega un botón de WhatsApp en el header..."
            />
            <button className="primary" onClick={runEngine} disabled={busy}>
              {busy ? 'Procesando...' : 'Generar propuesta'}
            </button>
          </section>

          <section className="card">
            <h2>Acciones</h2>
            <div className="actions">
              <button onClick={applyChanges} disabled={busy || !latest?.files?.length}>
                Aplicar a GitHub
              </button>
              <button onClick={deploy} disabled={busy}>
                Deploy Vercel
              </button>
            </div>
          </section>

          <section className="card">
            <h2>Estado</h2>
            <p><b>OpenAI:</b> {status?.openai ? 'Conectado' : 'Pendiente'}</p>
            <p><b>GitHub:</b> {status?.github ? `${status.github.owner}/${status.github.repo}` : 'Pendiente'}</p>
            <p><b>Vercel:</b> {status?.vercel ? 'Hook listo' : 'Pendiente'}</p>
            <p><b>Archivos:</b> {status?.github?.allowedFiles?.length || 0}</p>
          </section>

          <section className="card history">
            <h2>Historial</h2>
            {tasks.length === 0 && <p className="muted">Sin instrucciones todavía.</p>}
            {tasks.map((task, index) => (
              <div className="history-item" key={task.id}>
                <strong>v{tasks.length - index} · {task.status}</strong>
                <span>{task.instruction}</span>
                <small>{task.createdAt}</small>
              </div>
            ))}
          </section>
        </aside>

        <section className="main">
          <section className="preview-card">
            <div className="preview-head">
              <h2>Preview</h2>
              <input
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                placeholder="https://tu-preview.vercel.app"
              />
            </div>

            <div className="preview-frame">
              {previewUrl ? (
                <iframe src={previewUrl} title="Preview" />
              ) : (
                <div className="empty">
                  <h3>Sin preview</h3>
                  <p>Pega una URL pública de Vercel, Netlify o Replit.</p>
                </div>
              )}
            </div>
          </section>

          {latest && (
            <section className="proposal">
              <h2>Última propuesta</h2>
              <p>{latest.summary}</p>

              {latest.steps.length > 0 && (
                <pre>{latest.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}</pre>
              )}

              {latest.files.length > 0 && (
                <div className="files">
                  <h3>Archivos propuestos</h3>
                  {latest.files.map((file) => (
                    <details key={file.path}>
                      <summary>{file.path}</summary>
                      <pre>{file.content}</pre>
                    </details>
                  ))}
                </div>
              )}

              {latest.warnings.length > 0 && (
                <div className="warning">
                  {latest.warnings.map((warning) => <p key={warning}>{warning}</p>)}
                </div>
              )}

              {latest.error && <div className="error">{latest.error}</div>}
            </section>
          )}
        </section>
      </section>
    </main>
  );
}
