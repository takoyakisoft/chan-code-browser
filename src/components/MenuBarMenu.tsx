
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface MenuBarMenuProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  showThreadList: boolean;
  setShowThreadList: (show: boolean) => void;
  showWritePanel: boolean;
  setShowWritePanel: (show: boolean) => void;
  isDarkMode: boolean;
}

export function MenuBarMenu({
  showSidebar,
  setShowSidebar,
  showThreadList,
  setShowThreadList,
  showWritePanel,
  setShowWritePanel,
  isDarkMode,
}: MenuBarMenuProps) {
  return (
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
  );
}
