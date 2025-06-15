
import { ChevronLeft, ChevronRight, Menu, Settings } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface PanelTogglesProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  showThreadList: boolean;
  setShowThreadList: (show: boolean) => void;
  showThreadView: boolean;
  setShowThreadView: (show: boolean) => void;
  showWritePanel: boolean;
  setShowWritePanel: (show: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export function PanelToggles({
  showSidebar,
  setShowSidebar,
  showThreadList,
  setShowThreadList,
  showThreadView,
  setShowThreadView,
  showWritePanel,
  setShowWritePanel,
  isDarkMode,
  setIsDarkMode,
}: PanelTogglesProps) {
  return (
    <>
      <Toggle 
        pressed={showSidebar}
        onPressedChange={setShowSidebar}
        size="sm"
        className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
        title="板一覧"
      >
        <ChevronLeft className="h-3 w-3" />
      </Toggle>
      
      <Toggle 
        pressed={showThreadList}
        onPressedChange={setShowThreadList}
        size="sm"
        className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
        title="スレッド一覧"
      >
        <Menu className="h-3 w-3" />
      </Toggle>
      
      <Toggle 
        pressed={showThreadView}
        onPressedChange={setShowThreadView}
        size="sm"
        className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
        title="コメント一覧"
      >
        <ChevronRight className="h-3 w-3" />
      </Toggle>
      
      <Toggle 
        pressed={showWritePanel}
        onPressedChange={setShowWritePanel}
        size="sm"
        className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
        title="書き込みパネル"
      >
        <Settings className="h-3 w-3" />
      </Toggle>

      <div className={`w-px h-4 ${isDarkMode ? 'bg-[#3e3e42]' : 'bg-gray-300'}`} />

      <Toggle 
        pressed={isDarkMode}
        onPressedChange={setIsDarkMode}
        size="sm"
        className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
        title="ダークモード"
      >
        <span className="text-xs">🌙</span>
      </Toggle>

      <div className={`w-px h-4 ${isDarkMode ? 'bg-[#3e3e42]' : 'bg-gray-300'}`} />
    </>
  );
}
