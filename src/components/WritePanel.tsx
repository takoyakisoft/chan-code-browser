
import { useState } from "react";
import { Send, Minimize2, Maximize2 } from "lucide-react";
import { Thread } from "@/pages/Index";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface WritePanelProps {
  thread: Thread | null;
}

export function WritePanel({ thread }: WritePanelProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = () => {
    if (!thread || !content.trim()) return;
    
    console.log("書き込み:", { name: name || "名無しさん", content, threadId: thread.id });
    setContent("");
  };

  if (isMinimized) {
    return (
      <div className="h-full bg-[#252526] border-t border-[#3e3e42] flex items-center justify-between px-4">
        <span className="text-sm text-[#6a6a6a]">書き込みパネル（最小化）</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMinimized(false)}
          className="text-[#cccccc] hover:bg-[#2a2d2e]"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#252526] border-t border-[#3e3e42] flex flex-col">
      <div className="p-3 border-b border-[#3e3e42] bg-[#2d2d30] flex items-center justify-between">
        <h3 className="font-medium text-[#cccccc]">書き込み</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="text-[#cccccc] hover:bg-[#2a2d2e]"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!thread ? (
        <div className="flex-1 flex items-center justify-center text-[#6a6a6a]">
          <p>スレッドを選択してください</p>
        </div>
      ) : (
        <div className="flex-1 p-4 flex flex-col gap-3">
          <div className="text-sm text-[#6a6a6a]">
            {thread.title}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="名前（省略可）"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-1 text-sm bg-[#3c3c3c] border border-[#3e3e42] rounded text-[#cccccc] placeholder-[#6a6a6a] focus:outline-none focus:border-[#007acc] w-48"
            />
          </div>

          <Textarea
            placeholder="書き込み内容を入力..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-[#3c3c3c] border-[#3e3e42] text-[#cccccc] placeholder-[#6a6a6a] focus:border-[#007acc] resize-none"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="bg-[#007acc] hover:bg-[#005a9e] text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              書き込む
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
