
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThreadFloatingButtonsProps {
  showChart: boolean;
  setShowChart: (show: boolean) => void;
  onScrollToTop: () => void;
  onScrollToBottom: () => void;
  isDarkMode: boolean;
}

export function ThreadFloatingButtons({ 
  showChart, 
  setShowChart, 
  onScrollToTop, 
  onScrollToBottom, 
  isDarkMode 
}: ThreadFloatingButtonsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowChart(!showChart)}
        className={`h-8 w-8 p-0 rounded-full shadow-lg ${
          isDarkMode 
            ? 'bg-[#2d2d30] border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
        }`}
      >
        📊
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onScrollToTop}
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
        onClick={onScrollToBottom}
        className={`h-8 w-8 p-0 rounded-full shadow-lg ${
          isDarkMode 
            ? 'bg-[#2d2d30] border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
