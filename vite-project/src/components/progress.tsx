import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const tasks = [
  { id: 1, title: "task1", done: false, point: 10 },
  { id: 2, title: "task2", done: false, point: 20 },
  { id: 3, title: "task3", done: false, point: 30 },
];

let neededPoints: number[] = [375];

const Progress = () => {
  const [progress, setProgress] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const progressPercent: number = Math.floor(
    (progress / neededPoints[neededPoints.length - 1]) * 100
  );

  // keybind
  useHotkeys("g", () => ProceedProgress(10));
  useHotkeys("h", () => resetProgress());

  const ProceedProgress = (point: number) => {
    // 即時反映させたい場合は, newProgで別の変数として定義すると  良いらしい。
    // const newProg = progress + 10;
    // setProgress(newProg);
    checkRankUp(point);
    setProgress(progress + point);
  };

  // ランクアップするかどうかの判定をする関数を定義
  const checkRankUp = (point: number) => {
    if (progress + point >= neededPoints[neededPoints.length - 1]) {
      alert("ランクアップしました！");
    }
  };

  function resetProgress() {
    setProgress(0);
    setDisabled(true);
  }

  return (
    <>
      <div className="flex">
        <progress
          id="myProgress"
          value={progress}
          max={neededPoints[neededPoints.length - 1]}
          className="w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500"
        >
          {progress}%
        </progress>
        <span>
          {progressPercent}% {progress}/{neededPoints[neededPoints.length - 1]}
        </span>
        {/* <Box sx={{ ml: 2 }}>{progress}%</Box> */}
      </div>
      {/* <input
        type="button"
        id="myButton"
        onClick={func1}
        value="スタート"
        disabled={disabled}
      /> */}
      {/* <input
        type="button"
        value="進める"
        onClick={() => ProceedProgress(10)}
        className="border-solid border-2 border-blue-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      /> */}
      {progress >= neededPoints[neededPoints.length - 1] && (
        <input type="button" value="完了" onClick={resetProgress} />
      )}

      <ul>
        {tasks.map((task) => (
          <div key={task.id} className="mb-1">
            {/* <button
              type="button"
              onClick={() => ProceedProgress(task.point)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <span className="">{task.title}</span>{" "}
            </button>
            <span className="">point: {task.point}</span> */}
            <Button
              variant="contained"
              onClick={() => ProceedProgress(task.point)}
            >
              <span className="">{task.title}</span>{" "}
            </Button>
            <span className="ml-2">point: {task.point}</span>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Progress;
