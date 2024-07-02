import React, { useState } from "react";
// json file of quizList
import questionList from "../questionList.json";
import "./Page.css"; 

const Page = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (option) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentPage] = option;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentPage < questionList.quiz.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const restartQuiz = () => {
        setCurrentPage(0);
        setUserAnswers([]);
        setShowResults(false);
    };

    // calculating the score of quiz
    const calculateScore = () => {
        return userAnswers.reduce((score, answer, index) => {
            if (answer === questionList.quiz[index].correct) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    return (
        <div className="quiz-container">
            {showResults ? (
                <div>
                    <h3>Quiz Results</h3>
                    <p>You have completed the quiz. Here are your results:</p>
                    <ul className="results-list">
                        {questionList.quiz.map((quiz, index) => (
                            <li key={index}>
                                <img 
                                    src={quiz.Picture} 
                                    alt={quiz.question} 
                                />
                                {quiz.question}
                                <br />
                                <strong>Your answer:</strong> {userAnswers[index]}
                                <br />
                                <strong>Correct answer:</strong> {quiz.correct}
                                <br />
                                {userAnswers[index] === quiz.correct ? (
                                    <span className="correct">Correct</span>
                                ) : (
                                    <span className="incorrect">Incorrect</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <h4 className="score">Total Score: {calculateScore()} / {questionList.quiz.length}</h4>
                    <button onClick={restartQuiz} className="button">Restart Quiz</button>
                </div>
            ) : (
                <div>
                    <h3>Quiz Page {currentPage + 1}</h3>
                    <h4>{questionList.quiz[currentPage].question}</h4>
                    <img 
                        src={questionList.quiz[currentPage].Picture} 
                        alt={questionList.quiz[currentPage].question} 
                        className="quiz-image"
                    />
                    <ul className="options-list">
                        {questionList.quiz[currentPage].options.map((option, index) => (
                            <li
                                key={index}
                                className={userAnswers[currentPage] === option ? "selected" : ""}
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                    <div className="button-container">
                        <button onClick={handlePrevious} disabled={currentPage === 0} className="button">
                            Previous
                        </button>
                        <button onClick={handleNext} className="button">
                            {currentPage === questionList.quiz.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
