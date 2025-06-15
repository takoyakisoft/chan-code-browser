
import { Folder, MessageSquare } from "lucide-react";
import { Board } from "@/pages/Index";
import { ScrollArea } from "@/components/ui/scroll-area";

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
}

export function BoardList({ selectedBoard, onBoardSelect, isDarkMode }: BoardListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className={`p-3 border-b flex items-center gap-2 ${isDarkMode ? 'border-[#3e3e42] bg-[#2d2d30]' : 'border-gray-300 bg-gray-100'}`}>
        <MessageSquare className="h-5 w-5 text-[#007acc]" />
        <span className={`font-semibold ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'}`}>2ch Browser</span>
      </div>

      <div className={`p-3 border-b ${isDarkMode ? 'border-[#3e3e42]' : 'border-gray-300'}`}>
        <div className={`flex items-center gap-1 text-xs font-medium ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-700'}`}>
          <Folder className="h-4 w-4" />
          板一覧
        </div>
      </div>
      
      <ScrollArea className="flex-1">
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
    </div>
  );
}
