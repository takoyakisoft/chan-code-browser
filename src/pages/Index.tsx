
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThreadList } from "@/components/ThreadList";
import { ThreadView } from "@/components/ThreadView";
import { WritePanel } from "@/components/WritePanel";
import { MenuBar } from "@/components/MenuBar";
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

  // Panel visibility states
  const [showSidebar, setShowSidebar] = useState(true);
  const [showThreadList, setShowThreadList] = useState(true);
  const [showThreadView, setShowThreadView] = useState(true);
  const [showWritePanel, setShowWritePanel] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  // レイアウト: "horizontal"=横並び, "vertical"=上下
  const [threadPanelLayout, setThreadPanelLayout] = useState<"horizontal" | "vertical">("horizontal");

  // サイドバーが完全非表示でも再表示できるよう、SidebarTriggerを固定表示する
  // 右上に表示するためのスタイル
  const sidebarTriggerClass =
    "fixed top-2 left-2 z-50 bg-white dark:bg-[#252526] border border-gray-300 dark:border-[#3e3e42] rounded shadow-md";

  // --- パネルのサイズロジック
  const getThreadListSize = () => (showThreadView ? 25 : 100);
  const getThreadViewSize = () => (showWritePanel ? 75 : 100);
  const getWritePanelSize = () => 25;

  return (
    <div className={`min-h-screen flex flex-col w-full ${isDarkMode ? 'dark bg-[#1e1e1e] text-[#cccccc]' : 'bg-white text-black'}`}>
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

      {/* サイドバーが非表示時も再表示トリガーを左上に出す */}
      {!showSidebar && (
        <div className={sidebarTriggerClass} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SidebarTrigger
            onClick={() => setShowSidebar(true)}
            className="h-8 w-8 m-0 p-0"
            aria-label="板一覧を表示"
          />
        </div>
      )}

      <SidebarProvider defaultOpen={showSidebar}>
        <div className="flex-1 flex w-full">
          {showSidebar && (
            <AppSidebar
              selectedBoard={selectedBoard}
              onBoardSelect={setSelectedBoard}
              isDarkMode={isDarkMode}
            />
          )}

          <div className="flex-1">
            {(showThreadList || showThreadView) ? (
              threadPanelLayout === "horizontal" ? (
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  {showThreadList && (
                    <>
                      <ResizablePanel defaultSize={getThreadListSize()} minSize={15} maxSize={40}>
                        <div className={`h-full border-r ${isDarkMode ? 'border-[#3e3e42] bg-[#252526]' : 'border-gray-300 bg-gray-50'}`}>
                          <ThreadList
                            board={selectedBoard}
                            selectedThread={selectedThread}
                            onThreadSelect={setSelectedThread}
                            isDarkMode={isDarkMode}
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
                      <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={getThreadViewSize()} minSize={30}>
                          <div className={`h-full ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                            <ThreadView thread={selectedThread} isDarkMode={isDarkMode} />
                          </div>
                        </ResizablePanel>
                        {showWritePanel && (
                          <>
                            <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
                            <ResizablePanel defaultSize={getWritePanelSize()} minSize={15} maxSize={50}>
                              <WritePanel thread={selectedThread} isDarkMode={isDarkMode} />
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
                            onThreadSelect={setSelectedThread}
                            isDarkMode={isDarkMode}
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
                      <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={getThreadViewSize()} minSize={30}>
                          <div className={`h-full ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                            <ThreadView thread={selectedThread} isDarkMode={isDarkMode} />
                          </div>
                        </ResizablePanel>
                        {showWritePanel && (
                          <>
                            <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
                            <ResizablePanel defaultSize={getWritePanelSize()} minSize={15} maxSize={50}>
                              <WritePanel thread={selectedThread} isDarkMode={isDarkMode} />
                            </ResizablePanel>
                          </>
                        )}
                      </ResizablePanelGroup>
                    </ResizablePanel>
                  )}
                </ResizablePanelGroup>
              )
            ) : (
              <div className={`h-full flex items-center justify-center ${isDarkMode ? 'bg-[#1e1e1e] text-[#6a6a6a]' : 'bg-white text-gray-500'}`}>
                <p>パネルを表示するには、メニューバーの表示オプションを使用してください</p>
              </div>
            )}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
