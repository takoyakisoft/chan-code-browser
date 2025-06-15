
import { useEffect, useState } from "react";
import { MessageSquare, User, Calendar, X } from "lucide-react";
import { Thread, Post } from "@/pages/Index";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DraggableTabs, TabItem } from "@/components/DraggableTabs";

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

  useEffect(() => {
    if (thread) {
      const mockPosts = generateMockPosts(thread.id);
      setPosts(mockPosts);
    } else {
      setPosts([]);
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
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`h-6 w-6 p-0 ml-2 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#2a2d2e]' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
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
    </div>
  );
}
