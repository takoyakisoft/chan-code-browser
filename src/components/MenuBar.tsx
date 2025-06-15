
import { MenuBarMenu } from "@/components/MenuBarMenu";
import { PanelToggles } from "@/components/PanelToggles";
import { WindowControls } from "@/components/WindowControls";
import { BarChart3 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

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
  threadPanelLayout: "horizontal" | "vertical";
  setThreadPanelLayout: (layout: "horizontal" | "vertical") => void;
  isRedditMode: boolean;
  setIsRedditMode: (mode: boolean) => void;
  showChart?: boolean;
  setShowChart?: (show: boolean) => void;
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
  threadPanelLayout,
  setThreadPanelLayout,
  isRedditMode,
  setIsRedditMode,
  showChart,
  setShowChart,
}: MenuBarProps) {
  return (
    <div className={`h-8 flex items-center justify-between px-2 border-b ${
      isDarkMode
        ? 'bg-[#2d2d30] border-[#3e3e42] text-[#cccccc]'
        : 'bg-gray-100 border-gray-300 text-black'
    }`}>
      {/* Left side - Menu */}
      <div className="flex items-center">
        <MenuBarMenu
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          showThreadList={showThreadList}
          setShowThreadList={setShowThreadList}
          showWritePanel={showWritePanel}
          setShowWritePanel={setShowWritePanel}
          isDarkMode={isDarkMode}
          threadPanelLayout={threadPanelLayout}
          setThreadPanelLayout={setThreadPanelLayout}
        />
      </div>

      {/* Center - Title */}
      <div className="flex-1 text-center">
        <span className="text-xs font-medium">2ch Browser</span>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-1">
        <PanelToggles
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          showThreadList={showThreadList}
          setShowThreadList={setShowThreadList}
          showThreadView={showThreadView}
          setShowThreadView={setShowThreadView}
          showWritePanel={showWritePanel}
          setShowWritePanel={setShowWritePanel}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isRedditMode={isRedditMode}
          setIsRedditMode={setIsRedditMode}
        />

        {setShowChart && (
          <TooltipProvider>
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
          </TooltipProvider>
        )}

        <WindowControls isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
