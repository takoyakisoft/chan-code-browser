import { Folder, MessageSquare, ArrowUp, ArrowDown } from "lucide-react";
import { Board } from "@/pages/Index";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

// モックデータ
const boards: Board[] = [
  { id: "news", name: "ニュース速報+", path: "/newsplus/" },
  { id: "livejupiter", name: "なんでも実況J", path: "/livejupiter/" },
  { id: "poverty", name: "ニュー速(嫌儲)", path: "/poverty/" },
  { id: "news4vip", name: "ニュー速VIP", path: "/news4vip/" },
  { id: "game", name: "PCゲーム", path: "/game/" },
  { id: "anime", name: "アニメ", path: "/anime/" },
  { id: "tech", name: "プログラマー", path: "/tech/" },
];

interface BoardListProps {
  selectedBoard: Board | null;
  onBoardSelect: (board: Board) => void;
  isDarkMode: boolean;
  onClose: () => void;
}

export function BoardList({ selectedBoard, onBoardSelect, isDarkMode, onClose }: BoardListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
    <div className="h-full flex flex-col relative">
      <div className={`p-3 border-b flex items-center justify-between ${isDarkMode ? 'border-[#3e3e42] bg-[#2d2d30]' : 'border-gray-300 bg-gray-100'}`}>
        <div className="flex items-center gap-2">
          <Folder className="h-5 w-5 text-[#007acc]" />
          <span className={`font-semibold ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'}`}>2ch Browser</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`h-6 w-6 p-0 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#2a2d2e]' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <Folder className="h-4 w-4" />
        </Button>
      </div>

      <div className={`p-3 border-b ${isDarkMode ? 'border-[#3e3e42]' : 'border-gray-300'}`}>
        <div className={`flex items-center gap-1 text-xs font-medium ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-700'}`}>
          <Folder className="h-4 w-4" />
          板一覧
        </div>
      </div>
      
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-0">
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => onBoardSelect(board)}
              className={`p-3 border-b cursor-pointer text-sm ${
                isDarkMode 
                  ? `border-[#3e3e42] hover:bg-[#2a2d2e] ${selectedBoard?.id === board.id ? "bg-[#094771] text-white" : "text-[#cccccc]"}`
                  : `border-gray-300 hover:bg-gray-200 ${selectedBoard?.id === board.id ? "bg-blue-100 text-blue-900" : "text-gray-700"}`
              }`}
            >
              <span className="truncate">{board.name}</span>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
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
    </div>
  );
}
