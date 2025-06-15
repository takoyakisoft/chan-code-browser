
interface StatusBarProps {
  selectedBoard: { name: string } | null;
  selectedThread: { title: string } | null;
  isDarkMode: boolean;
}

export function StatusBar({ selectedBoard, selectedThread, isDarkMode }: StatusBarProps) {
  return (
    <div className={`h-6 flex items-center justify-between px-4 text-xs border-t ${
      isDarkMode 
        ? 'bg-[#007acc] border-[#3e3e42] text-white' 
        : 'bg-blue-600 border-gray-300 text-white'
    }`}>
      <div className="flex items-center gap-4">
        <span>
          板: {selectedBoard ? selectedBoard.name : '未選択'}
        </span>
        <span>
          スレッド: {selectedThread ? selectedThread.title : '未選択'}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <span>準備完了</span>
      </div>
    </div>
  );
}
