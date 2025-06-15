
import { useEffect, useState, useRef } from "react";
import { Thread, Post } from "@/pages/Index";
import { DraggableTabs, TabItem } from "@/components/DraggableTabs";
import { ThreadHeader } from "@/components/ThreadHeader";
import { ThreadContent } from "@/components/ThreadContent";
import { ThreadChart } from "@/components/ThreadChart";
import { ThreadFloatingButtons } from "@/components/ThreadFloatingButtons";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface ThreadViewProps {
  thread: Thread | null;
  isDarkMode: boolean;
  onClose: () => void;
  threadTabs: Thread[];
  onThreadTabClick: (threadId: string) => void;
  onThreadTabClose: (threadId: string) => void;
  onThreadTabReorder: (tabs: Thread[]) => void;
  showChart?: boolean;
  setShowChart?: (show: boolean) => void;
}

// モックデータ
const generateMockPosts = (threadId: string): Post[] => {
  const posts: Post[] = [];
  const names = ["名無しさん", "番組の途中ですがアフィサイトへの転載は禁止です", "風吹けば名無し", "以下、5ちゃんねるからVIPがお送りします"];
  
  for (let i = 1; i <= Math.floor(Math.random() * 100) + 20; i++) {
    posts.push({
      id: i,
      name: names[Math.floor(Math.random() * names.length)],
      date: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      content: `これは${i}番目のレスです。サンプルテキストが入ります。\n\n改行もテストしています。長いテキストの場合はどのように表示されるでしょうか。`.repeat(Math.floor(Math.random() * 3) + 1),
    });
  }
  return posts;
};

// チャート用のモメンタムデータを生成
const generateMomentumData = (posts: Post[]) => {
  const hourlyData: { [key: string]: number } = {};
  
  posts.forEach(post => {
    const hour = new Date(post.date).getHours();
    const key = `${hour}:00`;
    hourlyData[key] = (hourlyData[key] || 0) + 1;
  });
  
  return Object.entries(hourlyData).map(([time, count]) => ({
    time,
    momentum: count
  })).sort((a, b) => parseInt(a.time) - parseInt(b.time));
};

export function ThreadView({ 
  thread, 
  isDarkMode, 
  onClose,
  threadTabs,
  onThreadTabClick,
  onThreadTabClose,
  onThreadTabReorder,
  showChart = false,
  setShowChart
}: ThreadViewProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [momentumData, setMomentumData] = useState<Array<{time: string, momentum: number}>>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thread) {
      const mockPosts = generateMockPosts(thread.id);
      setPosts(mockPosts);
      setMomentumData(generateMomentumData(mockPosts));
    } else {
      setPosts([]);
      setMomentumData([]);
    }
  }, [thread]);

  // スレッドタブの変換
  const threadTabItems: TabItem[] = threadTabs.map(tab => ({
    id: tab.id,
    title: tab.title,
    isActive: thread?.id === tab.id
  }));

  const handleThreadTabReorderWrapper = (tabItems: TabItem[]) => {
    const reorderedThreads = tabItems.map(item => 
      threadTabs.find(thread => thread.id === item.id)!
    );
    onThreadTabReorder(reorderedThreads);
  };

  const scrollToTop = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <DraggableTabs
        tabs={threadTabItems}
        onTabClick={onThreadTabClick}
        onTabClose={onThreadTabClose}
        onTabReorder={handleThreadTabReorderWrapper}
        isDarkMode={isDarkMode}
        maxTitleLength={30}
      />
      
      <ThreadHeader 
        thread={thread}
        posts={posts}
        isDarkMode={isDarkMode}
        onClose={onClose}
      />
      
      <ResizablePanelGroup direction="vertical" className="flex-1 min-h-0">
        <ResizablePanel defaultSize={showChart ? 60 : 100} minSize={30}>
          <div className="h-full relative">
            <ThreadContent 
              thread={thread}
              posts={posts}
              isDarkMode={isDarkMode}
              ref={scrollAreaRef}
            />

            {thread && (
              <ThreadFloatingButtons 
                showChart={showChart}
                setShowChart={setShowChart || (() => {})}
                onScrollToTop={scrollToTop}
                onScrollToBottom={scrollToBottom}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </ResizablePanel>

        {showChart && setShowChart && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} minSize={20} maxSize={70}>
              <ThreadChart 
                showChart={showChart}
                setShowChart={setShowChart}
                momentumData={momentumData}
                isDarkMode={isDarkMode}
              />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
