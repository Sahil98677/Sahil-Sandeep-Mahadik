import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  HelpCircle, 
  ShieldAlert, 
  Cpu, 
  Lock, 
  ExternalLink,
  CornerDownLeft,
  Eye,
  FileCode,
  Download
} from 'lucide-react';
import { ProfileData, Project, Experience, Certification, SecurityPartner, Education, SkillCategory } from '../types';

interface TerminalModeProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
  partners: SecurityPartner[];
  education: Education[];
  skillCategories: SkillCategory[];
  onOpenResume: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'output' | 'system';
  content: React.ReactNode;
}

export const TerminalMode: React.FC<TerminalModeProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  experiences,
  certifications,
  partners,
  education,
  skillCategories,
  onOpenResume
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanProgress, setScanProgress] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const nowString = () => new Date().toLocaleTimeString('en-US', { hour12: false });

  // Play subtle mechanical / beep sound using Web Audio API
  const playBeep = (freq = 800, duration = 0.04, type: OscillatorType = 'square') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context might be blocked or unsupported
    }
  };

  const initialLogs: CommandLog[] = [
    {
      id: 'boot-1',
      command: 'sys.init',
      timestamp: nowString(),
      type: 'system',
      content: (
        <div className="space-y-1 font-mono text-emerald-400">
          <pre className="text-emerald-500 font-bold leading-none text-xs sm:text-sm tracking-tighter select-none py-1">
{`   _____         _     _ _       __  __       _               _ _ _    
  / ____|       | |   (_) |     |  \\/  |     | |             | (_) |   
 | (___   __ _  | |__  _| |     | \\  / | __ _| |__   __ _  __| |_| | __
  \\___ \\ / _\` | | '_ \\| | |     | |\\/| |/ _\` | '_ \\ / _\` |/ _\` | | |/ /
  ____) | (_| | | | | | | |     | |  | | (_| | | | | (_| | (_| | | |   < 
 |_____/ \\__,_| |_| |_|_|_|     |_|  |_|\\__,_|_| |_|\\__,_|\\__,_|_|_|_|\\_\\`}
          </pre>
          <div className="text-xs text-emerald-300/80 font-mono flex flex-wrap gap-x-4 gap-y-1 border-t border-b border-emerald-500/20 py-1.5 my-2">
            <span>[HOST: SAHIL-SEC-WS01]</span>
            <span>[ROLE: {profile.title.toUpperCase()}]</span>
            <span>[SECURITY_CLEARANCE: LEVEL_4]</span>
            <span>[STATUS: OPERATIONAL]</span>
          </div>
          <p className="text-xs text-zinc-400">
            Welcome to the Cyber Defense Terminal. Type <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-700/40">help</span> to list available commands or <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-700/40">scan</span> to run a threat diagnostic.
          </p>
        </div>
      ),
    },
  ];

  const [logs, setLogs] = useState<CommandLog[]>(initialLogs);

  // Auto focus terminal input on open & log change
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, logs]);

  // Keyboard shortcut Esc to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Matrix Digital Rain effect when triggered
  useEffect(() => {
    if (!isMatrixActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%&*<>{}[]=+/';
    const alphabet = katakana + latin;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops: number[] = Array.from({ length: columns }).map(() => 1);

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 12, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMatrixActive]);

  // Simulate threat scan animation
  const triggerScan = () => {
    setScanProgress(0);
    playBeep(440, 0.08);

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setScanProgress(current);
      playBeep(300 + current * 6, 0.02);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setScanProgress(null);
          playBeep(880, 0.15, 'triangle');
          addLog(
            'scan',
            <div className="space-y-2 font-mono text-xs">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>SCAN COMPLETE: 0 VULNERABILITIES DETECTED • ZERO TRUST ACTIVE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 bg-emerald-950/40 rounded border border-emerald-800/40 text-zinc-300">
                <div>• Gateway: <span className="text-emerald-400">crescent-edge-fw01 (Protected)</span></div>
                <div>• PAM Engine: <span className="text-emerald-400">WALLIX Bastion (Enforced)</span></div>
                <div>• EDR / ASM: <span className="text-emerald-400">CyCraft AIR (Healthy)</span></div>
                <div>• OWASP API Baseline: <span className="text-emerald-400">10/10 Passed</span></div>
              </div>
            </div>,
            'success'
          );
        }, 400);
      }
    }, 120);
  };

  const addLog = (command: string, content: React.ReactNode, type: CommandLog['type'] = 'output') => {
    const newLog: CommandLog = {
      id: `cmd-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      command,
      timestamp: nowString(),
      type,
      content,
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    playBeep(900, 0.03);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (cmd) {
      case 'help':
        addLog(
          trimmed,
          <div className="space-y-2 font-mono text-xs text-zinc-300">
            <p className="text-emerald-400 font-semibold">Available Terminal Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 bg-black/40 p-3 rounded border border-emerald-900/40">
              <div><span className="text-emerald-400 font-bold">whoami</span> - Display identity & security profile</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - Inspect technical capabilities</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - List security engineering works</div>
              <div><span className="text-emerald-400 font-bold">experience</span> - Show professional career timeline</div>
              <div><span className="text-emerald-400 font-bold">certifications</span> - View security credentials</div>
              <div><span className="text-emerald-400 font-bold">partners</span> - Inspect CyCraft & WALLIX ties</div>
              <div><span className="text-emerald-400 font-bold">education</span> - Display academic credentials</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Retrieve secure contact channels</div>
              <div><span className="text-emerald-400 font-bold">resume</span> - Open interactive CV / Resume</div>
              <div><span className="text-emerald-400 font-bold">scan</span> - Run real-time security diagnostics</div>
              <div><span className="text-emerald-400 font-bold">matrix</span> - Toggle digital rain visualizer</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear current terminal buffer</div>
              <div><span className="text-emerald-400 font-bold">exit</span> - Return to standard modern GUI</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        addLog(
          trimmed,
          <div className="space-y-2 font-mono text-xs text-zinc-300">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>{profile.name}</span>
            </div>
            <p className="text-emerald-300/90">{profile.title} • {profile.location}</p>
            <p className="text-zinc-400 leading-relaxed max-w-2xl">{profile.bio}</p>
            <div className="flex flex-wrap gap-4 pt-1 text-zinc-400">
              <span>DOB: <strong className="text-zinc-200">{profile.dob}</strong></span>
              <span>EMAIL: <strong className="text-zinc-200">{profile.email}</strong></span>
              <span>PHONE: <strong className="text-zinc-200">{profile.phone}</strong></span>
            </div>
          </div>
        );
        break;

      case 'skills':
        addLog(
          trimmed,
          <div className="space-y-3 font-mono text-xs">
            <p className="text-emerald-400 font-bold">Core Competencies & Defense Domains:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skillCategories.map((cat) => (
                <div key={cat.category} className="p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40">
                  <div className="text-emerald-300 font-bold mb-1 flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-[10px] text-zinc-500 font-normal">{cat.skills.length} skills</span>
                  </div>
                  {cat.description && (
                    <p className="text-[11px] text-zinc-400 mb-2 leading-relaxed">{cat.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-300/90 text-[11px] border border-emerald-800/40 flex items-center gap-1">
                        <span>{s.name}</span>
                        {s.level ? <span className="text-[9px] text-emerald-500 font-bold">({s.level}%)</span> : null}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        addLog(
          trimmed,
          <div className="space-y-3 font-mono text-xs">
            <p className="text-emerald-400 font-bold">Architectural Projects & Audits ({projects.length}):</p>
            <div className="space-y-2.5">
              {projects.map((p, idx) => (
                <div key={p.id} className="p-3 bg-zinc-900/60 rounded border border-emerald-900/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">[{idx + 1}] {p.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs">{p.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 bg-black/60 rounded text-emerald-400/80 border border-emerald-900/40">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'experience':
        addLog(
          trimmed,
          <div className="space-y-3 font-mono text-xs">
            <p className="text-emerald-400 font-bold">Professional Career Trajectory:</p>
            <div className="space-y-2.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-3 bg-zinc-900/60 rounded border border-emerald-900/40 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-emerald-300 font-bold">{exp.role} @ {exp.company}</span>
                    <span className="text-zinc-500 text-[11px]">{exp.period} • {exp.location}</span>
                  </div>
                  <p className="text-zinc-300 text-xs">{exp.description}</p>
                  <ul className="list-disc list-inside text-zinc-400 text-[11px] space-y-0.5 pt-1">
                    {exp.achievements.slice(0, 2).map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'certifications':
        addLog(
          trimmed,
          <div className="space-y-2.5 font-mono text-xs">
            <p className="text-emerald-400 font-bold">Verified Cybersecurity Certifications ({certifications.length}):</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {certifications.map((c) => (
                <div key={c.id} className="p-2.5 bg-zinc-900/70 rounded border border-emerald-900/40">
                  <div className="text-emerald-300 font-bold text-xs">{c.name}</div>
                  <div className="text-zinc-400 text-[11px]">{c.issuer} • {c.year}</div>
                  {c.credentialId && (
                    <div className="text-emerald-400/80 text-[10px] mt-1 font-mono">ID: {c.credentialId}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'partners':
        addLog(
          trimmed,
          <div className="space-y-3 font-mono text-xs">
            <p className="text-emerald-400 font-bold">Enterprise Security Partners & OEM Integrations:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {partners.map((pt) => (
                <div key={pt.id} className="p-3 bg-zinc-900/80 rounded border border-emerald-900/40 space-y-1">
                  <div className="text-emerald-300 font-bold flex items-center justify-between">
                    <span>{pt.name}</span>
                    <span className="text-[10px] text-zinc-400">{pt.industry}</span>
                  </div>
                  <p className="text-zinc-300 text-xs">{pt.productFocus}</p>
                  <p className="text-zinc-400 text-[11px] italic">{pt.integrationScope}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'education':
        addLog(
          trimmed,
          <div className="space-y-2.5 font-mono text-xs">
            <p className="text-emerald-400 font-bold">Academic Background:</p>
            {education.map((edu) => (
              <div key={edu.id} className="p-2.5 bg-zinc-900/70 rounded border border-emerald-900/40">
                <div className="text-emerald-300 font-bold">{edu.degree}</div>
                <div className="text-zinc-400 text-[11px]">{edu.institution} ({edu.period})</div>
                {edu.score && <div className="text-emerald-400 text-xs mt-0.5">Grade / Score: {edu.score}</div>}
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        addLog(
          trimmed,
          <div className="space-y-2 font-mono text-xs text-zinc-300">
            <p className="text-emerald-400 font-bold">Secure Contact Channels:</p>
            <div className="p-3 bg-zinc-900/70 rounded border border-emerald-900/40 space-y-1.5">
              <div>Email: <a href={`mailto:${profile.email}`} className="text-emerald-400 hover:underline">{profile.email}</a></div>
              <div>Phone: <span className="text-zinc-200">{profile.phone}</span></div>
              <div>Location: <span className="text-zinc-200">{profile.location}</span></div>
              <div>GitHub: <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{profile.socialLinks.github}</a></div>
              <div>LinkedIn: <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{profile.socialLinks.linkedin}</a></div>
            </div>
          </div>
        );
        break;

      case 'scan':
        triggerScan();
        break;

      case 'matrix':
        setIsMatrixActive((prev) => !prev);
        playBeep(600, 0.05);
        addLog(
          trimmed,
          <div className="text-xs text-emerald-400 font-mono">
            [SYS] Matrix visualizer {!isMatrixActive ? 'ACTIVATED' : 'DEACTIVATED'}.
          </div>,
          'info'
        );
        break;

      case 'resume':
      case 'cv':
        onOpenResume();
        addLog(
          trimmed,
          <div className="text-xs text-emerald-400 font-mono">
            [SYS] Initializing interactive resume modal display...
          </div>,
          'success'
        );
        break;

      case 'clear':
      case 'cls':
        setLogs([]);
        playBeep(400, 0.02);
        break;

      case 'exit':
      case 'quit':
        addLog(trimmed, <span className="text-xs font-mono text-zinc-400">Terminating CLI session. Restoring default GUI...</span>, 'warn');
        setTimeout(() => {
          onClose();
        }, 500);
        break;

      default:
        playBeep(220, 0.1, 'sawtooth');
        addLog(
          trimmed,
          <div className="text-xs font-mono text-red-400">
            zsh: command not found: <span className="underline font-bold">{cmd}</span>. Type <span className="text-emerald-400 font-bold">help</span> to view all valid operations.
          </div>,
          'error'
        );
        break;
    }

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[history.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[history.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 transition-all duration-300 font-mono select-text`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          inputRef.current?.focus();
        }
      }}
    >
      {/* Terminal Window Container */}
      <div
        className={`relative flex flex-col bg-zinc-950 text-emerald-400 border border-emerald-500/40 rounded-xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-full h-full rounded-none border-none' : 'w-full max-w-5xl h-[88vh] max-h-[850px]'
        }`}
      >
        {/* Matrix Canvas Layer (Optional Background) */}
        {isMatrixActive && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-25 z-0"
          />
        )}

        {/* CRT Scanline Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 z-10" />

        {/* Terminal Header Bar */}
        <div className="relative z-20 flex items-center justify-between px-3 sm:px-4 py-2.5 bg-zinc-900/90 border-b border-emerald-900/50 select-none">
          <div className="flex items-center gap-2">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                title="Close terminal"
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors cursor-pointer"
              />
              <button
                onClick={() => setLogs([])}
                title="Clear buffer"
                className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center transition-colors cursor-pointer"
              />
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                title="Toggle fullscreen"
                className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 flex items-center justify-center transition-colors cursor-pointer"
              />
            </div>

            <div className="h-4 w-px bg-zinc-700/60 mx-1.5" />

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold tracking-wider text-emerald-400 hidden sm:inline">SAHIL-SEC-OS</span>
              <span className="text-zinc-500 text-[11px] hidden md:inline">v2.4-audit (x86_64-defense)</span>
            </div>
          </div>

          {/* Header Action Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick action buttons */}
            <button
              onClick={triggerScan}
              disabled={scanProgress !== null}
              title="Run Security Diagnostic Scan"
              className="px-2 py-1 rounded bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-700/50 text-[11px] text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
            >
              <ShieldAlert className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Run Scan</span>
            </button>

            <button
              onClick={() => setIsMatrixActive(!isMatrixActive)}
              title="Toggle Matrix Effect"
              className={`px-2 py-1 rounded border text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                isMatrixActive
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-zinc-800/80 hover:bg-zinc-700/80 border-zinc-700 text-zinc-300'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span className="hidden sm:inline">Matrix</span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Audio Beeps' : 'Enable Audio Beeps'}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer text-xs"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClose}
              title="Exit Terminal Mode (Esc)"
              className="p-1 rounded hover:bg-red-950/60 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scan progress banner if scanning */}
        {scanProgress !== null && (
          <div className="relative z-20 bg-emerald-950/90 border-b border-emerald-700 px-4 py-2 flex items-center justify-between text-xs font-mono text-emerald-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>DIAGNOSTIC IN PROGRESS: INSPECTING ZERO TRUST BOUNDARIES & PERIMETER...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-48 bg-zinc-900 rounded-full h-2 overflow-hidden border border-emerald-800">
                <div
                  className="bg-emerald-400 h-full transition-all duration-150"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <span className="font-bold">{scanProgress}%</span>
            </div>
          </div>
        )}

        {/* Terminal Screen Body (Logs + Active Prompt) */}
        <div
          className="relative z-20 flex-1 overflow-y-auto p-3 sm:p-5 space-y-3.5 custom-scrollbar text-xs sm:text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              {log.type !== 'system' && (
                <div className="flex items-center gap-2 text-zinc-400 text-xs select-none">
                  <span className="text-emerald-500 font-bold">sahil@sec-station:~$</span>
                  <span className="text-zinc-100 font-semibold">{log.command}</span>
                  <span className="text-zinc-600 text-[10px] ml-auto">{log.timestamp}</span>
                </div>
              )}
              <div className="pl-0 sm:pl-2">
                {log.content}
              </div>
            </div>
          ))}

          {/* Real-time active input prompt */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold select-none whitespace-nowrap">
              sahil@sec-station:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-emerald-300 border-none outline-none font-mono focus:ring-0 p-0 text-xs sm:text-sm caret-emerald-400"
              placeholder="type 'help', 'scan', 'projects', 'resume'..."
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div ref={terminalBottomRef} />
        </div>

        {/* Terminal Footer Navigation Pills */}
        <div className="relative z-20 px-3 sm:px-4 py-2 bg-zinc-900/90 border-t border-emerald-900/40 flex items-center justify-between text-[11px] text-zinc-400 select-none overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            <span className="text-zinc-500 hidden sm:inline">Shortcuts:</span>
            {['help', 'whoami', 'skills', 'projects', 'experience', 'certifications', 'scan', 'resume', 'exit'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(cmd);
                  inputRef.current?.focus();
                }}
                className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-emerald-950 hover:text-emerald-400 border border-zinc-700/60 hover:border-emerald-700/60 transition-colors text-[11px] font-mono cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="text-[10px] text-zinc-500 shrink-0 hidden md:flex items-center gap-2">
            <span>[UP/DOWN] History</span>
            <span>•</span>
            <span>[ESC] Exit GUI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
