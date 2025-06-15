
import { useState } from "react";
import { 
  Menu, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Minimize2, 
  Maximize2, 
  X 
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

interface MenuBarProps {
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

export function MenuBar({
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
}: MenuBarProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    console.log("最小化");
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    console.log(isMaximized ? "元のサイズに戻す" : "最大化");
  };

  const handleClose = () => {
    console.log("閉じる");
  };

  return (
    <div className={`h-8 flex items-center justify-between px-2 border-b ${
      isDarkMode 
        ? 'bg-[#2d2d30] border-[#3e3e42] text-[#cccccc]' 
        : 'bg-gray-100 border-gray-300 text-black'
    }`}>
      {/* Left side - Menu */}
      <div className="flex items-center">
        <Menubar className={`h-6 ${isDarkMode ? 'bg-transparent border-none' : 'bg-transparent border-none'}`}>
          <MenubarMenu>
            <MenubarTrigger className={`text-xs px-2 py-1 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#3e3e42]' : 'text-black hover:bg-gray-200'}`}>
              ファイル
            </MenubarTrigger>
            <MenubarContent className={isDarkMode ? 'bg-[#252526] border-[#3e3e42]' : 'bg-white border-gray-300'}>
              <MenubarItem className={isDarkMode ? 'text-[#cccccc] hover:bg-[#3e3e42]' : 'text-black hover:bg-gray-100'}>
                新しいタブ
              </MenubarItem>
              <MenubarSeparator className={isDarkMode ? 'bg-[#3e3e42]' : 'bg-gray-300'} />
              <MenubarItem className={isDarkMode ? 'text-[#cccccc] hover:bg-[#3e3e42]' : 'text-black hover:bg-gray-100'}>
                設定
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger className={`text-xs px-2 py-1 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#3e3e42]' : 'text-black hover:bg-gray-200'}`}>
              表示
            </MenubarTrigger>
            <MenubarContent className={isDarkMode ? 'bg-[#252526] border-[#3e3e42]' : 'bg-white border-gray-300'}>
              <MenubarItem 
                onClick={() => setShowSidebar(!showSidebar)}
                className={isDarkMode ? 'text-[#cccccc] hover:bg-[#3e3e42]' : 'text-black hover:bg-gray-100'}
              >
                {showSidebar ? '板一覧を隠す' : '板一覧を表示'}
              </MenubarItem>
              <MenubarItem 
                onClick={() => setShowThreadList(!showThreadList)}
                className={isDarkMode ? 'text-[#cccccc] hover:bg-[#3e3e42]' : 'text-black hover:bg-gray-100'}
              >
                {showThreadList ? 'スレッド一覧を隠す' : 'スレッド一覧を表示'}
              </MenubarItem>
              <MenubarItem 
                onClick={() => setShowWritePanel(!showWritePanel)}
                className={isDarkMode ? 'text-[#cccccc] hover:bg-[#3e3e42]' : 'text-black hover:bg-gray-100'}
              >
                {showWritePanel ? '書き込みパネルを隠す' : '書き込みパネルを表示'}
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Center - Title */}
      <div className="flex-1 text-center">
        <span className="text-xs font-medium">2ch Browser</span>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-1">
        {/* Panel toggles */}
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

        {/* Dark mode toggle */}
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

        {/* Window controls */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMinimize}
          className={`h-6 w-8 p-0 ${isDarkMode ? 'hover:bg-[#3e3e42] text-[#cccccc]' : 'hover:bg-gray-200 text-black'}`}
          title="最小化"
        >
          <Minimize2 className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMaximize}
          className={`h-6 w-8 p-0 ${isDarkMode ? 'hover:bg-[#3e3e42] text-[#cccccc]' : 'hover:bg-gray-200 text-black'}`}
          title={isMaximized ? "元のサイズに戻す" : "最大化"}
        >
          <Maximize2 className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className={`h-6 w-8 p-0 hover:bg-red-600 ${isDarkMode ? 'text-[#cccccc]' : 'text-black'} hover:text-white`}
          title="閉じる"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
