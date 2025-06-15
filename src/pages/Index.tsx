
import { useState } from "react";
import { MenuBar } from "@/components/MenuBar";
import { StatusBar } from "@/components/StatusBar";
import { MainLayout } from "@/components/MainLayout";
import { useTabManagement } from "@/hooks/useTabManagement";

export interface Board {
  id: string;
  name: string;
  path: string;
}

export interface Thread {
  id: string;
  title: string;
  resCount: number;
  lastModified: string;
}

export interface Post {
  id: number;
  name: string;
  date: string;
  content: string;
}

const Index = () => {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  // Panel visibility states
  const [showSidebar, setShowSidebar] = useState(true);
  const [showThreadList, setShowThreadList] = useState(true);
  const [showThreadView, setShowThreadView] = useState(true);
  const [showWritePanel, setShowWritePanel] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [threadPanelLayout, setThreadPanelLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [isRedditMode, setIsRedditMode] = useState(true);

  // Tab management
  const {
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
  } = useTabManagement();

  // 板選択時の処理（スレッド一覧を自動表示）
  const handleBoardSelect = (board: Board) => {
    setSelectedBoard(board);
    if (!showThreadList) {
      setShowThreadList(true);
    }
    addBoardTab(board);
  };

  // スレッド選択時の処理（コメント一覧を自動表示）
  const handleThreadSelect = (thread: Thread) => {
    setSelectedThread(thread);
    if (!showThreadView) {
      setShowThreadView(true);
    }
    addThreadTab(thread);
  };

  // Board tab handlers with state management
  const onBoardTabClick = (boardId: string) => {
    handleBoardTabClick(boardId, setSelectedBoard);
  };

  const onBoardTabClose = (boardId: string) => {
    handleBoardTabClose(boardId, selectedBoard, setSelectedBoard);
  };

  // Thread tab handlers with state management
  const onThreadTabClick = (threadId: string) => {
    handleThreadTabClick(threadId, setSelectedThread);
  };

  const onThreadTabClose = (threadId: string) => {
    handleThreadTabClose(threadId, selectedThread, setSelectedThread);
  };

  return (
    <div className={`h-screen flex flex-col w-full ${isDarkMode ? 'dark bg-[#1e1e1e] text-[#cccccc]' : 'bg-white text-black'}`}>
      <MenuBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        showThreadList={showThreadList}
        setShowThreadList={setShowThreadList}
        showThreadView={showThreadView}
        setShowThreadView={setShowThreadView}
        showWritePanel={showWritePanel}
        setShowWritePanel={setShowWritePanel}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        threadPanelLayout={threadPanelLayout}
        setThreadPanelLayout={setThreadPanelLayout}
        isRedditMode={isRedditMode}
        setIsRedditMode={setIsRedditMode}
      />

      <div className="flex-1 flex w-full min-h-0">
        <MainLayout
          selectedBoard={selectedBoard}
          selectedThread={selectedThread}
          onBoardSelect={handleBoardSelect}
          onThreadSelect={handleThreadSelect}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          showThreadList={showThreadList}
          setShowThreadList={setShowThreadList}
          showThreadView={showThreadView}
          setShowThreadView={setShowThreadView}
          showWritePanel={showWritePanel}
          setShowWritePanel={setShowWritePanel}
          isDarkMode={isDarkMode}
          threadPanelLayout={threadPanelLayout}
          boardTabs={boardTabs}
          threadTabs={threadTabs}
          onBoardTabClick={onBoardTabClick}
          onBoardTabClose={onBoardTabClose}
          onBoardTabReorder={handleBoardTabReorder}
          onThreadTabClick={onThreadTabClick}
          onThreadTabClose={onThreadTabClose}
          onThreadTabReorder={handleThreadTabReorder}
        />
      </div>

      <StatusBar 
        selectedBoard={selectedBoard}
        selectedThread={selectedThread}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Index;
