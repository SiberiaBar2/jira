import { useProjectIdUrl } from "screen/kanban/utils";

export const useEpicsSearchParams = () => ({projectId: useProjectIdUrl()});

export const useEpicsQueryKey = () => ['epics', useEpicsSearchParams()];
