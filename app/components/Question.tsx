import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { QuestionProps } from "../utils/types";

const Question: React.FC<QuestionProps> = ({
  type,
  question,
  options = [],
  answer,
  setAnswer,
  maxLength = 100,
}) => {
  switch (type) {
    case "single-choice":
      return (
        <div>
          <p className="mb-2">{question}</p>
          <RadioGroup
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </div>
      );

    case "multi-choice":
      return (
        <div>
          <p>{question}</p>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={
                    Array.isArray(answer) &&
                    (answer as string[]).includes(option)
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAnswer([
                        ...(Array.isArray(answer) ? answer : []),
                        option,
                      ]);
                    } else {
                      setAnswer(
                        (Array.isArray(answer) ? answer : []).filter(
                          (item) => item !== option
                        )
                      );
                    }
                  }}
                />
              }
              label={option}
            />
          ))}
        </div>
      );

    case "short-answer":
      return (
        <div>
          <p>{question}</p>
          <TextField
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            inputProps={{ maxLength }}
            placeholder={`Введите ответ (максимум ${maxLength} символов)`}
            fullWidth
          />
        </div>
      );

    case "long-answer":
      return (
        <div>
          <p>{question}</p>
          <TextField
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Введите развернутый ответ"
            multiline
            rows={4}
            fullWidth
          />
        </div>
      );

    default:
      return null;
  }
};

export default Question;
