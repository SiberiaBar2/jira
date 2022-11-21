import { Link , Navigate, useNavigate } from "react-router-dom";
import {Routes, Route, } from 'react-router';
import { EpicScreen } from "screen/epic";
import { KanbanScreen } from "screen/kanban";
import { useMount } from "hooks";

export const ProjectScreen = () => {
  const navaigate = useNavigate();

  const location = window.location.pathname;
  const getIncludes = (path: string) => {
    return location.includes(path);
  };

  useMount(() => {
    if (!getIncludes('kanban') || !getIncludes('epic')) {
      navaigate(`${location}/kanban`);
    }
  });

  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组 </Link>
      <Routes>
        <Route path="/kanban" element={<KanbanScreen />} />
        <Route path="/epic" element={<EpicScreen />} />
      </Routes>
      {/* <Navigate to={window.location.pathname + '/kanban '}/> */}
    </div> 
  );
};
