
import { useEffect, useState } from "react";
import { MessageSquare, User, Calendar } from "lucide-react";
import { Thread, Post } from "@/pages/Index";

interface ThreadViewProps {
  thread: Thread | null;
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

export function ThreadView({ thread }: ThreadViewProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (thread) {
      const mockPosts = generateMockPosts(thread.id);
      setPosts(mockPosts);
    } else {
      setPosts([]);
    }
  }, [thread]);

  if (!thread) {
    return (
      <div className="h-full flex items-center justify-center text-[#6a6a6a]">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>スレッドを選択してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#3e3e42] bg-[#2d2d30]">
        <h1 className="font-medium text-[#cccccc] mb-1">{thread.title}</h1>
        <div className="flex items-center gap-4 text-xs text-[#6a6a6a]">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {posts.length} レス
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(thread.lastModified).toLocaleString('ja-JP')}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border-l-2 border-[#3e3e42] pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-[#007acc]">{post.id}</span>
              <div className="flex items-center gap-1 text-xs text-[#6a6a6a]">
                <User className="h-3 w-3" />
                <span>{post.name}</span>
              </div>
              <span className="text-xs text-[#6a6a6a]">
                {new Date(post.date).toLocaleString('ja-JP')}
              </span>
            </div>
            
            <div className="text-sm text-[#cccccc] whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
