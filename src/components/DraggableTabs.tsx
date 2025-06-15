
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TabItem {
  id: string;
  title: string;
  isActive: boolean;
}

interface DraggableTabsProps {
  tabs: TabItem[];
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onTabReorder: (tabs: TabItem[]) => void;
  isDarkMode: boolean;
  maxTitleLength?: number;
}

export function DraggableTabs({ 
  tabs, 
  onTabClick, 
  onTabClose, 
  onTabReorder, 
  isDarkMode,
  maxTitleLength = 20
}: DraggableTabsProps) {
  const [draggedTab, setDraggedTab] = useState<string | null>(null);
  const [dragOverTab, setDragOverTab] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, tabId: string) => {
    setDraggedTab(tabId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, tabId: string) => {
    e.preventDefault();
    setDragOverTab(tabId);
  };

  const handleDragLeave = () => {
    setDragOverTab(null);
  };

  const handleDrop = (e: React.DragEvent, targetTabId: string) => {
    e.preventDefault();
    
    if (!draggedTab || draggedTab === targetTabId) {
      setDraggedTab(null);
      setDragOverTab(null);
      return;
    }

    const draggedIndex = tabs.findIndex(tab => tab.id === draggedTab);
    const targetIndex = tabs.findIndex(tab => tab.id === targetTabId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTabs = [...tabs];
    const [draggedItem] = newTabs.splice(draggedIndex, 1);
    newTabs.splice(targetIndex, 0, draggedItem);
    
    onTabReorder(newTabs);
    setDraggedTab(null);
    setDragOverTab(null);
  };

  const handleDragEnd = () => {
    setDraggedTab(null);
    setDragOverTab(null);
  };

  const truncateTitle = (title: string) => {
    if (title.length <= maxTitleLength) return title;
    return title.substring(0, maxTitleLength) + "...";
  };

  if (tabs.length === 0) return null;

  return (
    <div className={`flex overflow-x-auto scrollbar-none border-b ${
      isDarkMode ? 'border-[#3e3e42] bg-[#2d2d30]' : 'border-gray-300 bg-gray-100'
    }`}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          draggable
          onDragStart={(e) => handleDragStart(e, tab.id)}
          onDragOver={(e) => handleDragOver(e, tab.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, tab.id)}
          onDragEnd={handleDragEnd}
          className={`flex items-center min-w-0 max-w-48 cursor-pointer select-none group relative ${
            tab.isActive
              ? isDarkMode
                ? 'bg-[#252526] border-b-2 border-[#007acc]'
                : 'bg-white border-b-2 border-blue-500'
              : isDarkMode
                ? 'bg-[#2d2d30] hover:bg-[#2a2d2e]'
                : 'bg-gray-100 hover:bg-gray-200'
          } ${
            dragOverTab === tab.id ? 'border-l-2 border-[#007acc]' : ''
          } ${
            draggedTab === tab.id ? 'opacity-50' : ''
          }`}
          onClick={() => onTabClick(tab.id)}
        >
          <div className="flex items-center px-3 py-2 min-w-0 flex-1">
            <span 
              className={`text-sm truncate ${
                isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'
              }`}
              title={tab.title}
            >
              {truncateTitle(tab.title)}
            </span>
          </div>
          
          {tabs.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className={`h-6 w-6 p-0 mr-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                isDarkMode ? 'text-[#cccccc] hover:bg-[#3e3e42]' : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
