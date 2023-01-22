import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import questions from '../data/questions.json'
import results from '../data/results.json'

const Home: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<{answerByUser: string}[]>([])
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [result, setResult] = useState('')

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

  const handleSubmit = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      const answers = questions[i].answerOptions
      for (let j = 0; j < answers.length; j++) {
        if (
          answers[j].answer === selectedOptions[i]?.answerByUser
        ) {
          newScore += answers[j].points;
          break;
        }
      }
    }
    setScore(newScore)
    setShowScore(true)

    if (newScore > 60) {
      setResult(results.above60)
    } else if (newScore > 50) {
      setResult(results.above50)
    } else if (newScore > 40) {
      setResult(results.above40)
    } else if (newScore > 30) {
      setResult(results.above30)
    } else if (newScore > 20) {
      setResult(results.above20)
    } else {
      setResult(results.under21)
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen p-5 h-full bg-[#1A1A1A] justify-center items-center">
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        showScore ? (
          <div className="max-w-lg border-stone-600 border-2 p-8 m-4 rounded-xl">
            <h1 className="text-3xl font-semibold text-center  text-stone-300">
              What others think about you...
            </h1>

            <p className="text-xl text-center text-white py-3">{result}</p>
          </div>
        ) : (
          <div className="flex flex-col max-w-lg">
            <div className="items-start">
              <h4 className="mt-10 text-xl text-white/60">Question {currentQuestion + 1} of {questions.length}</h4>

              <div className="mt-4 text-2xl text-white">
                {questions[currentQuestion].question}
              </div>
            </div>

            <div className="">
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
              <button
                className="w-[49%] py-3 bg-indigo-600 rounded-lg"
                onClick={currentQuestion + 1 === questions.length ? handleSubmit : handleNext}
              >{currentQuestion + 1 === questions.length ? 'Submit' : 'Next'}</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Home
