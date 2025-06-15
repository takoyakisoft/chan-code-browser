
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThreadList } from "@/components/ThreadList";
import { ThreadView } from "@/components/ThreadView";
import { WritePanel } from "@/components/WritePanel";
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

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-[#1e1e1e] text-[#cccccc]">
        <AppSidebar 
          selectedBoard={selectedBoard}
          onBoardSelect={setSelectedBoard}
        />
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
            <div className="h-full border-r border-[#3e3e42] bg-[#252526]">
              <ThreadList 
                board={selectedBoard}
                selectedThread={selectedThread}
                onThreadSelect={setSelectedThread}
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-[#3e3e42]" />
          
          <ResizablePanel defaultSize={75}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={75} minSize={30}>
                <div className="h-full bg-[#1e1e1e]">
                  <ThreadView thread={selectedThread} />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle className="bg-[#3e3e42]" />
              
              <ResizablePanel defaultSize={25} minSize={15} maxSize={50}>
                <WritePanel thread={selectedThread} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SidebarProvider>
  );
};

export default Index;
