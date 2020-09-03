import {useState} from 'react';

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);
  
  const transition = (newMode, replace = false) => {
    if (replace) {
      //cannot use back() here I think for the same reason mentioned below about mode.
      const newHistory = [...history.slice(0, history.length-1), newMode];
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);      
    } else {
      setMode(newMode);
      const newHistory = [...history, newMode];//cannot use mode here because even though setMode has bein called, it has not rendered yet.
      setHistory(newHistory);
    }
  };

  const back = () => {
    if(history.length > 1) {
      const newHistory = [...history.slice(0, history.length-1)];
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  return {mode, transition, back};
}