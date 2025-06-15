
import { useEffect, useState } from "react";
import { MessageCircle, Clock } from "lucide-react";
import { Board, Thread } from "@/pages/Index";

interface ThreadListProps {
  board: Board | null;
  selectedThread: Thread | null;
  onThreadSelect: (thread: Thread) => void;
}

// モックデータ
const generateMockThreads = (boardId: string): Thread[] => {
  const threads: Thread[] = [];
  for (let i = 1; i <= 50; i++) {
    threads.push({
      id: `${boardId}_thread_${i}`,
      title: `【${boardId}】スレッドタイトル${i} ★${Math.floor(Math.random() * 10) + 1}`,
      resCount: Math.floor(Math.random() * 1000) + 1,
      lastModified: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    });
  }
  return threads;
};

export function ThreadList({ board, selectedThread, onThreadSelect }: ThreadListProps) {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    if (board) {
      const mockThreads = generateMockThreads(board.id);
      setThreads(mockThreads);
    } else {
      setThreads([]);
    }
  }, [board]);

  if (!board) {
    return (
      <div className="h-full flex items-center justify-center text-[#6a6a6a]">
        <div className="text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>板を選択してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42] bg-[#2d2d30]">
        <h2 className="font-medium text-[#cccccc] truncate">{board.name}</h2>
        <p className="text-xs text-[#6a6a6a]">{threads.length} スレッド</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => onThreadSelect(thread)}
            className={`p-3 border-b border-[#3e3e42] cursor-pointer hover:bg-[#2a2d2e] ${
              selectedThread?.id === thread.id ? "bg-[#094771]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm text-[#cccccc] line-clamp-2 flex-1">
                {thread.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-[#6a6a6a] shrink-0">
                <MessageCircle className="h-3 w-3" />
                {thread.resCount}
              </div>
            </div>
            
            <div className="flex items-center gap-1 mt-1 text-xs text-[#6a6a6a]">
              <Clock className="h-3 w-3" />
              {new Date(thread.lastModified).toLocaleString('ja-JP')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
