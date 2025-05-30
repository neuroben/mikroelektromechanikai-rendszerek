import ListGroup from "./ListGroup";
import { useState } from "react";

import type { MultiOption } from "../types/questionTypes.ts";

interface Props {
  options: MultiOption[] | string[];
  statement: string;
  onNext: (wasCorrect: boolean) => void;
}

function QuizCard({ statement, options, onNext }: Props) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  //const [correctAnswer, setCorrectAnswer] = useState(false);

  const items =
    Array.isArray(options) &&
    typeof options[0] === "object" &&
    "text" in options[0]
      ? (options as MultiOption[]).map((option) => option.text)
      : (options as string[]);

  function handleExternalTrigger() {
    //const selectedItems = selectedIndices.map((i) => items[i]);
    //console.log("Kiválasztott elemek: ", selectedIndices);
    const isCorrect = checkAnswer(selectedIndices, options as MultiOption[]);
    {
      /*if (isCorrect) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }*/
    }
    setSelectedIndices([]);
    onNext(isCorrect);
  }

  function checkAnswer(
    selectedIndices: number[],
    options: MultiOption[]
  ): boolean {
    // Csak a helyes válaszok indexei
    const correctIndices = options
      .map((opt, idx) => (opt.correct ? idx : null))
      .filter((idx) => idx !== null) as number[];

    // Akkor helyes, ha pontosan a helyeseket és csak azokat jelölte be
    return (
      selectedIndices.length === correctIndices.length &&
      correctIndices.every((idx) => selectedIndices.includes(idx))
    );
  }

  return (
    <div className="card mb-0 rounded-top  shadow-sm">
      <div className="card-header py-3">
        <h4 className="my-0 fw-normal">{statement}</h4>
      </div>
      <div className="card-body rounded">
        <ListGroup
          items={items}
          selectedIndices={selectedIndices}
          setSelectedIndices={setSelectedIndices}
          onSelectItem={(item) => {
            console.log("Selected:", item);
          }}
        />
        <button
          type="button"
          className="w-100 btn btn-lg btn-outline-primary mt-4"
          onClick={handleExternalTrigger}
        >
          ok
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
