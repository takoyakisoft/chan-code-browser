
export function getPanelSizes(showThreadList: boolean, showThreadView: boolean, showWritePanel: boolean) {
  return {
    getSidebarSize: () => (showThreadList ? 15 : 25),
    getThreadListSize: () => (showThreadView ? 25 : 100),
    getThreadViewSize: () => (showWritePanel ? 75 : 100),
    getWritePanelSize: () => 25,
  };
}
