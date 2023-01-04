import type { NextPage } from 'next'
import Head from 'next/head'

import questions from '../questions.json'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-start w-full">
        <h4 className="mt-10 text-xl text-white/60">Question 1 of 5</h4>

        <div className="mt-4 text-2xl text-white">
          What type of framework is next.js?
        </div>
      </div>

      <div className="flex flex-col w-full">
        {questions[0].answerOptions.map((answer, index) => (
          <div
            key={index}
            className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
          >
            <input type="radio" className="w-6 h-6 bg-black" />
            <p className="ml-6 text-white">{answer.answer}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-full mt-4 text-white">
        <button className="w-[49%] py-3 bg-indigo-600 rounded-lg">
          Previous
        </button>
        <button className="w-[49%] py-3 bg-indigo-600 rounded-lg">Next</button>
      </div>
    </div>
  )
}

export default Home
