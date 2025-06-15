
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { BoardList } from "@/components/BoardList";
import { ThreadList } from "@/components/ThreadList";
import { ThreadView } from "@/components/ThreadView";
import { WritePanel } from "@/components/WritePanel";
import { Board, Thread } from "@/pages/Index";
import { getPanelSizes } from "@/utils/panelSizing";

interface MainLayoutProps {
  selectedBoard: Board | null;
  selectedThread: Thread | null;
  onBoardSelect: (board: Board) => void;
  onThreadSelect: (thread: Thread) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  showThreadList: boolean;
  setShowThreadList: (show: boolean) => void;
  showThreadView: boolean;
  setShowThreadView: (show: boolean) => void;
  showWritePanel: boolean;
  setShowWritePanel: (show: boolean) => void;
  isDarkMode: boolean;
  threadPanelLayout: "horizontal" | "vertical";
  boardTabs: Board[];
  threadTabs: Thread[];
  onBoardTabClick: (boardId: string) => void;
  onBoardTabClose: (boardId: string) => void;
  onBoardTabReorder: (tabs: Board[]) => void;
  onThreadTabClick: (threadId: string) => void;
  onThreadTabClose: (threadId: string) => void;
  onThreadTabReorder: (tabs: Thread[]) => void;
}

export function MainLayout({
  selectedBoard,
  selectedThread,
  onBoardSelect,
  onThreadSelect,
  showSidebar,
  setShowSidebar,
  showThreadList,
  setShowThreadList,
  showThreadView,
  setShowThreadView,
  showWritePanel,
  setShowWritePanel,
  isDarkMode,
  threadPanelLayout,
  boardTabs,
  threadTabs,
  onBoardTabClick,
  onBoardTabClose,
  onBoardTabReorder,
  onThreadTabClick,
  onThreadTabClose,
  onThreadTabReorder,
}: MainLayoutProps) {
  const { getSidebarSize, getThreadListSize, getThreadViewSize, getWritePanelSize } = getPanelSizes(
    showThreadList,
    showThreadView,
    showWritePanel
  );

  if (!(showSidebar || showThreadList || showThreadView)) {
    return (
      <div className={`h-full flex items-center justify-center ${isDarkMode ? 'bg-[#1e1e1e] text-[#6a6a6a]' : 'bg-white text-gray-500'}`}>
        <p>パネルを表示するには、メニューバーの表示オプションを使用してください</p>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {showSidebar && (
        <>
          <ResizablePanel defaultSize={getSidebarSize()} minSize={10} maxSize={30}>
            <div className={`h-full border-r ${isDarkMode ? 'border-[#3e3e42] bg-[#252526]' : 'border-gray-300 bg-gray-50'}`}>
              <BoardList
                selectedBoard={selectedBoard}
                onBoardSelect={onBoardSelect}
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
                        onThreadSelect={onThreadSelect}
                        isDarkMode={isDarkMode}
                        onClose={() => setShowThreadList(false)}
                        boardTabs={boardTabs}
                        onBoardTabClick={onBoardTabClick}
                        onBoardTabClose={onBoardTabClose}
                        onBoardTabReorder={onBoardTabReorder}
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
                          onThreadTabClick={onThreadTabClick}
                          onThreadTabClose={onThreadTabClose}
                          onThreadTabReorder={onThreadTabReorder}
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
            <ResizablePanelGroup direction="vertical" className="h-full">
              {showThreadList && (
                <>
                  <ResizablePanel defaultSize={getThreadListSize()} minSize={15} maxSize={50}>
                    <div className={`h-full border-b ${isDarkMode ? 'border-[#3e3e42] bg-[#252526]' : 'border-gray-300 bg-gray-50'}`}>
                      <ThreadList
                        board={selectedBoard}
                        selectedThread={selectedThread}
                        onThreadSelect={onThreadSelect}
                        isDarkMode={isDarkMode}
                        onClose={() => setShowThreadList(false)}
                        boardTabs={boardTabs}
                        onBoardTabClick={onBoardTabClick}
                        onBoardTabClose={onBoardTabClose}
                        onBoardTabReorder={onBoardTabReorder}
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
                          onThreadTabClick={onThreadTabClick}
                          onThreadTabClose={onThreadTabClose}
                          onThreadTabReorder={onThreadTabReorder}
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
  );
}
