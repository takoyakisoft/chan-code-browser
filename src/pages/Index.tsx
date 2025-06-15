
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThreadList } from "@/components/ThreadList";
import { ThreadView } from "@/components/ThreadView";
import { Separator } from "@/components/ui/separator";

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
        
        <div className="flex-1 flex">
          <div className="w-80 border-r border-[#3e3e42] bg-[#252526]">
            <ThreadList 
              board={selectedBoard}
              selectedThread={selectedThread}
              onThreadSelect={setSelectedThread}
            />
          </div>
          
          <Separator orientation="vertical" className="bg-[#3e3e42]" />
          
          <div className="flex-1 bg-[#1e1e1e]">
            <ThreadView thread={selectedThread} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
