import { useEffect, useState, useRef } from "react";
import { MessageSquare, User, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { Thread, Post } from "@/pages/Index";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DraggableTabs, TabItem } from "@/components/DraggableTabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface ThreadViewProps {
  thread: Thread | null;
  isDarkMode: boolean;
  onClose: () => void;
  threadTabs: Thread[];
  onThreadTabClick: (threadId: string) => void;
  onThreadTabClose: (threadId: string) => void;
  onThreadTabReorder: (tabs: Thread[]) => void;
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

const chartConfig = {
  momentum: {
    label: "勢い",
    color: "#007acc",
  },
};

export function ThreadView({ 
  thread, 
  isDarkMode, 
  onClose,
  threadTabs,
  onThreadTabClick,
  onThreadTabClose,
  onThreadTabReorder
}: ThreadViewProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showChart, setShowChart] = useState(false);
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
      
      <div className={`p-4 border-b flex items-start justify-between ${isDarkMode ? 'border-[#3e3e42] bg-[#2d2d30]' : 'border-gray-300 bg-gray-100'}`}>
        <div className="flex-1 min-w-0">
          <h1 className={`font-medium mb-1 ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'}`}>
            {thread ? thread.title : 'スレッド未指定'}
          </h1>
          <div className={`flex items-center gap-4 text-xs ${isDarkMode ? 'text-[#6a6a6a]' : 'text-gray-500'}`}>
            {thread ? (
              <>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {posts.length} レス
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(thread.lastModified).toLocaleString('ja-JP')}
                </span>
              </>
            ) : (
              <span>スレッドを選択してください</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={`h-6 w-6 p-0 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#2a2d2e]' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 relative">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          {!thread ? (
            <div className={`h-full flex items-center justify-center ${isDarkMode ? 'text-[#6a6a6a]' : 'text-gray-500'}`}>
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>スレッドを選択してください</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {posts.map((post) => (
                <div key={post.id} className={`border-l-2 pl-4 ${isDarkMode ? 'border-[#3e3e42]' : 'border-gray-300'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-[#007acc]">{post.id}</span>
                    <div className={`flex items-center gap-1 text-xs ${isDarkMode ? 'text-[#6a6a6a]' : 'text-gray-500'}`}>
                      <User className="h-3 w-3" />
                      <span>{post.name}</span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-[#6a6a6a]' : 'text-gray-500'}`}>
                      {new Date(post.date).toLocaleString('ja-JP')}
                    </span>
                  </div>
                  
                  <div className={`text-sm whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'}`}>
                    {post.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {showChart && thread && (
          <div className={`border-t ${isDarkMode ? 'border-[#3e3e42] bg-[#1e1e1e]' : 'border-gray-300 bg-white'}`}>
            <div className={`p-3 border-b ${isDarkMode ? 'border-[#3e3e42]' : 'border-gray-300'}`}>
              <div className="flex justify-between items-center">
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'}`}>
                  書き込み勢い
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChart(false)}
                  className={`h-6 w-6 p-0 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#2a2d2e]' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="p-3 h-48">
              <ChartContainer config={chartConfig} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={momentumData}>
                    <XAxis 
                      dataKey="time" 
                      fontSize={10}
                      tick={{ fill: isDarkMode ? '#6a6a6a' : '#666' }}
                    />
                    <YAxis 
                      fontSize={10}
                      tick={{ fill: isDarkMode ? '#6a6a6a' : '#666' }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ stroke: isDarkMode ? '#3e3e42' : '#ddd' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="momentum" 
                      stroke="#007acc" 
                      strokeWidth={2}
                      dot={{ fill: '#007acc', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {thread && (
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChart(!showChart)}
              className={`h-8 w-8 p-0 rounded-full shadow-lg ${
                isDarkMode 
                  ? 'bg-[#2d2d30] border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              📊
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className={`h-8 w-8 p-0 rounded-full shadow-lg ${
                isDarkMode 
                  ? 'bg-[#2d2d30] border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToBottom}
              className={`h-8 w-8 p-0 rounded-full shadow-lg ${
                isDarkMode 
                  ? 'bg-[#2d2d30] border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
