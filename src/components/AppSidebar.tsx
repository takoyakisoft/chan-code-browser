
import { Folder, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Board } from "@/pages/Index";
import { Button } from "@/components/ui/button";

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

interface AppSidebarProps {
  selectedBoard: Board | null;
  onBoardSelect: (board: Board) => void;
  isDarkMode: boolean;
}

export function AppSidebar({ selectedBoard, onBoardSelect, isDarkMode }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`w-60 border-r ${isDarkMode ? 'bg-[#252526] border-[#3e3e42]' : 'bg-gray-50 border-gray-300'}`}>
      <SidebarHeader className={`p-4 border-b flex flex-row items-center justify-between ${isDarkMode ? 'border-[#3e3e42]' : 'border-gray-300'}`}>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#007acc]" />
          {!isCollapsed && <span className={`font-semibold ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'}`}>2ch Browser</span>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={`p-1 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#2a2d2e]' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={`text-xs font-medium px-2 py-1 ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-700'}`}>
            <Folder className="h-4 w-4 mr-1" />
            {!isCollapsed && "板一覧"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <ScrollArea className="h-full">
              <SidebarMenu>
                {boards.map((board) => (
                  <SidebarMenuItem key={board.id}>
                    <SidebarMenuButton
                      onClick={() => onBoardSelect(board)}
                      className={`w-full text-left px-2 py-1 text-sm ${
                        isDarkMode ? 'hover:bg-[#2a2d2e]' : 'hover:bg-gray-200'
                      } ${
                        selectedBoard?.id === board.id 
                          ? (isDarkMode ? "bg-[#094771] text-white" : "bg-blue-100 text-blue-900")
                          : (isDarkMode ? "text-[#cccccc]" : "text-gray-700")
                      }`}
                      tooltip={isCollapsed ? board.name : undefined}
                    >
                      <span className={isCollapsed ? "sr-only" : "truncate"}>{board.name}</span>
                      {isCollapsed && <span className="text-xs">{board.name.charAt(0)}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
