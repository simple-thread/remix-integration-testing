import { Form, json, redirect, useLoaderData } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { createSession } from "~/models/session.server";
import { getUserId } from "~/auth.server";
import { createTimer } from "~/models/timer.server";
import { getFromFormData } from "~/helpers/form";

type LoaderData = {
  exerciseTypes: string[];
};
export const loader: LoaderFunction = async () => {
  return json({ exerciseTypes: ["back", "legs", "chest"] });
};

const focusLengths = [10, 15, 20, 25, 30, 35, 40, 45];

const exerciseLengths = [2, 3, 5, 7, 10];

export default function () {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <h2 className="mb-3 font-nunito text-4xl">Today,</h2>
      <Form method="post">
        <div className="flex items-center">
          <div>between</div>{" "}
          <select name={inputNames.focusAmount} defaultValue={4} required>
            <option value={3}>three</option>
            <option value={4}>four</option>
            <option value={5}>five</option>
          </select>
        </div>
        <div className="flex items-center">
          <select name={inputNames.focusLength} defaultValue={25 * 60} required>
            {focusLengths.map((num) => (
              <option key={num} value={num * 60}>
                {num} minutes
              </option>
            ))}
          </select>
          <div>focus sessions,</div>
        </div>
        <div className="flex items-center">I want to work my</div>
        <div className="flex items-center">
          <select name={inputNames.firstExerciseType} required>
            {data.exerciseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div>&</div>
          <select name={inputNames.secondExerciseType} required>
            {data.exerciseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <div>for</div>{" "}
          <select name={inputNames.breakLength} defaultValue={5 * 60} required>
            {exerciseLengths.map((num) => (
              <option key={num} value={num * 60}>
                {num} minutes
              </option>
            ))}
          </select>
        </div>
        <button type="submit" name="create-session">
          Submit
        </button>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const focusLength = parseInt(
    getFromFormData(formData, inputNames.focusLength, (25 * 60).toString())
  );
  const focusAmount = parseInt(
    getFromFormData(formData, inputNames.focusAmount, "4")
  );
  const breakLength = parseInt(
    getFromFormData(formData, inputNames.breakLength, "300")
  );
  const exerciseTypes = [
    getFromFormData(formData, inputNames.firstExerciseType, "back"),
    getFromFormData(formData, inputNames.secondExerciseType, "chest"),
  ];

  const newSession = await createSession({
    name: "hello", // TODO: Get rid of name from Session
    userId: await getUserId(request),
  });

  const timers = [];
  for (let i = 0; i < focusAmount * 2 - 1; i++) {
    const newTimer = await createTimer({
      length: i % 2 == 0 ? focusLength : breakLength,
      sessionId: newSession.id,
      type: i % 2 == 0 ? "FOCUS" : "EXERCISE",
    });
    timers.push(newTimer.id);
  }

  return redirect(`/start/${newSession.id}/${timers[0]}`);
};

export const inputNames = {
  focusAmount: "focus-amount",
  focusLength: "focus-length",
  breakLength: "break-length",
  firstExerciseType: "first-exercise-type",
  secondExerciseType: "second-exercise-type",
};
