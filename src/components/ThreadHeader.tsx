
import { MessageSquare, Calendar } from "lucide-react";
import { Thread, Post } from "@/pages/Index";
import { Button } from "@/components/ui/button";

interface ThreadHeaderProps {
  thread: Thread | null;
  posts: Post[];
  isDarkMode: boolean;
  onClose: () => void;
}

export function ThreadHeader({ thread, posts, isDarkMode, onClose }: ThreadHeaderProps) {
  return (
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
  );
}
