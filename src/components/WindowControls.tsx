
import { useState } from "react";
import { Minimize2, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WindowControlsProps {
  isDarkMode: boolean;
}

export function WindowControls({ isDarkMode }: WindowControlsProps) {
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
    <>
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
    </>
  );
}
