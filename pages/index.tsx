import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import questions from '../questions.json'

const Home: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<{answerByUser: string}[]>([])

  const handlePrevious = () => {
    const prevQuestion = currentQuestion - 1;
    prevQuestion >= 0 && setCurrentQuestion(prevQuestion)
  }

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length && setCurrentQuestion(nextQuestion)
  }

  const handleAnswerOption = (answer: string) => {
    setSelectedOptions([(selectedOptions[currentQuestion] = { answerByUser: answer })])
    setSelectedOptions([...selectedOptions])
  }

  return (
    <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-start w-full">
        <h4 className="mt-10 text-xl text-white/60">Question {currentQuestion + 1} of {questions.length}</h4>

        <div className="mt-4 text-2xl text-white">
          {questions[currentQuestion].question}
        </div>
      </div>

      <div className="flex flex-col w-full">
        {questions[currentQuestion].answerOptions.map((answer, index) => (
          <div
            key={index}
            className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
            onClick={() => handleAnswerOption(answer.answer)}
          >
            <input
              type="radio"
              className="w-6 h-6 bg-black"
              name={currentQuestion + ''}
              value={answer.answer}
              onChange={() => handleAnswerOption(answer.answer)}
              checked={answer.answer === selectedOptions[currentQuestion]?.answerByUser}
            />
            <p className="ml-6 text-white">{answer.answer}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-full mt-4 text-white">
        <button className="w-[49%] py-3 bg-indigo-600 rounded-lg" onClick={handlePrevious}>
          Previous
        </button>
        <button className="w-[49%] py-3 bg-indigo-600 rounded-lg" onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}

export default Home
