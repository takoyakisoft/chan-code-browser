
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
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

  return (
    <div className={`min-h-screen flex flex-col w-full ${isDarkMode ? 'bg-[#1e1e1e] text-[#cccccc]' : 'bg-white text-black'}`}>
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
      />
      
      <SidebarProvider defaultOpen={showSidebar}>
        <div className="flex-1 flex w-full">
          {showSidebar && (
            <AppSidebar 
              selectedBoard={selectedBoard}
              onBoardSelect={setSelectedBoard}
            />
          )}
          
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {showThreadList && (
              <>
                <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
                  <div className={`h-full border-r ${isDarkMode ? 'border-[#3e3e42] bg-[#252526]' : 'border-gray-300 bg-gray-50'}`}>
                    <ThreadList 
                      board={selectedBoard}
                      selectedThread={selectedThread}
                      onThreadSelect={setSelectedThread}
                    />
                  </div>
                </ResizablePanel>
                
                <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
              </>
            )}
            
            <ResizablePanel defaultSize={75}>
              <ResizablePanelGroup direction="vertical">
                {showThreadView && (
                  <>
                    <ResizablePanel defaultSize={75} minSize={30}>
                      <div className={`h-full ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                        <ThreadView thread={selectedThread} />
                      </div>
                    </ResizablePanel>
                    
                    {showWritePanel && (
                      <ResizableHandle withHandle className={isDarkMode ? "bg-[#3e3e42]" : "bg-gray-300"} />
                    )}
                  </>
                )}
                
                {showWritePanel && (
                  <ResizablePanel defaultSize={25} minSize={15} maxSize={50}>
                    <WritePanel thread={selectedThread} />
                  </ResizablePanel>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
