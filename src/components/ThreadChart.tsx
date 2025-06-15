
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { BarChart3 } from "lucide-react";

interface ThreadChartProps {
  showChart: boolean;
  setShowChart: (show: boolean) => void;
  momentumData: Array<{time: string, momentum: number}>;
  isDarkMode: boolean;
}

const chartConfig = {
  momentum: {
    label: "勢い",
    color: "#007acc",
  },
};

export function ThreadChart({ showChart, setShowChart, momentumData, isDarkMode }: ThreadChartProps) {
  if (!showChart) return null;

  return (
    <div className={`border-t ${isDarkMode ? 'border-[#3e3e42] bg-[#1e1e1e]' : 'border-gray-300 bg-white'}`}>
      <div className={`p-3 border-b ${isDarkMode ? 'border-[#3e3e42]' : 'border-gray-300'}`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-[#cccccc]' : 'text-gray-900'}`}>
            書き込み勢い
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChart(false)}
            className={`h-6 w-6 p-0 ${isDarkMode ? 'text-[#cccccc] hover:bg-[#2a2d2e]' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={100} minSize={20}>
          <div className="p-3 h-full min-h-[120px]">
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={momentumData}>
                  <XAxis 
                    dataKey="time" 
                    fontSize={10}
                    tick={{ fill: isDarkMode ? '#6a6a6a' : '#666' }}
                  />
                  <YAxis 
                    fontSize={10}
                    tick={{ fill: isDarkMode ? '#6a6a6a' : '#666' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: isDarkMode ? '#3e3e42' : '#ddd' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="momentum" 
                    stroke="#007acc" 
                    strokeWidth={2}
                    dot={{ fill: '#007acc', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
      </ResizablePanelGroup>
    </div>
  );
}
