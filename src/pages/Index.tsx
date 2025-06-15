
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BoardList } from "@/components/BoardList";
import { ThreadList } from "@/components/ThreadList";
import { ThreadView } from "@/components/ThreadView";
import { WritePanel } from "@/components/WritePanel";
import { MenuBar } from "@/components/MenuBar";
import { StatusBar } from "@/components/StatusBar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

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

  // タブの状態管理
  const [boardTabs, setBoardTabs] = useState<Board[]>([]);
  const [threadTabs, setThreadTabs] = useState<Thread[]>([]);

  // Panel visibility states
  const [showSidebar, setShowSidebar] = useState(true);
  const [showThreadList, setShowThreadList] = useState(true);
  const [showThreadView, setShowThreadView] = useState(true);
  const [showWritePanel, setShowWritePanel] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  // レイアウト: "horizontal"=横並び, "vertical"=上下
  const [threadPanelLayout, setThreadPanelLayout] = useState<"horizontal" | "vertical">("horizontal");

  // 板選択時の処理（スレッド一覧を自動表示）
  const handleBoardSelect = (board: Board) => {
    setSelectedBoard(board);
    if (!showThreadList) {
      setShowThreadList(true);
    }
    
    // タブに追加（重複チェック）
    if (!boardTabs.find(tab => tab.id === board.id)) {
      setBoardTabs(prev => [...prev, board]);
    }
  };

  // スレッド選択時の処理（コメント一覧を自動表示）
  const handleThreadSelect = (thread: Thread) => {
    setSelectedThread(thread);
    if (!showThreadView) {
      setShowThreadView(true);
    }
    
    // タブに追加（重複チェック）
    if (!threadTabs.find(tab => tab.id === thread.id)) {
      setThreadTabs(prev => [...prev, thread]);
    }
  };

  // 板タブの処理
  const handleBoardTabClick = (boardId: string) => {
    const board = boardTabs.find(tab => tab.id === boardId);
    if (board) {
      setSelectedBoard(board);
    }
  };

  const handleBoardTabClose = (boardId: string) => {
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
  const handleThreadTabClick = (threadId: string) => {
    const thread = threadTabs.find(tab => tab.id === threadId);
    if (thread) {
      setSelectedThread(thread);
    }
  };

  const handleThreadTabClose = (threadId: string) => {
    setThreadTabs(prev => prev.filter(tab => tab.id !== threadId));
    if (selectedThread?.id === threadId) {
      const remainingTabs = threadTabs.filter(tab => tab.id !== threadId);
      setSelectedThread(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1] : null);
    }
  };

  const handleThreadTabReorder = (newTabs: Thread[]) => {
    setThreadTabs(newTabs);
  };

  // --- パネルのサイズロジック
  const getSidebarSize = () => (showThreadList ? 15 : 25);
  const getThreadListSize = () => (showThreadView ? 25 : 100);
  const getThreadViewSize = () => (showWritePanel ? 75 : 100);
  const getWritePanelSize = () => 25;

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
      />

      <div className="flex-1 flex w-full min-h-0">
        {(showSidebar || showThreadList || showThreadView) ? (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {showSidebar && (
              <>
                <ResizablePanel defaultSize={getSidebarSize()} minSize={10} maxSize={30}>
                  <div className={`h-full border-r ${isDarkMode ? 'border-[#3e3e42] bg-[#252526]' : 'border-gray-300 bg-gray-50'}`}>
                    <BoardList
                      selectedBoard={selectedBoard}
                      onBoardSelect={handleBoardSelect}
                      isDarkMode={isDarkMode}
                      onClose={() => setShowSidebar(false)}
                    />
                  </div>
                </ResizablePanel>
                {(showThreadList || showThreadView) && (
                  <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
                )}
              </>
            )}

            {(showThreadList || showThreadView) && (
              <ResizablePanel defaultSize={showSidebar ? 85 : 100}>
                {threadPanelLayout === "horizontal" ? (
                  <ResizablePanelGroup direction="horizontal" className="h-full">
                    {showThreadList && (
                      <>
                        <ResizablePanel defaultSize={getThreadListSize()} minSize={15} maxSize={40}>
                          <div className={`h-full border-r ${isDarkMode ? 'border-[#3e3e42] bg-[#252526]' : 'border-gray-300 bg-gray-50'}`}>
                            <ThreadList
                              board={selectedBoard}
                              selectedThread={selectedThread}
                              onThreadSelect={handleThreadSelect}
                              isDarkMode={isDarkMode}
                              onClose={() => setShowThreadList(false)}
                              boardTabs={boardTabs}
                              onBoardTabClick={handleBoardTabClick}
                              onBoardTabClose={handleBoardTabClose}
                              onBoardTabReorder={handleBoardTabReorder}
                            />
                          </div>
                        </ResizablePanel>
                        {showThreadView && (
                          <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
                        )}
                      </>
                    )}

                    {showThreadView && (
                      <ResizablePanel defaultSize={showThreadList ? 75 : 100}>
                        <ResizablePanelGroup direction="vertical" className="h-full">
                          <ResizablePanel defaultSize={getThreadViewSize()} minSize={30}>
                            <div className={`h-full ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                              <ThreadView 
                                thread={selectedThread} 
                                isDarkMode={isDarkMode} 
                                onClose={() => setShowThreadView(false)}
                                threadTabs={threadTabs}
                                onThreadTabClick={handleThreadTabClick}
                                onThreadTabClose={handleThreadTabClose}
                                onThreadTabReorder={handleThreadTabReorder}
                              />
                            </div>
                          </ResizablePanel>
                          {showWritePanel && (
                            <>
                              <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
                              <ResizablePanel defaultSize={getWritePanelSize()} minSize={15} maxSize={50}>
                                <WritePanel 
                                  thread={selectedThread} 
                                  isDarkMode={isDarkMode} 
                                  onClose={() => setShowWritePanel(false)}
                                />
                              </ResizablePanel>
                            </>
                          )}
                        </ResizablePanelGroup>
                      </ResizablePanel>
                    )}
                  </ResizablePanelGroup>
                ) : (
                  // vertical layout: threadList on top, threadView/comments below
                  <ResizablePanelGroup direction="vertical" className="h-full">
                    {showThreadList && (
                      <>
                        <ResizablePanel defaultSize={getThreadListSize()} minSize={15} maxSize={50}>
                          <div className={`h-full border-b ${isDarkMode ? 'border-[#3e3e42] bg-[#252526]' : 'border-gray-300 bg-gray-50'}`}>
                            <ThreadList
                              board={selectedBoard}
                              selectedThread={selectedThread}
                              onThreadSelect={handleThreadSelect}
                              isDarkMode={isDarkMode}
                              onClose={() => setShowThreadList(false)}
                              boardTabs={boardTabs}
                              onBoardTabClick={handleBoardTabClick}
                              onBoardTabClose={handleBoardTabClose}
                              onBoardTabReorder={handleBoardTabReorder}
                            />
                          </div>
                        </ResizablePanel>
                        {showThreadView && (
                          <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
                        )}
                      </>
                    )}
                    {showThreadView && (
                      <ResizablePanel defaultSize={showThreadList ? 75 : 100}>
                        <ResizablePanelGroup direction="vertical" className="h-full">
                          <ResizablePanel defaultSize={getThreadViewSize()} minSize={30}>
                            <div className={`h-full ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                              <ThreadView 
                                thread={selectedThread} 
                                isDarkMode={isDarkMode} 
                                onClose={() => setShowThreadView(false)}
                                threadTabs={threadTabs}
                                onThreadTabClick={handleThreadTabClick}
                                onThreadTabClose={handleThreadTabClose}
                                onThreadTabReorder={handleThreadTabReorder}
                              />
                            </div>
                          </ResizablePanel>
                          {showWritePanel && (
                            <>
                              <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
                              <ResizablePanel defaultSize={getWritePanelSize()} minSize={15} maxSize={50}>
                                <WritePanel 
                                  thread={selectedThread} 
                                  isDarkMode={isDarkMode} 
                                  onClose={() => setShowWritePanel(false)}
                                />
                              </ResizablePanel>
                            </>
                          )}
                        </ResizablePanelGroup>
                      </ResizablePanel>
                    )}
                  </ResizablePanelGroup>
                )}
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        ) : (
          <div className={`h-full flex items-center justify-center ${isDarkMode ? 'bg-[#1e1e1e] text-[#6a6a6a]' : 'bg-white text-gray-500'}`}>
            <p>パネルを表示するには、メニューバーの表示オプションを使用してください</p>
          </div>
        )}
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
