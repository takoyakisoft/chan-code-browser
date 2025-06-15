
import { MessageSquare, User } from "lucide-react";
import { Thread, Post } from "@/pages/Index";
import { ScrollArea } from "@/components/ui/scroll-area";
import { forwardRef } from "react";

interface ThreadContentProps {
  thread: Thread | null;
  posts: Post[];
  isDarkMode: boolean;
}

export const ThreadContent = forwardRef<HTMLDivElement, ThreadContentProps>(
  ({ thread, posts, isDarkMode }, ref) => {
    return (
      <ScrollArea className="flex-1" ref={ref}>
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
    );
  }
);

ThreadContent.displayName = "ThreadContent";
