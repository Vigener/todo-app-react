import { useState } from "react";

const tasks = [
  { id: 1, title: "task1", done: false, point: 10 },
  { id: 2, title: "task2", done: false, point: 20 },
  { id: 3, title: "task3", done: false, point: 30 },
];

const Progress = () => {
  const [prog, setProg] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const ProceedProgress = (point: number) => {
    // 即時反映させたい場合は, newProgで別の変数として定義すると良いらしい。
    // const newProg = prog + 10;
    // setProg(newProg);
    setProg(prog + point);
  };

  function resetProgress() {
    setProg(0);
    setDisabled(true);
  }

  return (
    <>
      <div>
        <progress id="myProgress" value={prog} max="100">
          {prog}%
        </progress>
      </div>
      {/* <input
        type="button"
        id="myButton"
        onClick={func1}
        value="スタート"
        disabled={disabled}
      /> */}
      <input type="button" value="進める" onClick={() => ProceedProgress(20)} />
      {prog >= 100 && (
        <input type="button" value="完了" onClick={resetProgress} />
      )}

      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <button type="button" onClick={() => ProceedProgress(task.point)}>
              {task.title}
            </button>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Progress;
