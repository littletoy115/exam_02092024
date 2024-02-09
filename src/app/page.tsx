"use client"
import React, { useState, useEffect } from "react";
import "./page.css";

export default function Home() {

  interface Option {
    id: number;
    text: string;
    isCorrect: boolean;
  }

  interface Question {
    text: string;
    key: number;
    options: Option[];
  }


  const data_questions: Question[] = [
    {
      text: "What is the capital of America?",
      key: 1,
      options: [
        { id: 0, text: "New York City", isCorrect: false },
        { id: 1, text: "Boston", isCorrect: false },
        { id: 2, text: "Santa Fe", isCorrect: false },
        { id: 3, text: "Washington DCX", isCorrect: true },
      ],

    },
    {
      text: "What year was the Constitution of America written?",
      key: 2,
      options: [
        { id: 0, text: "1787X", isCorrect: true },
        { id: 1, text: "1776", isCorrect: false },
        { id: 2, text: "1774", isCorrect: false },
        { id: 3, text: "1826", isCorrect: false },
      ],

    },
    {
      text: "Who was the second president of the US?",
      key: 3,
      options: [
        { id: 0, text: "John AdamsX", isCorrect: true },
        { id: 1, text: "Paul Revere", isCorrect: false },
        { id: 2, text: "Thomas Jefferson", isCorrect: false },
        { id: 3, text: "Benjamin Franklin", isCorrect: false },
      ],

    },
    {
      text: "What is the largest state in the US?",
      key: 4,
      options: [
        { id: 0, text: "California", isCorrect: false },
        { id: 1, text: "AlaskaX", isCorrect: true },
        { id: 2, text: "Texas", isCorrect: false },
        { id: 3, text: "Montana", isCorrect: false },
      ],

    },
    {
      text: "Which of the following countries DO NOT border the US?",
      key: 5,
      options: [
        { id: 0, text: "Canada", isCorrect: false },
        { id: 1, text: "Russia", isCorrect: true },
        { id: 2, text: "CubaX", isCorrect: true },
        { id: 3, text: "Mexico", isCorrect: false },
      ],

    },
  ];

  const [stage, setStage] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [question, setQuestion] = useState<any>([]);

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const updatedQuestions = question.filter((question: any, index: number) => index !== currentQuestion);
    setQuestion(updatedQuestions);
    setStage(stage + 1)
    setCurrentQuestion(Math.floor(Math.random() * updatedQuestions.length))
  };

  const resetGame = () => {
    setQuestion(data_questions);
    setCurrentQuestion(Math.floor(Math.random() * 5));
    setStage(0);
    setScore(0);
  }

  useEffect(() => {
    setQuestion(data_questions);
    setCurrentQuestion(Math.floor(Math.random() * 5));
    return () => {
    };
  }, []);

  return (
    <main className="flex justify-center items-center">
      <div>
        {stage > data_questions.length - 1 ?
          <div className="flex justify-center items-center text-center">
            <div className={`card-result`}>
              <span className="text-2xl text-black">Result Score is :  </span> <span className="text-3xl text-red-500">
                &nbsp;{score}
              </span>
              <div className="text-red cursor-pointer" onClick={resetGame}>Try Agian</div>
            </div>
          </div>
          :
          <>
            <div className="text-center text-3xl font-bold">
              QUESTION {stage + 1} OUT OF {data_questions.length}
            </div>
            <div className="topic-header text-center text-2xl font-bold">
              Score : {score}
            </div>
          </>
        }
        <div className={`text-red heading text-center`}>
          {question[currentQuestion]?.text}
        </div>

        <ul className="text-center">
          {(question[currentQuestion]?.options.map((option: any) => (
            <li key={option.id} onClick={() => handleAnswerClick(option.isCorrect)}>
              {option.text}
            </li>
          )))}
        </ul>
      </div>
    </main>
  );
}
