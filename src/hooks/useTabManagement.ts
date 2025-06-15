
import { useState } from "react";
import { Board, Thread } from "@/pages/Index";

export function useTabManagement() {
  const [boardTabs, setBoardTabs] = useState<Board[]>([]);
  const [threadTabs, setThreadTabs] = useState<Thread[]>([]);

  // 板タブの処理
  const handleBoardTabClick = (boardId: string, setSelectedBoard: (board: Board | null) => void) => {
    const board = boardTabs.find(tab => tab.id === boardId);
    if (board) {
      setSelectedBoard(board);
    }
  };

  const handleBoardTabClose = (boardId: string, selectedBoard: Board | null, setSelectedBoard: (board: Board | null) => void) => {
    setBoardTabs(prev => prev.filter(tab => tab.id !== boardId));
    if (selectedBoard?.id === boardId) {
      const remainingTabs = boardTabs.filter(tab => tab.id !== boardId);
      setSelectedBoard(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1] : null);
    }
  };

  const handleBoardTabReorder = (newTabs: Board[]) => {
    setBoardTabs(newTabs);
  };

  // スレッドタブの処理
  const handleThreadTabClick = (threadId: string, setSelectedThread: (thread: Thread | null) => void) => {
    const thread = threadTabs.find(tab => tab.id === threadId);
    if (thread) {
      setSelectedThread(thread);
    }
  };

  const handleThreadTabClose = (threadId: string, selectedThread: Thread | null, setSelectedThread: (thread: Thread | null) => void) => {
    setThreadTabs(prev => prev.filter(tab => tab.id !== threadId));
    if (selectedThread?.id === threadId) {
      const remainingTabs = threadTabs.filter(tab => tab.id !== threadId);
      setSelectedThread(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1] : null);
    }
  };

  const handleThreadTabReorder = (newTabs: Thread[]) => {
    setThreadTabs(newTabs);
  };

  // タブ追加処理
  const addBoardTab = (board: Board) => {
    if (!boardTabs.find(tab => tab.id === board.id)) {
      setBoardTabs(prev => [...prev, board]);
    }
  };

  const addThreadTab = (thread: Thread) => {
    if (!threadTabs.find(tab => tab.id === thread.id)) {
      setThreadTabs(prev => [...prev, thread]);
    }
  };

  return {
    boardTabs,
    threadTabs,
    handleBoardTabClick,
    handleBoardTabClose,
    handleBoardTabReorder,
    handleThreadTabClick,
    handleThreadTabClose,
    handleThreadTabReorder,
    addBoardTab,
    addThreadTab,
  };
}
