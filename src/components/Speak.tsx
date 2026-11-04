import { useEffect, useState } from 'react';
import { Icon } from './Icon';

const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

/** Strip markdown so it reads naturally */
const plainText = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[\[|\]\]/g, '')
    .replace(/[#>*_`|]/g, ' ')
    .replace(/\n{2,}/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();

/** Read text aloud with the device's speech engine (useful for dyslexia, or to listen while reading) */
export function SpeakButton({ text, label = 'Read aloud' }: { text: string; label?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => () => { if (canSpeak()) window.speechSynthesis.cancel(); }, []);
  if (!canSpeak()) return null;
  const toggle = () => {
    const synth = window.speechSynthesis;
    if (on) { synth.cancel(); setOn(false); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(plainText(text));
    const voice = synth.getVoices().find((v) => v.lang === 'en-GB') ?? synth.getVoices().find((v) => v.lang.startsWith('en'));
    if (voice) u.voice = voice;
    u.lang = 'en-GB';
    u.rate = 0.95;
    u.onend = () => setOn(false);
    u.onerror = () => setOn(false);
    synth.speak(u);
    setOn(true);
  };
  return (
    <button className={`tool-btn ${on ? 'on' : ''}`} onClick={toggle} aria-pressed={on} title={on ? 'Stop reading' : label}>
      <Icon name={on ? 'close' : 'speaker'} size={18} />
      <span>{on ? 'Stop' : label}</span>
    </button>
  );
}
