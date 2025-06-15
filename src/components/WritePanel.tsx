
import { useState } from "react";
import { Send, Edit, X } from "lucide-react";
import { Thread } from "@/pages/Index";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WritePanelProps {
  thread: Thread | null;
  isDarkMode: boolean;
  onClose: () => void;
}

export function WritePanel({ thread, isDarkMode, onClose }: WritePanelProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!thread || !content.trim()) return;
    
    console.log("書き込み:", { 
      name: name || "名無しさん", 
      email: email || "", 
      content, 
      threadId: thread.id 
    });
    setContent("");
  };

  return (
    <div className={`h-full border-t flex flex-col ${
      isDarkMode ? 'bg-[#252526] border-[#3e3e42]' : 'bg-gray-50 border-gray-300'
    }`}>
      <div className={`p-3 border-b flex items-center justify-between ${
        isDarkMode ? 'border-[#3e3e42] bg-[#2d2d30]' : 'border-gray-300 bg-gray-100'
      }`}>
        <div className="flex items-center gap-2">
          <Edit className="h-4 w-4 text-[#007acc]" />
          <h3 className={`font-medium ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'}`}>書き込み</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`h-6 w-6 p-0 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#2a2d2e]' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      {!thread ? (
        <div className={`flex-1 flex items-center justify-center ${isDarkMode ? 'text-[#6a6a6a]' : 'text-gray-500'}`}>
          <p>スレッドを選択してください</p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-4 flex flex-col gap-3">
            <div className={`text-sm ${isDarkMode ? 'text-[#6a6a6a]' : 'text-gray-600'}`}>
              {thread.title}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="名前（省略可）"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`px-3 py-1 text-sm border rounded flex-1 focus:outline-none focus:border-[#007acc] ${
                  isDarkMode 
                    ? 'bg-[#3c3c3c] border-[#3e3e42] text-[#cccccc] placeholder-[#6a6a6a]'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <input
                type="email"
                placeholder="メール（省略可）"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`px-3 py-1 text-sm border rounded flex-1 focus:outline-none focus:border-[#007acc] ${
                  isDarkMode 
                    ? 'bg-[#3c3c3c] border-[#3e3e42] text-[#cccccc] placeholder-[#6a6a6a]'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <Textarea
              placeholder="書き込み内容を入力..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`min-h-32 resize-none focus:border-[#007acc] ${
                isDarkMode 
                  ? 'bg-[#3c3c3c] border-[#3e3e42] text-[#cccccc] placeholder-[#6a6a6a]'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
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
        </ScrollArea>
      )}
    </div>
  );
}
