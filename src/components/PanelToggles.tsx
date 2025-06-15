
import { Folder, List, MessageSquare, Edit, Moon, Sun, GitBranch, BarChart3 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

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
  isRedditMode: boolean;
  setIsRedditMode: (mode: boolean) => void;
  showChart?: boolean;
  setShowChart?: (show: boolean) => void;
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
  isRedditMode,
  setIsRedditMode,
  showChart,
  setShowChart,
}: PanelTogglesProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            pressed={showSidebar}
            onPressedChange={setShowSidebar}
            size="sm"
            className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
          >
            <Folder className="h-3 w-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>板一覧</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            pressed={showThreadList}
            onPressedChange={setShowThreadList}
            size="sm"
            className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
          >
            <List className="h-3 w-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>スレッド一覧</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            pressed={showThreadView}
            onPressedChange={setShowThreadView}
            size="sm"
            className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
          >
            <MessageSquare className="h-3 w-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>コメント一覧</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            pressed={showWritePanel}
            onPressedChange={setShowWritePanel}
            size="sm"
            className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
          >
            <Edit className="h-3 w-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>書き込みパネル</p>
        </TooltipContent>
      </Tooltip>

      <div className={`w-px h-4 ${isDarkMode ? 'bg-[#3e3e42]' : 'bg-gray-300'}`} />

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            pressed={isRedditMode}
            onPressedChange={setIsRedditMode}
            size="sm"
            className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
          >
            <GitBranch className="h-3 w-3" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isRedditMode ? "Reddit形式" : "時系列順"}</p>
        </TooltipContent>
      </Tooltip>

      {setShowChart && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              pressed={showChart}
              onPressedChange={setShowChart}
              size="sm"
              className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
            >
              <BarChart3 className="h-3 w-3" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>勢いチャート</p>
          </TooltipContent>
        </Tooltip>
      )}

      <div className={`w-px h-4 ${isDarkMode ? 'bg-[#3e3e42]' : 'bg-gray-300'}`} />

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            pressed={isDarkMode}
            onPressedChange={setIsDarkMode}
            size="sm"
            className={`h-6 w-8 ${isDarkMode ? 'hover:bg-[#3e3e42]' : 'hover:bg-gray-200'}`}
          >
            {isDarkMode ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>ダークモード</p>
        </TooltipContent>
      </Tooltip>

      <div className={`w-px h-4 ${isDarkMode ? 'bg-[#3e3e42]' : 'bg-gray-300'}`} />
    </TooltipProvider>
  );
}
